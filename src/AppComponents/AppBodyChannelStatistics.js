import React from 'react'
import './AppBodyChannelStatistics.css';

import viewsImg from "../ImgComponents/views3.jpg"
import likesImg from "../ImgComponents/likes3.jpg";
import commentsImg from "../ImgComponents/comments1.jpg";
import emptyImg from "../ImgComponents/empty1.png";
import altImg from "../ImgComponents/write6.jpg";

import AppBodyChannelStatisticsDetail from './AppBodyChannelStatisticsDetail';

export default function AppBodyChannelStatistics(props) {
    const compactNumberFormat = new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short", maximumFractionDigits: 2, });

    const videoStatistics = props.channelsVideoStatistics;

    const averageViewCount = props.channelInDemand.viewCount / props.channelInDemand.videoCount;
    const averageSubscriberCount = props.channelInDemand.subscriberCount / props.channelInDemand.videoCount;

    return (
        <div className="AppBodyStatisticsArea">
            <div className="AppBodyStatisticsAreaHeader">
                <div className="AppBodyStatisticsAreaTitle">
                    <div className="AppBodyStatisticsAreaImg">
                        <img src={props.channelInDemand.thumbnailUrl} alt={props.channelInDemand.customUrl} onError={(e) => e.target.src = altImg} />
                    </div>
                    <div className="AppBodyStatisticsAreaAbout">
                        <h5>{props.channelInDemand.title}</h5>
                        <h6>{props.channelInDemand.publishedAt.substring(0, 10)}</h6>
                    </div>
                </div>
                <div className="AppBodyStatisticsAreaStats">
                    {/* <p>Videos: {props.channelInDemand.videoCount}</p>
                    <p>Views: {viewsCount}</p>
                    <p>Subscribers: {subscriberCount}</p> */}
                    <p>Videos: {compactNumberFormat.format(props.channelInDemand.videoCount)}</p>
                    <p>Views: {compactNumberFormat.format(props.channelInDemand.viewCount)}</p>
                    <p>Subscribers: {compactNumberFormat.format(props.channelInDemand.subscriberCount)}</p>
                </div>
                <div className="AppBodyStatisticsAreaStats">
                    {/* <p>Videos: {props.channelInDemand.videoCount}</p>
                    <p>Views: {viewsCount}</p>
                    <p>Subscribers: {subscriberCount}</p> */}
                    <p>--</p>
                    <p>Avg-Views: {compactNumberFormat.format(averageViewCount)}</p>
                    <p>Avg-Subscribers: {compactNumberFormat.format(averageSubscriberCount)}</p>
                </div>
            </div>

            <p className='AppBodyStatisticsAreaDescription'>{props.channelInDemand.description}</p>

            {/* Statistics */}
            {props.validChannelVideosData &&
                <div className='AppBodyStatistics'>
                    <div className='AppBodyStatisticsHeader'>
                        <div className='AppBodyStatisticsHeaderLabel'>
                            <p>Video Duration</p>
                            <p>( Totals )</p>
                        </div>
                        <div className='AppBodyStatisticsHeaderColumn'>
                            <img className='AppBodyStatisticsHeaderImg' src={viewsImg} alt="viewsImg" />
                            <p className='AppBodyStatisticsHeaderp'>Views</p>
                        </div>
                        <div className='AppBodyStatisticsHeaderColumn'>
                            <img className='AppBodyStatisticsHeaderImg' src={likesImg} alt="likesImg" />
                            <p className='AppBodyStatisticsHeaderp'>Likes</p>
                        </div>
                        <div className='AppBodyStatisticsHeaderColumn'>
                            <img className='AppBodyStatisticsHeaderImg' src={commentsImg} alt="commentsImg" />
                            <p className='AppBodyStatisticsHeaderp'>Comments</p>
                        </div>

                    </div>
                    <div className='AppBodyStatisticsDetail'>
                        {(videoStatistics[2].count !== 0 && videoStatistics[2].hasOwnProperty('statistics')) && <AppBodyChannelStatisticsDetail videoStatistics={videoStatistics[2]} />}
                        {(videoStatistics[1].count !== 0 && videoStatistics[1].hasOwnProperty('statistics')) && <AppBodyChannelStatisticsDetail videoStatistics={videoStatistics[1]} />}
                        {(videoStatistics[0].count !== 0 && videoStatistics[0].hasOwnProperty('statistics')) && <AppBodyChannelStatisticsDetail videoStatistics={videoStatistics[0]} />}
                    </div>
                </div>
            }
            {!props.validChannelVideosData &&
                <div className='AppBodyEmptyArea'>
                    <img className='AppBodyStatisticsEmptyImg' src={emptyImg} alt="emptyImg" />
                </div>
            }
        </div>
    )
}

