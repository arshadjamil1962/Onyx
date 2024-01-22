import React, { useState, useEffect } from 'react'

import './AppComparisonChartBar.css';

import ChartDataLabels from "chartjs-plugin-datalabels";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

export default function AppComparisonChartBar(props) {
    const compactNumberFormat = new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short", maximumFractionDigits: 2, });

    const [graphDataSet] = useState([]);

    var graphBackgroundColor = ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)'];
    var graphBborderColor = ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'];
    var CanvasBackgroundColor = ['lightGreen', 'lightBlue', 'lightYellow'];

    graphDataSet.splice(0, graphDataSet.length);
    props.chartData.map((chartDataSet, j) => {
        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
            plugins: {
                datalabels: {
                    display: true,
                    color: "black",
                    formatter: function (value, context) {
                        return compactNumberFormat.format(value);
                    },
                    anchor: "end",
                    offset: -20,
                    align: "start"
                },
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: chartDataSet.chartTitle,
                },
                customCanvasBackgroundColor: {
                    color: CanvasBackgroundColor[j],
                },
            },
        };

        const data = {
            labels: [chartDataSet.xAxisLabels],
            datasets: chartDataSet.yAxisSet.map((yAxisData, i) => ({
                label: yAxisData[0].yAxisSetLabel,
                data: [yAxisData[0].yAxisSetData],
                backgroundColor: graphBackgroundColor[i],
                borderColor: graphBborderColor[i],
                borderWidth: 1,
            })),
        };

        graphDataSet.push({ options: options, data: data });
    });

    // const options= {
    //     scales: {
    //         y: {
    //             beginAtZero: true,
    //         },
    //     },
    //     plugins: {
    //         datalabels: {
    //             display: true,
    //             color: "black",
    //             align: "top",
    //           },
    //         legend: {
    //             position: 'top',
    //             display: true,
    //         },
    //         title: {
    //             display: true,
    //             text: 'Channels Videos Statistics - Pluged',
    //         },
    //     },
    // };

    // const data = {
    //     labels: ['Videos Total'],
    //     datasets: [
    //         {
    //             label: 'Channel1',
    //             data: [121],
    //             backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //             borderColor: 'rgba(75, 192, 192, 1)',
    //             borderWidth: 1,
    //         },
    //         {
    //             label: 'Channel2',
    //             data: [70],
    //             backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //             borderColor: 'rgba(255, 99, 132, 1)',
    //             borderWidth: 1,
    //         },
    //         {
    //             label: 'Channel3',
    //             data: [585],
    //             backgroundColor: 'rgba(255, 206, 86, 0.2)',
    //             borderColor: 'rgba(255, 206, 86, 1)',
    //             borderWidth: 1,
    //         },
    //     ],
    // };
    // { console.log('Const', options) }
    // { console.log('Const', data) }

    return (
        <div className='AppComparisonChartBarArea'>
            {/* <div className='AppComparisonChartBarAreaGraph'>
                <Bar options={options} data={data} />
            </div> */}
            {graphDataSet.map((graph, i) => (
                <div className='AppComparisonChartBarAreaGraph' key={i}>
                    <Bar options={graph.options} data={graph.data} />
                </div>
            ))}
        </div>
    )
}
