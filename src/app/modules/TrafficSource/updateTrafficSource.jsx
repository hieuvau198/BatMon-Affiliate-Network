import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function updateTrafficSource(sourceId, trafficData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/TrafficSource/${sourceId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("__atok")}`,
            },
            body: JSON.stringify(trafficData),
        });

        if (!response.ok) {
            throw new Error("Failed to update traffic source. Please try again.");
        }

        const data = await response.json();
        message.success("Traffic source updated successfully!");
        return data;
    } catch (error) {
        message.error(error.message || "Failed to update traffic source. Please try again.");
        return null;
    }
}