import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function getAllFraudReport() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/FraudReport`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("__atok")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch Fraud Report. Please try again.");
        }

        const data = await response.json();
        message.success("Fraud Report fetched successfully!");
        return data;
    } catch (error) {
        message.error(error.message || "Failed to fetch Fraud Report. Please try again.");
        return null;
    }
}