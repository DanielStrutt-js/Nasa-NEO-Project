import React from 'react';
import { Chart } from "react-google-charts";


  

const TableChart = props => (
    
        <Chart chartType="Table" width="100%" height="400px" data={props.chartData}/>
        
    );
  
  
  export default TableChart;