import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function createPromote(promoteData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Promote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get("__atok")}`,
      },
      body: JSON.stringify(promoteData),
    });

    if (!response.ok) {
      throw new Error("Failed to create promote. Please try again.");
    }

    const data = await response.json();
    message.success("Promote created successfully!");
    return data;
  } catch (error) {
    message.error(error.message || "Failed to create promote. Please try again.");
    return null;
  }
}
