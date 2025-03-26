import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Hàm gửi yêu cầu rút tiền (Payout Request) cho publisher
export async function createPayoutRequest(payoutData) {
    // Kiểm tra dữ liệu đầu vào
    if (!payoutData || typeof payoutData !== "object") {
        message.error("Dữ liệu yêu cầu rút tiền không hợp lệ.");
        return null;
    }

    const { amount, currencyCode, publisherId } = payoutData;

    // Kiểm tra các trường bắt buộc
    if (!amount || amount <= 0) {
        message.error("Số tiền rút phải lớn hơn 0.");
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

    try {
        const response = await fetch(`${API_BASE_URL}/api/PayoutRequest`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("__atok")}`, // Lấy token từ cookie
            },
            body: JSON.stringify({
                amount,
                currencyCode,
                publisherId,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.message || `Không thể gửi yêu cầu rút tiền (Status: ${response.status})`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        // message.success("Yêu cầu rút tiền đã được gửi thành công!");
        return data; // Trả về dữ liệu từ API (nếu có)
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error("Error creating payout request:", error.message);
        }
        message.error(error.message || "Không thể gửi yêu cầu rút tiền. Vui lòng thử lại sau.");
        return null;
    }
}

export default createPayoutRequest;