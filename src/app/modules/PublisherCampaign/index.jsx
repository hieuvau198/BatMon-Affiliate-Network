// Hàm lấy danh sách publisher đã tham gia chiến dịch
import { message } from "antd";
import Cookies from "js-cookie";
export async function getCampaignPublishers(campaignId) {
    if (!campaignId || isNaN(campaignId) || campaignId <= 0) {
        message.error("Invalid campaign ID. Please provide a valid ID.");
        return [];
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/CampaignPublisherCommission/campaign/${campaignId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("__atok")}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.message || `Failed to fetch campaign publishers (Status: ${response.status})`;
            throw new Error(errorMessage);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Invalid response format: Expected an array of campaign publishers.");
        }

        if (data.length === 0) {
            message.info("No publishers have joined this campaign yet.");
        }

        return data;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error("Error fetching campaign publishers:", error.message);
        }
        message.error(error.message || "Failed to fetch campaign publishers. Please try again later.");
        return [];
    }
}
export default getCampaignPublishers;