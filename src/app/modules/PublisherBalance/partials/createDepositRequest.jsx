import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Hàm gửi yêu cầu nạp tiền (Deposit Request) cho publisher
export async function createDepositRequest(depositData) {
  if (!depositData || typeof depositData !== "object") {
    message.error("Dữ liệu yêu cầu nạp tiền không hợp lệ.");
    return null;
  }

  const { amount, currencyCode, publisherId, paymentMethod } = depositData;

  if (!amount || amount <= 0) {
    message.error("Số tiền nạp phải lớn hơn 0.");
    return null;
  }

  if (!currencyCode || typeof currencyCode !== "string") {
    message.error("Mã tiền tệ không hợp lệ.");
    return null;
  }

  if (!publisherId || isNaN(publisherId) || publisherId <= 0) {
    message.error("ID nhà xuất bản không hợp lệ.");
    return null;
  }

  if (!paymentMethod || typeof paymentMethod !== "string") {
    message.error("Phương thức thanh toán không hợp lệ.");
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/DepositRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get("__atok")}`,
      },
      body: JSON.stringify({
        publisherId,
        amount,
        currencyCode,
        paymentMethod,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Không thể gửi yêu cầu nạp tiền (Status: ${response.status})`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    message.success("Yêu cầu nạp tiền đã được gửi thành công!");
    return data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error creating deposit request:", error.message);
    }
    message.error(error.message || "Không thể gửi yêu cầu nạp tiền. Vui lòng thử lại sau.");
    return null;
  }
}

export default createDepositRequest;