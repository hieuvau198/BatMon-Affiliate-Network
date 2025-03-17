import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function deletePublisher(publisherId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Publisher/${publisherId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("__atok")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete publisher. Please try again.");
        }

        message.success("Publisher deleted successfully!");
        return true;
    } catch (error) {
        message.error(error.message || "Failed to delete publisher. Please try again.");
        return false;
    }
}
