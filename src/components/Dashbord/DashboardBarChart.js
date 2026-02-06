import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// ✅ Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardBarChart =() =>{
  // Example dashboard data
  const data = {
    labels: ["Students", "Tutors", "Subjects", "Revenue"],
    datasets: [
      {
        label: "Totals",
        data: [1254, 89, 12, 56890], // Example values
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",   // Students
          "rgba(255, 99, 132, 0.6)",   // Tutors
          "rgba(255, 206, 86, 0.6)",   // Subjects
          "rgba(75, 192, 192, 0.6)",   // Revenue
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
        borderRadius: 8, // ✅ rounded bars
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // hide legend (only 1 dataset)
      },
      title: {
        display: true,
        text: "Dashboard Overview",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-4 rounded-2xl shadow">
      <Bar data={data} options={options} />
    </div>
  );
}

export default DashboardBarChart;
