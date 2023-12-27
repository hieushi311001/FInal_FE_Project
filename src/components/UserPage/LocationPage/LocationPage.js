import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback, useEffect } from "react";
import MapGL, { Marker } from "react-map-gl";

import axios from "axios";
import { makeRequest } from "~/services";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import "./LocationPage.css";
import { showSuccessNotification, showErrorNotification } from "~/services";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiMDk2MTMyOTE3NSIsImEiOiJjbHEzeXhiZ3cwMW0yMmxwZXkxam05NXZoIn0.io6HhzGolaGdkDEOe7HuGA";

const defaultLocation = {
  latitude: 10.7769,
  longitude: 106.7009,
  zoom: 12,
};

const LocationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [viewport, setViewport] = useState(defaultLocation);
  const [userLocation, setUserLocation] = useState(null);
  const [marker, setMarker] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [markerAdded, setMarkerAdded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [address, setAddress] = useState();
  const userToken = Cookies.get("jwtToken");
  const mapRef = useRef();
  const initialData = location.state && location.state.data;
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleMarkerChange = (newMarker) => {
    setMarker(newMarker);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const apiKey = "bf1f41f64d1945b89a887e05cc2a3f00";
          const geocodingApiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${apiKey}`;
          axios
            .get(geocodingApiUrl)
            .then((response) => {
              const data = response.data;
              if (data.results && data.results.length > 0) {
                console.log(data.results[0].formatted);

                // Sử dụng biểu thức chính quy để tìm các thông tin cần thiết trong địa chỉ
                // const addressParts = data.results[0].formatted
                //   .split(",")
                //   .map((part) => part.trim());
                // const filteredAddressParts = addressParts.slice(0, -1);
                // const modifiedAddressParts = filteredAddressParts.map((part) =>
                //   part.replace(/Phường |Thành phố |Tỉnh /g, "")
                // );
                // const address1 = modifiedAddressParts.join(",");
                // const parts = address1.split(",").map((part) => part.trim());
                // setFilterAddress({
                //   toProvince: parts[3],
                //   toDistrict: parts[2],
                //   toWard: parts[1],
                //   toAddress: parts[0],
                // });
                setAddress(data.results[0].formatted);
              } else {
                setAddress("Không thể xác định địa chỉ.");
              }
            })
            .catch((error) => {
              console.error("Error fetching address:", error);
            });
          setUserLocation({ latitude, longitude, zoom: 12 });
          setMarker({ latitude, longitude });
          setButtonClicked(true);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      latitude: userLocation?.latitude || prevViewport.latitude,
      longitude: userLocation?.longitude || prevViewport.longitude,
      zoom: userLocation?.zoom || prevViewport.zoom,
    }));
  }, [userLocation]);

  useEffect(() => {
    if (marker) {
      setMarkerAdded(true);
    }
  }, [marker]);
  useEffect(() => {
    if (!userToken) {
      navigate("/login?redirect=true");
    }
  }, [navigate, userToken]);

  useEffect(() => {
    if (marker && markerAdded) {
      // Tăng giá trị zoom từ từ
      const targetZoom = 15;
      const zoomInterval = setInterval(() => {
        setViewport((prevViewport) => ({
          ...prevViewport,
          zoom: Math.min(prevViewport.zoom + 0.1, targetZoom),
        }));
      }, 50); // Điều chỉnh khoảng thời gian giữa các lần tăng zoom

      // Dừng tăng zoom sau khi đạt đến giá trị targetZoom
      setTimeout(() => {
        clearInterval(zoomInterval);
      }, 1000); // Điều chỉnh thời gian tăng zoom (đơn vị: ms)
    }
  }, [marker, markerAdded]);

  const handleSearch = () => {
    const apiKey = "bf1f41f64d1945b89a887e05cc2a3f00";
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${searchQuery}&key=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        console.log(data);

        if (data.results && data.results.length > 0) {
          const formattedAddress = data.results[0].formatted;
          const searchLatitude = data.results[0].geometry.lat;
          const searchLongitude = data.results[0].geometry.lng;
          setUserLocation({
            latitude: searchLatitude,
            longitude: searchLongitude,
            zoom: 12,
          });
          setMarker({ latitude: searchLatitude, longitude: searchLongitude });
          setButtonClicked(true);
          setAddress(formattedAddress);
        } else {
          alert(
            "Unable to geocode the address. Please check the address and try again."
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log("done");
  };
  const handleConfirm = () => {
    if (address) {
      //   Sử dụng biểu thức chính quy để tìm các thông tin cần thiết trong địa chỉ
      const addressParts = address.split(",").map((part) => part.trim());
      const filteredAddressParts = addressParts.slice(0, -1);
      const modifiedAddressParts = filteredAddressParts.map((part) =>
        part.replace(/Huyện |Phường |Thành phố |Tỉnh /g, "")
      );
      const address1 = modifiedAddressParts.join(",");
      const parts = address1.split(",").map((part) => part.trim());
      const numberOfParts = parts.length;
      if (numberOfParts === 3) {
        var requestData = {
          fromProvince: "Hồ Chí Minh",
          fromDistrict: "Hóc Môn",
          fromWard: "Đông Thạnh",
          fromAddress: "12, Đường Đặng Thúc Vịnh",
          toProvince: parts[2],
          toDistrict: parts[1],
          toWard: "",
          toAddress: parts[0],
        };
      } else {
        requestData = {
          fromProvince: "Hồ Chí Minh",
          fromDistrict: "Hóc Môn",
          fromWard: "Đông Thạnh",
          fromAddress: "12, Đường Đặng Thúc Vịnh",
          toProvince: parts[3],
          toDistrict: parts[2],
          toWard: parts[1],
          toAddress: parts[0],
        };
      }

      const fetchData = async () => {
        try {
          const method = "POST";
          if (userToken) {
            const axiosInstance = {
              headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
              },
            };
            const path = "authen/cart/getGhnAddressCode";
            const result = await makeRequest(
              method,
              path,
              requestData,
              axiosInstance
            );
            console.log("test", initialData);
            console.log(result);
            console.log(result.content.fromWardCode);
            console.log(result.content.toWardCode);
            console.log(initialData);
            navigate("/check_out", {
              state: {
                address: address,
                fromDistrictId: result.content.fromDistrictId,
                fromWardCode: result.content.fromWardCode,
                toDistrictId: result.content.toDistrictId,
                toWardCode: result.content.toWardCode,
                data: initialData,
              },
            });
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    } else {
      showErrorNotification("Error!", "Please input the address");
    }
  };
  return (
    <div style={{ height: "100vh" }}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <div className="locationContainer">
          <div className="searchContainer">
            <label className="locationInfo">{address}</label>
            <div className="searchInputContainer">
              <input
                type="text"
                placeholder="Enter location"
                className="searchInput"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="searchButton" onClick={handleSearch}>
                Search
              </button>
            </div>
            <div className="buttonContainer">
              <button className="getLocationButton" onClick={getUserLocation}>
                Get Current Location
              </button>
              <button className="getConfirm" onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>

        {buttonClicked && marker && (
          <Marker
            latitude={marker.latitude}
            longitude={marker.longitude}
            offsetTop={-20}
            offsetLeft={-10}
            draggable
            onDragEnd={(event) => handleMarkerChange(event.lngLat)}
            className="fa fa-map-marker custom-marker"
            aria-hidden="true"
          ></Marker>
        )}

        {/* <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
        /> */}
      </MapGL>
    </div>
  );
};

export default LocationPage;
