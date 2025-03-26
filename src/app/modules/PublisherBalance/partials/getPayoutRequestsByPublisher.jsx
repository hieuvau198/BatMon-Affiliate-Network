import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function getPayoutRequestsByPublisher(publisherId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/PayoutRequest/publisher/${publisherId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get("__atok")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch payout requests. Please try again.");
    }

    const data = await response.json();
    // message.success("Payout requests fetched successfully!");
    return data;
  } catch (error) {
    message.error(
      error.message || "Failed to fetch payout requests. Please try again."
    );
    return null;
  }
}