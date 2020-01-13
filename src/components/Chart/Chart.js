import React from 'react';
import { Chart } from "react-google-charts";


  

function BarChart(props) {
    return (
        <div className="App">
        <Chart chartType="BarChart" width="100%" height="400px" data={props.chartData} />
        </div>
    );
  }
  
  export default BarChart;