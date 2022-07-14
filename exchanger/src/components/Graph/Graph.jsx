import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  PointElement,
  LineElement,
  Title,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useEffect, useState } from "react";

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Converstion Rates per day for the last 30 days",
    },
  },
};

ChartJS.register(PointElement,LineElement, Title, Tooltip, CategoryScale, LinearScale);

function Graph({ monthRates }) {
  const [graphData, setGraphData] = useState(null);

  const setGraph = (xAxis, yAxis) => {
    const data = {
      labels:xAxis,
      datasets: [
        {
          label: "Rate",
          data: yAxis,
          backgroundColor: "rgb(254,185,75)",
        },
      ],
    };

    setGraphData(data);
  };

  useEffect(() => {
    if (monthRates != null && Object.keys(monthRates).length > 0) {
      const xAxis = Object.keys(monthRates);
      const get_Y_axis = () => {
        let ratesPerDay = Object.values(monthRates);
        ratesPerDay = ratesPerDay.map((rate) => rate[Object.keys(rate)[0]]);
        return ratesPerDay;
      };
      const yAxis = get_Y_axis();
      setGraph(xAxis, yAxis);
    }
  }, [monthRates]);

  return (
    <div>{graphData != null && <Line options={options} data={graphData} />}</div>
  );
}

export default Graph;
