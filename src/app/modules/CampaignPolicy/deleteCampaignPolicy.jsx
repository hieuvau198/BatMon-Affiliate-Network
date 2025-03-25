import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function deleteCampaignPolicy(campaignPolicyId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/CampaignPolicy/${campaignPolicyId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("__atok")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Không thể xóa chiến dịch. Vui lòng thử lại.");
        }

    } catch (error) {
        message.error(error.message || "Có lỗi xảy ra khi xóa chiến dịch.");
        throw error;
    }
}
