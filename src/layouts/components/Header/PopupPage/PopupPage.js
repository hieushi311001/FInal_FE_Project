import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { makeRequest } from "~/services";
import Cookies from "js-cookie";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router";

// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }
function PopupPage({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  //   const [value, setValue] = useState(product.quantity);
  //   const [maxNum, setMaxNum] = useState(0);
  //   const [filterData, setFilterData] = useState([]);
  //   const [selectedImage, setSelectedImage] = useState({
  //     name: product.name,
  //     id: product.id,
  //     productId: product.productId,
  //     src: product.image1,
  //     color: product.color,
  //     size: product.size,
  //     quantity: product.quantity,
  //   });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = `unauthen/translator/getAllLanguageList`;
        const method = "GET";
        const result = await makeRequest(method, path);
        console.log(result);
        setData(result.content);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);
  const [targetLanguage, setTargetLanguage] = useState("vi"); // Ngôn ngữ đích
  const [inputText, setInputText] = useState(""); // Đoạn văn bản cần dịch
  const [translatedText, setTranslatedText] = useState(""); // Kết quả dịch
  const options = data.map((lang) => ({
    value: lang.languageCode,
    label: (
      <div key={lang.id}>
        <img
          src={`/${lang.flagImage}`}
          alt={lang.name}
          style={{ width: "10%", height: "10%" }}
          className="select-icon"
        />
        <span style={{ marginLeft: "5px", textAlign: "center" }}>
          {lang.name}
        </span>
      </div>
    ),
  }));
  const translateText = async () => {
    const fetchData = async () => {
      try {
        const APIdata = {
          text: inputText,
          sourceLanguageCode: targetLanguage,
        };
        const path = `unauthen/translator/translate`;
        const method = "POST";
        const result = await makeRequest(method, path, APIdata);
        setTranslatedText(result.content);
        onClose();
        navigate(`/search?query=${result.content}`);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  };
  return (
    <Popup open={isOpen} modal nested onClose={onClose}>
      <div className="custom-modal modal-dialog modal-content">
        <button className="close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          <div className="row">
            <div className="col">
              <strong>
                Input Text:
                <input
                  className="form-control"
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </strong>
            </div>
            <div className="col">
              <strong>
                Target Language:
                <Select
                  value={options.find(
                    (option) => option.value === targetLanguage
                  )}
                  options={options}
                  onChange={(selectedOption) =>
                    setTargetLanguage(selectedOption.value)
                  }
                />
              </strong>
            </div>
          </div>
          <br />
          <div>
            <strong>Translated Text: {translatedText}</strong>
          </div>
          <button
            className="btn btn-primary"
            onClick={translateText}
            style={{
              marginBottom: "10px",
              width: "165px",
              fontSize: "14px",
              color: "rgb(255, 255, 255)",
              fontWeight: "700",
              background: "rgb(231, 171, 60)",
              padding: "7px 20px 5px",
              borderRadius: "2px",
              display: "inline-block",
              textTransform: "uppercase",
              border: "10px",
              cursor: "pointer",
            }}
          >
            Translate
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default PopupPage;
