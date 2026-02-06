import React from "react";
import { Card } from "antd";
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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ======================
// 1. Event Data
// ======================
const events = [
  {
    title: "Conducting of NCSC 2025 - School Level",
    start: "2025-08-25T09:30:00",
    end: "2025-08-25T12:00:00",
    color: "#fca652",
  },
  {
    title: "Conducting of NCSC 2025 - School Level",
    start: "2025-08-27T00:00:00",
    end: "2025-08-27T23:59:00",
    color: "#fca652",
  },
  {
    title: "Gane Chat cele",
    start: "2025-08-27T09:00:00",
    end: "2025-08-27T11:00:00",
    color: "#f67280",
  },
  {
    title: "Parent Teacher Meet",
    start: "2025-08-28T12:00:00",
    end: "2025-08-28T13:00:00",
    color: "#595959",
  },
  {
    title: "Conducting of NCSC 2025 - School Level",
    start: "2025-08-29T00:00:00",
    end: "2025-08-29T23:59:00",
    color: "#fca652",
  },
  {
    title: "Conducting of NCSC 2025 - School Level",
    start: "2025-08-30T00:00:00",
    end: "2025-08-30T23:59:00",
    color: "#fca652",
  },
  {
    title: "Conducting of NCSC 2025 - School Level",
    start: "2025-08-31T12:00:00",
    end: "2025-08-31T17:30:00",
    color: "#fca652",
  },
];

// ======================
// 2. Labels for chart
// ======================
const days = [
  "Mon 8/25",
  "Tue 8/26",
  "Wed 8/27",
  "Thu 8/28",
  "Fri 8/29",
  "Sat 8/30",
  "Sun 8/31",
];

// ======================
// 3. Convert events → dataset
// ======================
const barData = {
  labels: days,
  datasets: events.map((ev, idx) => {
    const startHour = new Date(ev.start).getHours();
    const endHour = new Date(ev.end).getHours();
    const eventDay = new Date(ev.start).toLocaleDateString("en-US", {
      weekday: "short",
    });

    return {
      label: ev.title,
      data: days.map((d) => {
        const day = d.split(" ")[0]; // Mon, Tue, etc
        if (eventDay.startsWith(day)) {
          return endHour - startHour || 24; // duration
        }
        return 0;
      }),
      backgroundColor: ev.color,
      stack: `stack-${idx}`, // keep them separate
    };
  }),
};

// ======================
// 4. Chart Options
// ======================
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: { boxWidth: 12, font: { size: 10 } },
    },
    tooltip: {
      callbacks: {
        label: (ctx) => ctx.dataset.label || "",
      },
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: false,
      title: {
        display: true,
        text: "Hours",
      },
      min: 0,
      max: 24,
      ticks: {
        stepSize: 2,
        callback: (val) => `${val}:00`,
      },
    },
  },
};

// ======================
// 5. Component
// ======================
export default function WeeklyCalendar({t}) {
  return (
    <Card title={`${t("Weekly Schedule")} (Aug 25 - 31, 2025)`} style={{ height: "700px",marginTop: 20 }}>
      <Bar data={barData} options={options} />
    </Card>
  );
}
