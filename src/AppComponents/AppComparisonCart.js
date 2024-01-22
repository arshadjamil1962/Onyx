import React, { useState } from 'react'

import './AppComparisonCart.css';

import metricsImg from "../ImgComponents/metrics1.jpg";
import chartsImg from "../ImgComponents/metrics3.jpg";

import AppComparisonCartDetail from './AppComparisonCartDetail';

export default function AppComparisonCart(props) {
    const comparisonCartList = props.comparisonCart;
    const [chartDataSet] = useState([]);

    //******************************************************************************************************
    //******************************************************************************************************
    function prepareChartData(chartType, chartDataType) {

        chartDataSet.splice(0, chartDataSet.length);
        var dataSet;
        if (chartDataType === 'ChannelTotals') {
            dataSet = {
                chartTitle: "Channels Videos Statistics",
                xAxisLabels: "Videos in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.channelVideosTotal }]),
            }
            chartDataSet.push(dataSet);

            dataSet = {
                chartTitle: "Channels Views Statistics",
                xAxisLabels: "Views in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.channelViewsTotal }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Channels Subscribers Statistics",
                xAxisLabels: "Subscribers in total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.channelSubscribersTotal }]),
            }
            chartDataSet.push(dataSet);
        } else if (chartDataType === 'ChannelsVideosCountRatio') {
            var yAxisShorts = [comparisonCartList.map((cartChannel) => (cartChannel.Short.VideoRatio2ChannelVideos))];
            var yAxisMedium = [comparisonCartList.map((cartChannel) => (cartChannel.Medium.VideoRatio2ChannelVideos))];
            var yAxisLong = [comparisonCartList.map((cartChannel) => (cartChannel.Long.VideoRatio2ChannelVideos))];

            dataSet = {
                chartTitle: "Channels Videos Count Ratio",
                xAxisLabels: comparisonCartList.map((cartChannel) => (cartChannel.channelTitle)),
                yAxisSet: [{ yAxisSetLabel: 'Shorts', yAxisSetData: yAxisShorts },
                { yAxisSetLabel: 'Medium', yAxisSetData: yAxisMedium },
                { yAxisSetLabel: 'Long', yAxisSetData: yAxisLong }],
            }
            chartDataSet.push(dataSet);
        } else if (chartDataType === 'ChannelsVideosViewRatio') {
            var yAxisShorts = [comparisonCartList.map((cartChannel) => (cartChannel.Short.ViewsRatio2ChannelViews))];
            var yAxisMedium = [comparisonCartList.map((cartChannel) => (cartChannel.Medium.ViewsRatio2ChannelViews))];
            var yAxisLong = [comparisonCartList.map((cartChannel) => (cartChannel.Long.ViewsRatio2ChannelViews))];

            dataSet = {
                chartTitle: "Channels Views Ratio",
                xAxisLabels: comparisonCartList.map((cartChannel) => (cartChannel.channelTitle)),
                yAxisSet: [{ yAxisSetLabel: 'Shorts', yAxisSetData: yAxisShorts },
                { yAxisSetLabel: 'Medium', yAxisSetData: yAxisMedium },
                { yAxisSetLabel: 'Long', yAxisSetData: yAxisLong }],
            }
            chartDataSet.push(dataSet);

            // Shorts Video Statistics
        } else if (chartDataType === 'ShortTotals') {
            dataSet = {
                chartTitle: "Short Videos Statistics",
                xAxisLabels: "Videos in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Short.VideoTotal }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Short Videos Statistics",
                xAxisLabels: "Views in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Short.ViewsTotal }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Short Videos Statistics",
                xAxisLabels: "Likes in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Short.LikesTotal }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Short Videos Statistics",
                xAxisLabels: "Comments in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Short.CommentsTotal }]),
            }
            chartDataSet.push(dataSet);
        } else if (chartDataType === 'ShortAverages') {
            dataSet = {
                chartTitle: "Short Videos Average Statistics",
                xAxisLabels: "Views in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Short.ViewsAveragePerVideo }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Short Videos Average Statistics",
                xAxisLabels: "Likes in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Short.LikesAveragePerVideo }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Short Videos Average Statistics",
                xAxisLabels: "Comments in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Short.CommentsAveragePerVideo }]),
            }
            chartDataSet.push(dataSet);
        } else if (chartDataType === 'ShortLowRanked') {
            dataSet = {
                chartTitle: "Short Videos Low Ranked Statistics",
                xAxisLabels: "Views in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Short.ViewsMin }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Short Videos Low Ranked Statistics",
                xAxisLabels: "Likes in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Short.LikesMin }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Short Videos Low Ranked Statistics",
                xAxisLabels: "Comments in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Short.CommentsMin }]),
            }
            chartDataSet.push(dataSet);
        } else if (chartDataType === 'ShortHighRanked') {
            dataSet = {
                chartTitle: "Short Videos High Ranked Statistics",
                xAxisLabels: "Views in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Short.ViewsMax }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Short Videos High Ranked Statistics",
                xAxisLabels: "Likes in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Short.LikesMax }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Short Videos High Ranked Statistics",
                xAxisLabels: "Comments in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Short.CommentsMax }]),
            }
            chartDataSet.push(dataSet);
        } else if (chartDataType === 'ShortViewEngagement') {
            var yAxisShortsLikes = [comparisonCartList.map((cartChannel) => (cartChannel.Short.LikesPerViewsRatio))];
            var yAxisShortsComments = [comparisonCartList.map((cartChannel) => (cartChannel.Short.CommentsPerViewsRatio))];

            dataSet = {
                chartTitle: "Short Videos Engagement Ratio",
                xAxisLabels: comparisonCartList.map((cartChannel) => (cartChannel.channelTitle)),
                yAxisSet: [{ yAxisSetLabel: 'Likes', yAxisSetData: yAxisShortsLikes },
                { yAxisSetLabel: 'Comments', yAxisSetData: yAxisShortsComments }],
            }
            chartDataSet.push(dataSet);
            // Medium Video Statistics
        } else if (chartDataType === 'MediumTotals') {
            dataSet = {
                chartTitle: "Medium Videos Statistics",
                xAxisLabels: "Videos in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Medium.VideoTotal }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Medium Videos Statistics",
                xAxisLabels: "Views in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Medium.ViewsTotal }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Medium Videos Statistics",
                xAxisLabels: "Likes in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Medium.LikesTotal }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Medium Videos Statistics",
                xAxisLabels: "Comments in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Medium.CommentsTotal }]),
            }
            chartDataSet.push(dataSet);
        } else if (chartDataType === 'MediumAverages') {
            dataSet = {
                chartTitle: "Medium Videos Average Statistics",
                xAxisLabels: "Views in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Medium.ViewsAveragePerVideo }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Medium Videos Average Statistics",
                xAxisLabels: "Likes in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Medium.LikesAveragePerVideo }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Medium Videos Average Statistics",
                xAxisLabels: "Comments in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Medium.CommentsAveragePerVideo }]),
            }
            chartDataSet.push(dataSet);
        } else if (chartDataType === 'MediumLowRanked') {
            dataSet = {
                chartTitle: "Medium Videos Low Ranked Statistics",
                xAxisLabels: "Views in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Medium.ViewsMin }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Medium Videos Low Ranked Statistics",
                xAxisLabels: "Likes in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Medium.LikesMin }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Medium Videos Low Ranked Statistics",
                xAxisLabels: "Comments in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Medium.CommentsMin }]),
            }
            chartDataSet.push(dataSet);
        } else if (chartDataType === 'MediumHighRanked') {
            dataSet = {
                chartTitle: "Medium Videos High Ranked Statistics",
                xAxisLabels: "Views in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Medium.ViewsMax }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Medium Videos High Ranked Statistics",
                xAxisLabels: "Likes in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Medium.LikesMax }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Medium Videos High Ranked Statistics",
                xAxisLabels: "Comments in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Medium.CommentsMax }]),
            }
            chartDataSet.push(dataSet);
        } else if (chartDataType === 'MediumViewEngagement') {
            var yAxisMediumsLikes = [comparisonCartList.map((cartChannel) => (cartChannel.Medium.LikesPerViewsRatio))];
            var yAxisMediumsComments = [comparisonCartList.map((cartChannel) => (cartChannel.Medium.CommentsPerViewsRatio))];

            dataSet = {
                chartTitle: "Medium Videos Engagement Ratio",
                xAxisLabels: comparisonCartList.map((cartChannel) => (cartChannel.channelTitle)),
                yAxisSet: [{ yAxisSetLabel: 'Likes', yAxisSetData: yAxisMediumsLikes },
                { yAxisSetLabel: 'Comments', yAxisSetData: yAxisMediumsComments }],
            }
            chartDataSet.push(dataSet);
            // Long Video Statistics
        } else if (chartDataType === 'LongTotals') {
            dataSet = {
                chartTitle: "Long Videos Statistics",
                xAxisLabels: "Videos in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Long.VideoTotal }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Long Videos Statistics",
                xAxisLabels: "Views in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Long.ViewsTotal }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Long Videos Statistics",
                xAxisLabels: "Likes in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Long.LikesTotal }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Long Videos Statistics",
                xAxisLabels: "Comments in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Long.CommentsTotal }]),
            }
            chartDataSet.push(dataSet);
        } else if (chartDataType === 'LongAverages') {
            dataSet = {
                chartTitle: "Long Videos Average Statistics",
                xAxisLabels: "Views in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Long.ViewsAveragePerVideo }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Long Videos Average Statistics",
                xAxisLabels: "Likes in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Long.LikesAveragePerVideo }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Long Videos Average Statistics",
                xAxisLabels: "Comments in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Long.CommentsAveragePerVideo }]),
            }
            chartDataSet.push(dataSet);
        } else if (chartDataType === 'LongLowRanked') {
            dataSet = {
                chartTitle: "Long Videos Low Ranked Statistics",
                xAxisLabels: "Views in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Long.ViewsMin }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Long Videos Low Ranked Statistics",
                xAxisLabels: "Likes in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Long.LikesMin }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Long Videos Low Ranked Statistics",
                xAxisLabels: "Comments in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Long.CommentsMin }]),
            }
            chartDataSet.push(dataSet);
        } else if (chartDataType === 'LongHighRanked') {
            dataSet = {
                chartTitle: "Long Videos High Ranked Statistics",
                xAxisLabels: "Views in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Long.ViewsMax }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Long Videos High Ranked Statistics",
                xAxisLabels: "Likes in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Long.LikesMax }]),
            }
            chartDataSet.push(dataSet);
            dataSet = {
                chartTitle: "Long Videos High Ranked Statistics",
                xAxisLabels: "Comments in Total",
                yAxisSet: comparisonCartList.map((cartChannel) => [{ yAxisSetLabel: cartChannel.channelTitle, yAxisSetData: cartChannel.Long.CommentsMax }]),
            }
            chartDataSet.push(dataSet);
        } else if (chartDataType === 'LongViewEngagement') {
            var yAxisLongsLikes = [comparisonCartList.map((cartChannel) => (cartChannel.Long.LikesPerViewsRatio))];
            var yAxisLongsComments = [comparisonCartList.map((cartChannel) => (cartChannel.Long.CommentsPerViewsRatio))];

            dataSet = {
                chartTitle: "Long Videos Engagement Ratio",
                xAxisLabels: comparisonCartList.map((cartChannel) => (cartChannel.channelTitle)),
                yAxisSet: [{ yAxisSetLabel: 'Likes', yAxisSetData: yAxisLongsLikes },
                { yAxisSetLabel: 'Comments', yAxisSetData: yAxisLongsComments }],
            }
            chartDataSet.push(dataSet);
        }

        props.setChartData(chartDataSet);

        if (chartType === 'BAR') {
            props.handleParam('comparisonCartShowChartBar', true);
        } else {
            props.handleParam('comparisonCartShowChartBarStacked', true);
        }
    }

    //******************************************************************************************************
    //******************************************************************************************************
    return (
        <div className="AppComparisonCartArea">
            <div className='AppComparisonCartLabelsArea'>
                <div className='AppComparisonCartLabelsHeader'>
                    <img className='AppComparisonCartLabelsHeaderImg' src={metricsImg} alt="viewsImg" />
                    <h6 className='AppComparisonCartLabelsHeaderh6'>Metric's</h6>
                </div>
                <div className='AppComparisonCartLabelsMetric'>
                    <div className='AppComparisonCartLabelsMetricSection'>
                        <div className='AppComparisonCartLabelsMetricTitles'>
                            <p className='AppComparisonCartLabelsHeaderp'>Total Videos</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Total Views</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Average Views per Video</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Total Subscribers</p>

                        </div>
                        <div className='AppComparisonCartLabelsMetricChart'>
                            <img className='AppComparisonCartLabelsMetricChartImg' src={chartsImg} alt="viewsImg"
                                onClick={(e) => { prepareChartData('BAR', 'ChannelTotals'); }} />
                        </div>
                    </div>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <div className='AppComparisonCartLabelsMetricSection'>
                        <div className='AppComparisonCartLabelsMetricTitles'>
                            <p className='AppComparisonCartLabelsHeaderp'>Shorts-Channel Videos Ratio%</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Medium-Channel Videos Ratio%</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Long-Channel Videos Ratio%</p>
                        </div>
                        <div className='AppComparisonCartLabelsMetricChart'>
                            <img className='AppComparisonCartLabelsMetricChartImg' src={chartsImg} alt="viewsImg"
                                onClick={(e) => { prepareChartData('STACKED', 'ChannelsVideosCountRatio'); }} />
                        </div>
                    </div>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <div className='AppComparisonCartLabelsMetricSection'>
                        <div className='AppComparisonCartLabelsMetricTitles'>
                            <p className='AppComparisonCartLabelsHeaderp'>Shorts-Channel Views Ratio%</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Medium-Channel Views Ratio%</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Long-Channel Views Ratio%</p>
                        </div>
                        <div className='AppComparisonCartLabelsMetricChart'>
                            <img className='AppComparisonCartLabelsMetricChartImg' src={chartsImg} alt="viewsImg"
                                onClick={(e) => { prepareChartData('STACKED', 'ChannelsVideosViewRatio'); }} />
                        </div>
                    </div>
                    <p className='AppComparisonCartLabelsVideop'>+++ Short Videos +++</p>
                    <div className='AppComparisonCartLabelsMetricSection'>
                        <div className='AppComparisonCartLabelsMetricTitles'>
                            <p className='AppComparisonCartLabelsHeaderp'>Videos Total</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Views Total</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Likes Total</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Comments Total</p>
                        </div>
                        <div className='AppComparisonCartLabelsMetricChart'>
                            <img className='AppComparisonCartLabelsMetricChartImg' src={chartsImg} alt="viewsImg"
                                onClick={(e) => { prepareChartData('BAR', 'ShortTotals'); }} />
                        </div>
                    </div>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <div className='AppComparisonCartLabelsMetricSection'>
                        <div className='AppComparisonCartLabelsMetricTitles'>
                            <p className='AppComparisonCartLabelsHeaderp'>Views Average/Video</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Likes Average/Video</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Comments Average/Video</p>
                        </div>
                        <div className='AppComparisonCartLabelsMetricChart'>
                            <img className='AppComparisonCartLabelsMetricChartImg' src={chartsImg} alt="viewsImg"
                                onClick={(e) => { prepareChartData('BAR', 'ShortAverages'); }} />
                        </div>
                    </div>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <div className='AppComparisonCartLabelsMetricSection'>
                        <div className='AppComparisonCartLabelsMetricTitles'>
                            <p className='AppComparisonCartLabelsHeaderp'>Views Min</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Likes Min</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Comments Min</p>
                        </div>
                        <div className='AppComparisonCartLabelsMetricChart'>
                            <img className='AppComparisonCartLabelsMetricChartImg' src={chartsImg} alt="viewsImg"
                                onClick={(e) => { prepareChartData('BAR', 'ShortLowRanked'); }} />
                        </div>
                    </div>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <div className='AppComparisonCartLabelsMetricSection'>
                        <div className='AppComparisonCartLabelsMetricTitles'>
                            <p className='AppComparisonCartLabelsHeaderp'>Views Max</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Likes Max</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Comments Max</p>
                        </div>
                        <div className='AppComparisonCartLabelsMetricChart'>
                            <img className='AppComparisonCartLabelsMetricChartImg' src={chartsImg} alt="viewsImg"
                                onClick={(e) => { prepareChartData('BAR', 'ShortHighRanked'); }} />
                        </div>
                    </div>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <div className='AppComparisonCartLabelsMetricSection'>
                        <div className='AppComparisonCartLabelsMetricTitles'>
                            <p className='AppComparisonCartLabelsHeaderp'>Likes-to-Views%</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Comments-to-Views%</p>
                        </div>
                        <div className='AppComparisonCartLabelsMetricChart'>
                            <img className='AppComparisonCartLabelsMetricChartImg' src={chartsImg} alt="viewsImg"
                                onClick={(e) => { prepareChartData('STACKED', 'ShortViewEngagement'); }} />
                        </div>
                    </div>
                    <p className='AppComparisonCartLabelsVideop'>+++ Medium Videos +++</p>
                    <div className='AppComparisonCartLabelsMetricSection'>
                        <div className='AppComparisonCartLabelsMetricTitles'>
                            <p className='AppComparisonCartLabelsHeaderp'>Videos Total</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Views Total</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Likes Total</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Comments Total</p>
                        </div>
                        <div className='AppComparisonCartLabelsMetricChart'>
                            <img className='AppComparisonCartLabelsMetricChartImg' src={chartsImg} alt="viewsImg"
                                onClick={(e) => { prepareChartData('BAR', 'MediumTotals'); }} />
                        </div>
                    </div>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <div className='AppComparisonCartLabelsMetricSection'>
                        <div className='AppComparisonCartLabelsMetricTitles'>
                            <p className='AppComparisonCartLabelsHeaderp'>Views Average/Video</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Likes Average/Video</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Comments Average/Video</p>
                        </div>
                        <div className='AppComparisonCartLabelsMetricChart'>
                            <img className='AppComparisonCartLabelsMetricChartImg' src={chartsImg} alt="viewsImg"
                                onClick={(e) => { prepareChartData('BAR', 'MediumAverages'); }} />
                        </div>
                    </div>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <div className='AppComparisonCartLabelsMetricSection'>
                        <div className='AppComparisonCartLabelsMetricTitles'>
                            <p className='AppComparisonCartLabelsHeaderp'>Views Min</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Likes Min</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Comments Min</p>
                        </div>
                        <div className='AppComparisonCartLabelsMetricChart'>
                            <img className='AppComparisonCartLabelsMetricChartImg' src={chartsImg} alt="viewsImg"
                                onClick={(e) => { prepareChartData('BAR', 'MediumLowRanked'); }} />
                        </div>
                    </div>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <div className='AppComparisonCartLabelsMetricSection'>
                        <div className='AppComparisonCartLabelsMetricTitles'>
                            <p className='AppComparisonCartLabelsHeaderp'>Views Max</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Likes Max</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Comments Max</p>
                        </div>
                        <div className='AppComparisonCartLabelsMetricChart'>
                            <img className='AppComparisonCartLabelsMetricChartImg' src={chartsImg} alt="viewsImg"
                                onClick={(e) => { prepareChartData('BAR', 'MediumHighRanked'); }} />
                        </div>
                    </div>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <div className='AppComparisonCartLabelsMetricSection'>
                        <div className='AppComparisonCartLabelsMetricTitles'>
                            <p className='AppComparisonCartLabelsHeaderp'>Likes-to-Views%</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Comments-to-Views%</p>
                        </div>
                        <div className='AppComparisonCartLabelsMetricChart'>
                            <img className='AppComparisonCartLabelsMetricChartImg' src={chartsImg} alt="viewsImg"
                                onClick={(e) => { prepareChartData('STACKED', 'MediumViewEngagement'); }} />
                        </div>
                    </div>
                    <p className='AppComparisonCartLabelsVideop'>+++ Long Videos +++</p>
                    <div className='AppComparisonCartLabelsMetricSection'>
                        <div className='AppComparisonCartLabelsMetricTitles'>
                            <p className='AppComparisonCartLabelsHeaderp'>Videos Total</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Views Total</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Likes Total</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Comments Total</p>
                        </div>
                        <div className='AppComparisonCartLabelsMetricChart'>
                            <img className='AppComparisonCartLabelsMetricChartImg' src={chartsImg} alt="viewsImg"
                                onClick={(e) => { prepareChartData('BAR', 'LongTotal'); }} />
                        </div>
                    </div>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <div className='AppComparisonCartLabelsMetricSection'>
                        <div className='AppComparisonCartLabelsMetricTitles'>
                            <p className='AppComparisonCartLabelsHeaderp'>Views Average/Video</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Likes Average/Video</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Comments Average/Video</p>
                        </div>
                        <div className='AppComparisonCartLabelsMetricChart'>
                            <img className='AppComparisonCartLabelsMetricChartImg' src={chartsImg} alt="viewsImg"
                                onClick={(e) => { prepareChartData('BAR', 'LongAverages'); }} />
                        </div>
                    </div>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <div className='AppComparisonCartLabelsMetricSection'>
                        <div className='AppComparisonCartLabelsMetricTitles'>
                            <p className='AppComparisonCartLabelsHeaderp'>Views Min</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Likes Min</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Comments Min</p>
                        </div>
                        <div className='AppComparisonCartLabelsMetricChart'>
                            <img className='AppComparisonCartLabelsMetricChartImg' src={chartsImg} alt="viewsImg"
                                onClick={(e) => { prepareChartData('BAR', 'LongLowRanked'); }} />
                        </div>
                    </div>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <div className='AppComparisonCartLabelsMetricSection'>
                        <div className='AppComparisonCartLabelsMetricTitles'>
                            <p className='AppComparisonCartLabelsHeaderp'>Views Max</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Likes Max</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Comments Max</p>
                        </div>
                        <div className='AppComparisonCartLabelsMetricChart'>
                            <img className='AppComparisonCartLabelsMetricChartImg' src={chartsImg} alt="viewsImg"
                                onClick={(e) => { prepareChartData('BAR', 'LongHighRanked'); }} />
                        </div>
                    </div>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <div className='AppComparisonCartLabelsMetricSection'>
                        <div className='AppComparisonCartLabelsMetricTitles'>
                            <p className='AppComparisonCartLabelsHeaderp'>Likes-to-Views%</p>
                            <p className='AppComparisonCartLabelsHeaderp'>Comments-to-Views%</p>
                        </div>
                        <div className='AppComparisonCartLabelsMetricChart'>
                            <img className='AppComparisonCartLabelsMetricChartImg' src={chartsImg} alt="viewsImg"
                                onClick={(e) => { prepareChartData('STACKED', 'LongEngagement'); }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics from Cart */}
            <div className='AppComparisonChannelsArea'>
                {comparisonCartList.map((cartChannel, i) =>
                    <AppComparisonCartDetail
                        key={i}
                        comparisonCartChannel={cartChannel}
                        handleComparisionCartdelete={props.handleComparisionCartdelete} />
                )}
            </div>

            {/* <div className='AppComparisonCartChartsArea'>
                <div className='AppComparisonCartChartsHeader'>
                    <img className='AppComparisonCartChartsHeaderImg' src={chartsImg} alt="viewsImg" />
                    <h6 className='AppComparisonCartChartsHeaderh6'>Charts'</h6>
                </div>
                <div className='AppComparisonCartChartsMetric'>
                </div>
            </div> */}
        </div>


    )
}
