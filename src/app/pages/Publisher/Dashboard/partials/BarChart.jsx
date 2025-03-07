// src/components/BarChart.js
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function BarChart() {
    const data = {
        labels: ["Shopee 12.12", "Lazada Tết", "Tiki Sale", "Grab Food"],
        datasets: [
            {
                label: "Revenue",
                data: [2450, 1500, 370, 1200],
                backgroundColor: "#3b82f6",
                borderColor: "#3b82f6",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Campaign",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Revenue ($)",
                },
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />;
}