import { message } from "antd";
import Cookies from "js-cookie";

// Đảm bảo API_BASE_URL được thiết lập
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || (() => {
    throw new Error("API_BASE_URL is not defined in environment variables.");
})();

// Hàm lấy danh sách tất cả chiến dịch
async function getCampaign() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Campaign`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("__atok")}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.message || `Failed to fetch campaigns (Status: ${response.status})`;
            throw new Error(errorMessage);
        }

        const data = await response.json();

        // Kiểm tra dữ liệu trả về có hợp lệ không
        if (!Array.isArray(data)) {
            throw new Error("Invalid response format: Expected an array of campaigns.");
        }

        // Nếu danh sách rỗng, thông báo cho người dùng
        if (data.length === 0) {
            message.info("No campaigns found.");
        }

        return data;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error("Error fetching campaigns:", error.message);
        }
        message.error(error.message || "Failed to fetch campaigns. Please try again later.");
        return []; // Trả về mảng rỗng thay vì null để tránh lỗi runtime
    }
}

export default getCampaign; // Export default để khớp với import trong CampaignList.jsx