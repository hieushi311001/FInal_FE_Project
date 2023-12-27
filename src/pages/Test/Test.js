import { showSuccessNotification, showErrorNotification } from "~/services";
import { toast } from "react-toastify";
function Test() {
  const handleClick = () => {
    showSuccessNotification(
      "Đăng nhập thành công",
      "Chào mừng bạn đến với hệ thống!"
    );
    toast.success("Đăng nhập thành công", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <div>
      <button onClick={handleClick}>onClick</button>
    </div>
  );
}

export default Test;
