import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function createTrafficSource(trafficData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/TrafficSource`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("__atok")}`,
            },
            body: JSON.stringify(trafficData),
        });

        if (!response.ok) {
            throw new Error("Failed to create traffic source. Please try again.");
        }

        const data = await response.json();
        message.success("Traffic source created successfully!");
        return data;
    } catch (error) {
        message.error(error.message || "Failed to create traffic source. Please try again.");
        return null;
    }
}