import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback, useEffect } from "react";
import MapGL, { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import axios from "axios";
import "./Test.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiMDk2MTMyOTE3NSIsImEiOiJjbHEzeXhiZ3cwMW0yMmxwZXkxam05NXZoIn0.io6HhzGolaGdkDEOe7HuGA";

const defaultLocation = {
  latitude: 10.7769,
  longitude: 106.7009,
  zoom: 12,
};

const Test = () => {
  const [viewport, setViewport] = useState(defaultLocation);
  const [userLocation, setUserLocation] = useState(null);
  const [marker, setMarker] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [markerAdded, setMarkerAdded] = useState(false);
  const [locationInfo, setLocationInfo] = useState("");
  const [address, setAddress] = useState();
  const [filterAddress, setFilterAddress] = useState({
    toProvince: "",
    toDistrict: "",
    toWard: "",
    toAddress: "",
  });
  const mapRef = useRef();

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
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
                // console.log(data.results[0].formatted);

                // Sử dụng biểu thức chính quy để tìm các thông tin cần thiết trong địa chỉ
                const addressParts = data.results[0].formatted
                  .split(",")
                  .map((part) => part.trim());
                const filteredAddressParts = addressParts.slice(0, -1);
                const modifiedAddressParts = filteredAddressParts.map((part) =>
                  part.replace(/Phường |Thành phố |Tỉnh /g, "")
                );
                const address1 = modifiedAddressParts.join(",");
                const parts = address1.split(",").map((part) => part.trim());
                setFilterAddress({
                  toProvince: parts[3],
                  toDistrict: parts[2],
                  toWard: parts[1],
                  toAddress: parts[0],
                });
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

          // Cập nhật thông tin vị trí
          setLocationInfo(`Latitude: ${latitude}, Longitude: ${longitude}`);
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
          <button className="getLocationButton" onClick={getUserLocation}>
            Get Current Location
          </button>
          <label className="locationInfo">{address}</label>
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

        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
        />
      </MapGL>
    </div>
  );
};

export default Test;
