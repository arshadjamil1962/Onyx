import React from 'react';
import './AppBodyChannelStatisticsDetail.css';

import altImg from "../ImgComponents/write6.jpg";

export default function AppBodyChannelStatisticsDetail(props) {
    const compactNumberFormat = new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short", maximumFractionDigits: 2, });

    let videoStats = props.videoStatistics;

    return (
        <div className='AppBodyChannelStatisticsDetail'>
            <div className='AppBodyStatisticsDetailLabel'>
                <p>( {videoStats.statistics.count} )</p>
                <p>[ {videoStats.statistics.duration} ]</p>
                <p>{videoStats.statistics.durationLength} </p>
            </div>
            {/* Views */}
            <div className='AppBodyStatisticsDetailColumn'>
                <div className='AppBodyStatisticsDetailColumnHeader'>
                    <div className='AppBodyStatisticsDetailColumnHeaderValues'>Total: {compactNumberFormat.format(videoStats.statistics.views.count)}</div>
                    <div className='AppBodyStatisticsDetailColumnHeaderValues'>Average: {compactNumberFormat.format(videoStats.statistics.views.avg)}</div>
                </div>
                <div className='AppBodyStatisticsDetailColumnDetail'>
                    <div className='AppBodyStatisticsDetailColumnDetailInfo'>
                        <div className="AppBodyStatisticsDetailAreaUrl">
                            <img src={videoStats.statistics.views.minThumbnailUrl} alt={videoStats.statistics.views.minId} onError={(e) => e.target.src = altImg} />
                        </div>
                        <div className="AppBodyStatisticsDetailAreaInfo">
                            {/* <h6>Min</h6> */}
                            <h6>{compactNumberFormat.format(videoStats.statistics.views.min)}</h6>
                            <h6>{videoStats.statistics.views.minPublishedAt.substring(0, 10)}</h6>
                            <p>Low Ranked</p>
                        </div>
                    </div>
                    <div className='AppBodyStatisticsDetailColumnDetailInfo'>
                        <div className="AppBodyStatisticsDetailAreaUrl">
                            <img src={videoStats.statistics.views.maxThumbnailUrl} alt={videoStats.statistics.views.maxId} onError={(e) => e.target.src = altImg} />
                        </div>
                        <div className="AppBodyStatisticsDetailAreaInfo">
                            {/* <h6>Max</h6> */}
                            <h6>{compactNumberFormat.format(videoStats.statistics.views.max)}</h6>
                            <h6>{videoStats.statistics.views.maxPublishedAt.substring(0, 10)}</h6>
                            <p>High Ranked</p>
                        </div>
                    </div>
                </div>
                <div className='AppBodyStatisticsDetailColumnFooter'>
                    <p className='text-3'>{videoStats.statistics.likes.minTitle}</p>
                    <p className='text-3'>{videoStats.statistics.likes.maxTitle}</p>
                </div>
            </div>
            {/* Likes */}
            <div className='AppBodyStatisticsDetailColumn'>
                <div className='AppBodyStatisticsDetailColumnHeader'>
                    <div className='AppBodyStatisticsDetailColumnHeaderValues'>Total: {compactNumberFormat.format(videoStats.statistics.likes.count)}</div>
                    <div className='AppBodyStatisticsDetailColumnHeaderValues'>Average: {compactNumberFormat.format(videoStats.statistics.likes.avg)}</div>
                </div>
                <div className='AppBodyStatisticsDetailColumnDetail'>
                    <div className='AppBodyStatisticsDetailColumnDetailInfo'>
                        <div className="AppBodyStatisticsDetailAreaUrl">
                            <img src={videoStats.statistics.likes.minThumbnailUrl} alt={videoStats.statistics.likes.minId} onError={(e) => e.target.src = altImg} />
                        </div>
                        <div className="AppBodyStatisticsDetailAreaInfo">
                            <h6>{compactNumberFormat.format(videoStats.statistics.likes.min)}</h6>
                            <h6>{videoStats.statistics.likes.minPublishedAt.substring(0, 10)}</h6>
                            <p>Low Ranked</p>
                       </div>
                    </div>
                    <div className='AppBodyStatisticsDetailColumnDetailInfo'>
                        <div className="AppBodyStatisticsDetailAreaUrl">
                            <img src={videoStats.statistics.likes.maxThumbnailUrl} alt={videoStats.statistics.likes.maxId} onError={(e) => e.target.src = altImg} />
                        </div>
                        <div className="AppBodyStatisticsDetailAreaInfo">
                            <h6>{compactNumberFormat.format(videoStats.statistics.likes.max)}</h6>
                            <h6>{videoStats.statistics.likes.maxPublishedAt.substring(0, 10)}</h6>
                            <p>High Ranked</p>
                        </div>
                    </div>
                </div>
                <div className='AppBodyStatisticsDetailColumnFooter'>
                    <p className='text-3'>{videoStats.statistics.likes.minTitle}</p>
                    <p className='text-3'>{videoStats.statistics.likes.maxTitle}</p>
                </div>
            </div>
            {/* Comments */}
            <div className='AppBodyStatisticsDetailColumn'>
                <div className='AppBodyStatisticsDetailColumnHeader'>
                    <div className='AppBodyStatisticsDetailColumnHeaderValues'>Total: {compactNumberFormat.format(videoStats.statistics.comments.count)}</div>
                    <div className='AppBodyStatisticsDetailColumnHeaderValues'>Average: {compactNumberFormat.format(videoStats.statistics.comments.avg)}</div>
                </div>
                <div className='AppBodyStatisticsDetailColumnDetail'>
                    <div className='AppBodyStatisticsDetailColumnDetailInfo'>
                        <div className="AppBodyStatisticsDetailAreaUrl">
                            <img src={videoStats.statistics.comments.minThumbnailUrl} alt={videoStats.statistics.comments.minId} onError={(e) => e.target.src = altImg} />
                        </div>
                        <div className="AppBodyStatisticsDetailAreaInfo">
                            <h6>{compactNumberFormat.format(videoStats.statistics.comments.min)}</h6>
                            <h6>{videoStats.statistics.comments.minPublishedAt.substring(0, 10)}</h6>
                            <p>Low Ranked</p>
                       </div>
                    </div>
                    <div className='AppBodyStatisticsDetailColumnDetailInfo'>
                        <div className="AppBodyStatisticsDetailAreaUrl">
                            <img src={videoStats.statistics.comments.maxThumbnailUrl} alt={videoStats.statistics.comments.maxId} onError={(e) => e.target.src = altImg} />
                        </div>
                        <div className="AppBodyStatisticsDetailAreaInfo">
                            <h6>{compactNumberFormat.format(videoStats.statistics.comments.max)}</h6>
                            <h6>{videoStats.statistics.comments.maxPublishedAt.substring(0, 10)}</h6>
                            <p>High Ranked</p>
                        </div>
                    </div>
                </div>
                <div className='AppBodyStatisticsDetailColumnFooter'>
                    <p className='text-3'>{videoStats.statistics.comments.minTitle}</p>
                    <p className='text-3'>{videoStats.statistics.comments.maxTitle}</p>
                </div>
            </div>
        </div>
    )
}
