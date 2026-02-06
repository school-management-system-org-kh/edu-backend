// src/components/DoughnutChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data, title }) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data?.map((item) => item.value),
        backgroundColor: ["#66ab18", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false, // 🚀 removes "Income Sources" or any title inside chart
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default DoughnutChart;
