import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import { ThemeContext } from "../Context/ThemeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ({ graphData }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Line
        data={{
          labels: graphData.map((i) => {
            return i[0];
          }),
          datasets: [
            {
              data: graphData.map((i) => i[1]),
              label: "wpm",
              borderColor: theme.titleColor,
            },
          ],
        }}
      />
    </>
  );
};

export default Graph;
