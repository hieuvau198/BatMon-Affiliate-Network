import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Hàm gửi yêu cầu rút tiền (Withdraw Request)
export async function createWithdrawRequest(withdrawData) {
  // Kiểm tra dữ liệu đầu vào
  if (!withdrawData || typeof withdrawData !== "object") {
    message.error("Dữ liệu yêu cầu rút tiền không hợp lệ.");
    return null;
  }

  const { amount, currencyCode, advertiserId } = withdrawData;

  // Kiểm tra các trường bắt buộc
  if (!amount || amount <= 0) {
    message.error("Số tiền rút phải lớn hơn 0.");
    return null;
  }

  if (!currencyCode || typeof currencyCode !== "string") {
    message.error("Mã tiền tệ không hợp lệ.");
    return null;
  }

  if (!advertiserId || isNaN(advertiserId) || advertiserId <= 0) {
    message.error("ID nhà quảng cáo không hợp lệ.");
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/WithdrawRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get("__atok")}`, // Lấy token từ cookie
      },
      body: JSON.stringify({
        amount,
        currencyCode,
        advertiserId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Không thể gửi yêu cầu rút tiền (Status: ${response.status})`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    message.success("Yêu cầu rút tiền đã được gửi thành công!");
    return data; // Dữ liệu trả về sẽ có cấu trúc như bạn cung cấp
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error creating withdraw request:", error.message);
    }
    message.error(error.message || "Không thể gửi yêu cầu rút tiền. Vui lòng thử lại sau.");
    return null;
  }
}

export default createWithdrawRequest;