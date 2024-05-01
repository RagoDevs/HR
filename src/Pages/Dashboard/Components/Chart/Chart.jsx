import React from "react";
import "./Chart.css";
import { PieChart } from "@mui/x-charts/PieChart";

function Chart() {
  return (
    <div className="chart">
     
      <div className="dash-chart">
        <PieChart
          colors={[
            "#4e79a7",
            "#004B95",
            "#f28e2c",
            "#e15759",
            "#76b7b2",
            "#59a14f",
          ]}
          series={[
            {
              data: [
                { id: 0, value: 2, label: "Accounting" },
                { id: 1, value: 25, label: "Educators" },
                { id: 2, value: 3, label: "Management" },
                { id: 3, value: 5, label: "Security" },
              ],
              innerRadius: 30,
              outerRadius: 90,
              paddingAngle: 3,
              cornerRadius: 5,
              startAngle: -90,
              endAngle: 360,
              cx: 140,
              cy: 110,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          width={300}
          height={300}
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "bottom", horizontal: "middle" },
              padding: 1,
            },
          }}
        />
      </div>
    </div>
  );
}

export default Chart;
