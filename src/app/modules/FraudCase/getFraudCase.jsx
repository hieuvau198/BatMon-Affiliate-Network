import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function getFraudCase() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/FraudCase`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("__atok")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Không thể lấy thông tin FraudCase!");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        message.error(error.message || "Có lỗi xảy ra khi lấy thông tin FraudCase!");
        return null;
    }
}
