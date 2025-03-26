import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function deleteTrafficSource(sourceId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/TrafficSource/${sourceId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${Cookies.get("__atok")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete traffic source. Please try again.");
        }

        message.success("Traffic source deleted successfully!");
        return true;
    } catch (error) {
        message.error(error.message || "Failed to delete traffic source. Please try again.");
        return false;
    }
}