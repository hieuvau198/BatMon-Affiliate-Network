import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function editCampaign(campaignId, campaignData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Campaign/${campaignId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("__atok")}`,
            },
            body: JSON.stringify(campaignData),
        });

        if (!response.ok) {
            throw new Error("Cập nhật chiến dịch thất bại! Vui lòng thử lại.");
        }

        message.success("Chiến dịch đã được cập nhật thành công!");
        return await response.json();
    } catch (error) {
        message.error(error.message || "Có lỗi xảy ra khi cập nhật chiến dịch.");
        throw error;
    }
}
