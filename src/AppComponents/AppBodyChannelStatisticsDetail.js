import React from 'react';
import './AppBodyChannelStatisticsDetail.css';

export default function AppBodyChannelStatisticsDetail(props) {
    return (
        <div className='AppBodyChannelStatisticsDetail'>
            <div className='AppBodyStatisticsDetailLabel'>
                <p>{props.videoStatistics.duration} </p>
                <p>({props.videoStatistics.count})</p>
            </div>
            {/* Views */}
            <div className='AppBodyStatisticsDetailColumn'>
                <div className='AppBodyStatisticsDetailColumnHeader'>
                    <div className='AppBodyStatisticsDetailColumnHeaderValues'>Total: {props.videoStatistics.views.count}</div>
                    <div className='AppBodyStatisticsDetailColumnHeaderValues'>Average: {props.videoStatistics.views.avg}</div>
                </div>
                <div className='AppBodyStatisticsDetailColumnDetail'>
                    <div className='AppBodyStatisticsDetailColumnDetailInfo'>
                        <div className="AppBodyStatisticsDetailAreaUrl">
                            <img src={props.videoStatistics.views.minThumbnailUrl} alt="thumbNail" />
                        </div>
                        <div className="AppBodyStatisticsDetailAreaInfo">
                            {/* <h6>Min</h6> */}
                            <h6>{props.videoStatistics.views.min}</h6>
                            <h6>{props.videoStatistics.views.minPublishedAt.substring(0, 10)}</h6>
                        </div>
                    </div>
                    <div className='AppBodyStatisticsDetailColumnDetailInfo'>
                        <div className="AppBodyStatisticsDetailAreaUrl">
                            <img src={props.videoStatistics.views.maxThumbnailUrl} alt="thumbNail" />
                        </div>
                        <div className="AppBodyStatisticsDetailAreaInfo">
                            {/* <h6>Max</h6> */}
                            <h6>{props.videoStatistics.views.max}</h6>
                            <h6>{props.videoStatistics.views.maxPublishedAt.substring(0, 10)}</h6>
                        </div>
                    </div>
                </div>
                <div className='AppBodyStatisticsDetailColumnFooter'>
                    <p className='text-3'>{props.videoStatistics.likes.minTitle}</p>
                    <p className='text-3'>{props.videoStatistics.likes.maxTitle}</p>
                </div>
            </div>
            {/* Likes */}
            <div className='AppBodyStatisticsDetailColumn'>
                <div className='AppBodyStatisticsDetailColumnHeader'>
                    <div className='AppBodyStatisticsDetailColumnHeaderValues'>Total: {props.videoStatistics.likes.count}</div>
                    <div className='AppBodyStatisticsDetailColumnHeaderValues'>Average: {props.videoStatistics.likes.avg}</div>
                </div>
                <div className='AppBodyStatisticsDetailColumnDetail'>
                    <div className='AppBodyStatisticsDetailColumnDetailInfo'>
                        <div className="AppBodyStatisticsDetailAreaUrl">
                            <img src={props.videoStatistics.likes.minThumbnailUrl} alt="thumbNail" />
                        </div>
                        <div className="AppBodyStatisticsDetailAreaInfo">
                            <h6>{props.videoStatistics.likes.min}</h6>
                            <h6>{props.videoStatistics.likes.minPublishedAt.substring(0, 10)}</h6>
                        </div>
                    </div>
                    <div className='AppBodyStatisticsDetailColumnDetailInfo'>
                        <div className="AppBodyStatisticsDetailAreaUrl">
                            <img src={props.videoStatistics.likes.maxThumbnailUrl} alt="thumbNail" />
                        </div>
                        <div className="AppBodyStatisticsDetailAreaInfo">
                            <h6>{props.videoStatistics.likes.max}</h6>
                            <h6>{props.videoStatistics.likes.maxPublishedAt.substring(0, 10)}</h6>
                        </div>
                    </div>
                </div>
                <div className='AppBodyStatisticsDetailColumnFooter'>
                    <p className='text-3'>{props.videoStatistics.likes.minTitle}</p>
                    <p className='text-3'>{props.videoStatistics.likes.maxTitle}</p>
                </div>
            </div>
            {/* Comments */}
            <div className='AppBodyStatisticsDetailColumn'>
                <div className='AppBodyStatisticsDetailColumnHeader'>
                    <div className='AppBodyStatisticsDetailColumnHeaderValues'>Total: {props.videoStatistics.comments.count}</div>
                    <div className='AppBodyStatisticsDetailColumnHeaderValues'>Average: {props.videoStatistics.comments.avg}</div>
                </div>
                <div className='AppBodyStatisticsDetailColumnDetail'>
                    <div className='AppBodyStatisticsDetailColumnDetailInfo'>
                        <div className="AppBodyStatisticsDetailAreaUrl">
                            <img src={props.videoStatistics.comments.minThumbnailUrl} alt="thumbNail" />
                        </div>
                        <div className="AppBodyStatisticsDetailAreaInfo">
                            <h6>{props.videoStatistics.comments.min}</h6>
                            <h6>{props.videoStatistics.comments.minPublishedAt.substring(0, 10)}</h6>
                        </div>
                    </div>
                    <div className='AppBodyStatisticsDetailColumnDetailInfo'>
                        <div className="AppBodyStatisticsDetailAreaUrl">
                            <img src={props.videoStatistics.comments.maxThumbnailUrl} alt="thumbNail" />
                        </div>
                        <div className="AppBodyStatisticsDetailAreaInfo">
                            <h6>{props.videoStatistics.comments.max}</h6>
                            <h6>{props.videoStatistics.comments.maxPublishedAt.substring(0, 10)}</h6>
                        </div>
                    </div>
                </div>
                <div className='AppBodyStatisticsDetailColumnFooter'>
                    <p className='text-3'>{props.videoStatistics.comments.minTitle}</p>
                    <p className='text-3'>{props.videoStatistics.comments.maxTitle}</p>
                </div>
            </div>
        </div>
    )
}
