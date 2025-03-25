import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function getFraudCaseDetail(caseId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/FraudCase/${caseId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get("__atok")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Không thể lấy dữ liệu chi tiết vụ gian lận.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    message.error("Lỗi khi tải chi tiết vụ gian lận.");
    return null;
  }
}
