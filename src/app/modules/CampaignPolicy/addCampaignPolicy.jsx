import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function addCampaignPolicy(campaignData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/CampaignPolicy`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("__atok")}`,
            },
            body: JSON.stringify(campaignData),
        });

        if (!response.ok) {
            throw new Error("Failed to create campaign policy. Please try again.");
        }

        const data = await response.json();
        message.success("Campaign policy created successfully!");
        return data;
    } catch (error) {
        message.error(error.message || "Failed to create campaign policy. Please try again.");
        return null;
    }
}
