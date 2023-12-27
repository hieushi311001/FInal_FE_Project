// NotificationUtils.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showNotification = (type, title, message) => {
  toast[type](
    <div>
      <strong>{title}</strong>
      <br />
      {message}
    </div>,
    {
      position: toast.POSITION.TOP_RIGHT,
      className: "your-toast-container",
      toastClassName: "toast-message",
    }
  );
};

export const showSuccessNotification = (title, message) => {
  showNotification("success", title, message);
};

export const showErrorNotification = (title, message) => {
  showNotification("error", title, message);
};

export const showWarningNotification = (title, message) => {
  showNotification("warning", title, message);
};

export const showInfoNotification = (title, message) => {
  showNotification("info", title, message);
};

// Add other notification functions as needed
