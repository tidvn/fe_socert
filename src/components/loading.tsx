import router from "next/router";
import { useEffect } from "react";

const Loading = () => {

  useEffect(() => {
    // Chờ 3 giây (3000 milliseconds) trước khi chuyển hướng
    const timeout = setTimeout(() => {
      // Chuyển hướng đến trang khác, thay thế '/destination' bằng đường dẫn bạn muốn
      router.push('/dashboard/certificate/create-new');
    }, 3000);

    // Clear timeout khi component unmount để tránh lỗi
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="loader-container">
      <div className="spinner"></div>
    </div>
  )
}
export default Loading;