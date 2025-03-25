

import { message } from "antd";
import Cookies from "js-cookie";

// Đảm bảo API_BASE_URL được thiết lập, nếu không thì throw error
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || (() => {
    throw new Error("API_BASE_URL is not defined in environment variables.");
})();

export async function getCampaignById(campaignId) {
    // Kiểm tra campaignId hợp lệ
    if (!campaignId || isNaN(campaignId) || campaignId <= 0) {
        message.error("Invalid campaign ID. Please provide a valid ID.");
        return null;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/Campaign/${campaignId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("__atok")}`,
            },
        });

        // Kiểm tra response status
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.message || `Failed to fetch campaign (Status: ${response.status})`;
            throw new Error(errorMessage);
        }

        const data = await response.json();

        // Kiểm tra dữ liệu trả về có hợp lệ không
        if (!data || Object.keys(data).length === 0) {
            throw new Error("Campaign data is empty or invalid.");
        }

        return data;
    } catch (error) {
        // Log lỗi trong môi trường development để debug
        if (process.env.NODE_ENV === "development") {
            console.error("Error fetching campaign:", error.message);
        }

        // Hiển thị thông báo lỗi thân thiện với người dùng
        message.error(error.message || "Failed to fetch campaign. Please try again later.");
        return null;
    }
}