import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Hàm lấy danh sách các Promote của một chiến dịch (các publisher đã tham gia chiến dịch)
export async function getCampaignPromotes(campaignId) {
  if (!campaignId || isNaN(campaignId) || campaignId <= 0) {
    message.error("Invalid campaign ID. Please provide a valid ID.");
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/Promote/campaign/${campaignId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get("__atok")}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Failed to fetch promote data for campaign (Status: ${response.status})`;
      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid response format: Expected an array of promote data.");
    }

    if (data.length === 0) {
      message.info("No publishers have joined this campaign yet.");
    }

    return data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching promote data for campaign:", error.message);
    }
    message.error(error.message || "Failed to fetch promote data for campaign. Please try again later.");
    return [];
  }
}

export default getCampaignPromotes;