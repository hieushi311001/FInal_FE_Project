import Popup from "reactjs-popup";
function PopupPage({ isOpen, onClose, product }) {
  return (
    <Popup open={isOpen} modal nested onClose={onClose}>
      <div className="custom-modal">
        <button className="close" onClick={onClose}>
          &times;
        </button>
      </div>
    </Popup>
  );
}

export default PopupPage;
