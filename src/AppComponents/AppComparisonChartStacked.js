import React, { useState, useEffect } from 'react'

import './AppComparisonChartStacked.css';

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

export default function AppComparisonChartStacked(props) {
    const compactNumberFormat = new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short", maximumFractionDigits: 2, });
    const percentNumberformat = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 2 });

    const [graphDataSet] = useState([]);

    var graphBackgroundColor = ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)'];
    var graphBborderColor = ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'];

    graphDataSet.splice(0, graphDataSet.length);

    props.chartData.map((chartDataSet, j) => {
        const graphOptions = {
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                },
            },
            plugins: {
                datalabels: {
                    display: true,
                    color: "black",
                    formatter: function (value, context) {
                        return percentNumberformat.format(value);
                    },
                },
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: chartDataSet.chartTitle,
                },
            },
        };

        const graphData = {
            labels: chartDataSet.xAxisLabels,
            datasets: chartDataSet.yAxisSet.map((yAxisData, i) => ({
                label: yAxisData.yAxisSetLabel,
                data: yAxisData.yAxisSetData[0],
                backgroundColor: graphBackgroundColor[i],
                borderColor: graphBborderColor[i],
                borderWidth: 1,
            })),
        };

        graphDataSet.push({ options: graphOptions, data: graphData });
    });

    // const data = {
    //     labels: ['Channel 1', 'Channel 2', 'Channel 3'],
    //     datasets: [
    //         {
    //             label: 'Short',
    //             data: [15, 26, 76],
    //             backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //             borderColor: 'rgba(75, 192, 192, 1)',
    //             borderWidth: 1,
    //         },
    //         {
    //             label: 'Medium',
    //             data: [65, 60, 12],
    //             backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //             borderColor: 'rgba(255, 99, 132, 1)',
    //             borderWidth: 1,
    //         },
    //         {
    //             label: 'Long',
    //             data: [20, 14, 12],
    //             backgroundColor: 'rgba(255, 206, 86, 0.2)',
    //             borderColor: 'rgba(255, 206, 86, 1)',
    //             borderWidth: 1,
    //         },
    //     ],
    // };

    // const options = {
    //     scales: {
    //         x: {
    //             stacked: true,
    //         },
    //         y: {
    //             stacked: true,
    //         },
    //     },
    //     plugins: {
    //         datalabels: {
    //             display: true,
    //             color: "black",
    //             formatter: function (value, context) {
    //                 return compactNumberFormat.format(value);
    //             },
    //         },
    //         legend: {
    //             position: 'bottom',
    //         },
    //         title: {
    //             display: true,
    //             text: 'Channels Statistics',
    //         },
    //     },

    // };

    return (
        <div className='AppComparisonChartStackedArea'>
            {/* <div className='AppComparisonChartStackedAreaGraph'>
                <Bar options={options} data={data} />
            </div> */}
            {graphDataSet.map((graph, i) => (
                <div className='AppComparisonChartStackedAreaGraph' key={i}>
                    <Bar options={graph.options} data={graph.data} />
                </div>
            ))}
        </div>
    )
}

