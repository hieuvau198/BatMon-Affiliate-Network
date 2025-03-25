import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function editCampaignPolicy({ campaignPolicyData }) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/CampaignPolicy`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("__atok")}`,
            },
            body: JSON.stringify(campaignPolicyData),
        });

        if (!response.ok) {
            throw new Error("Không thể cập nhật chính sách. Vui lòng thử lại.");
        }

        const data = await response.json();
        message.success("Cập nhật chính sách thành công!");
        return data;
    } catch (error) {
        message.error(error.message || "Có lỗi xảy ra khi cập nhật chính sách.");
        throw error;
    }
}
