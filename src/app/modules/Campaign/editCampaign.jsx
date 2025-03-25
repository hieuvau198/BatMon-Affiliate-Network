import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function editCampaign(campaignId, campaignData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Campaign`, { // bỏ ${campaignId}
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${Cookies.get("__atok")}`,
            },
            body: JSON.stringify(campaignData), // campaignId vẫn nằm trong body
          });          

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error Response:", errorText);
            throw new Error(errorText || "Cập nhật chiến dịch thất bại!");
        }

        message.success("Chiến dịch đã được cập nhật thành công!");
        return await response.json();
    } catch (error) {
        console.error("Full Edit Campaign Error:", error);
        message.error(error.message || "Có lỗi xảy ra khi cập nhật chiến dịch.");
        throw error;
    }
}