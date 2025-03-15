"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function MoodChart() {
  // Sample data - in a real app, this would come from your database
  const labels = [
    "Mar 1",
    "Mar 2",
    "Mar 3",
    "Mar 4",
    "Mar 5",
    "Mar 6",
    "Mar 7",
    "Mar 8",
    "Mar 9",
    "Mar 10",
    "Mar 11",
    "Mar 12",
    "Mar 13",
    "Mar 14",
  ]

  const data = {
    labels,
    datasets: [
      {
        label: "Mood Level",
        data: [3, 4, 2, 3, 1, 2, 3, 4, 4, 5, 4, 3, 4, 4],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        tension: 0.3,
      },
    ],
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: (value) => {
            const labels = ["Very Low", "Low", "Neutral", "Good", "Excellent"]
            return labels[Number(value) - 1]
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const labels = ["Very Low", "Low", "Neutral", "Good", "Excellent"]
            const value = context.raw as number
            return `Mood: ${labels[value - 1]}`
          },
        },
      },
    },
  }

  return <Line options={options} data={data} />
}

