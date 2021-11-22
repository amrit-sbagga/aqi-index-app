import React, { useState } from 'react';
//import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

const ShowGraph = (props) => {

    let aqiDataList = props.selectedRowData.aqiValList
    let aqiDataTimeList = props.selectedRowData.aqiValTimeList

    const [series] = useState([{
        name: 'AQIs',
        data: aqiDataList
      }]);
    const [options] = useState(
        {
            chart: {
              id: 'aqi-chart'
            },
            plotOptions: {
                bar: {
                  horizontal: true, //horizontal bar chart
                },
              },
            xaxis: {
              categories: aqiDataTimeList,
              labels: {
                show: true,
                rotate: -45
              }
            },
            yaxis: {
              labels: {
                maxWidth: 200
              }
           }
          });
    
    return(
        <div id="chart" style={{background:'pink'}}>
             { console.log("props = ", props) }
            {/* <ReactApexChart options={options} series={series} type="line" height={350} /> */}
            <Chart options={options} series={series} type="bar" width="450px" height="350px"
                style={{paddingLeft:'15px', marginBottom:'20px'}} />
        </div>)
}

export default ShowGraph
