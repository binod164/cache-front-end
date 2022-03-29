import { Bar } from "react-chartjs-2";
import { useEffect, useState } from 'react';
import { red } from "@mui/material/colors";

function HealthBarChart(props) {
  const [chartData, setChartData] = useState({
    datasets: []
  })

  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    setChartData({
      labels: [""],
      datasets: [{
          categoryPercentage: 0.5,
          barPercentage: 1.0,
          maxBarThickness: 20,
          label: "",
          data: [props.totalHealthExpense],
          backgroundColor: 'rgb(255, 99, 132)',
          // borderRadius: 8,
        }]
    })
    setChartOptions({
      options: {
        legend: {
          display: false 
        }
    },
      responsive: true,
      indexAxis: 'y',
        scales: {
          x: {
            max: 100,
            min: 0,
            grid: {
              display: false,
              drawBorder: false,
            }
          },
          y: {
            grid: {
              display: false,
              drawBorder: false,
            }
          },
      }
    })
  }, [props.totalHealthExpense])

  return (  
    <div>
      <Bar options={chartOptions} data={chartData} />
    </div>
  );
}

export default HealthBarChart;