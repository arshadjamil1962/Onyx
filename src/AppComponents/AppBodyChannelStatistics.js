import React from 'react'
import './AppBodyChannelStatistics.css';

import viewsImg from "../ImgComponents/views3.jpg"
import likesImg from "../ImgComponents/likes3.jpg";
import commentsImg from "../ImgComponents/comments1.jpg";
import AppBodyChannelStatisticsDetail from './AppBodyChannelStatisticsDetail';

export default function AppBodyChannelStatistics(props) {

    // Set the subscriberCount
    let subscriberCount = 0;

    switch (true) {
        // If score is M
        case props.channelInDemand.subscriberCount / 1000000 > 1:
            subscriberCount = (props.channelInDemand.subscriberCount / 1000000).toFixed(1) + "M";
            break;
        // If score is K 
        case props.channelInDemand.subscriberCount / 1000 > 1:
            subscriberCount = (props.channelInDemand.subscriberCount / 1000).toFixed(1) + "k";
            break;
        // Anything less is failing
        default:
            subscriberCount = (props.channelInDemand.subscriberCount);
    }
    // Set the subscriberCount
    let viewsCount = 0;

    switch (true) {
        // If score is M
        case props.channelInDemand.viewCount / 1000000 > 1:
            viewsCount = (props.channelInDemand.viewCount / 1000000).toFixed(1) + "M";
            break;
        // If score is K 
        case props.channelInDemand.viewCount / 1000 > 1:
            viewsCount = (props.channelInDemand.viewCount / 1000).toFixed(1) + "k";
            break;
        // Anything less is failing
        default:
            viewsCount = (props.channelInDemand.viewCount);
    }

    const videoStatistics = [];
    for (const _videoDuration of props.videoDurationsList) {
        const _videosList = props.channelVideos.filter(video => video.durationType.includes(_videoDuration));
        var _videosCount = 0;
        var _videosViews = 0;
        var _videosViewsMin = Number.POSITIVE_INFINITY;
        var _videosViewsMax = Number.NEGATIVE_INFINITY;
        var _videosLikes = 0;
        var _videosLikesMin = Number.POSITIVE_INFINITY;
        var _videosLikesMax = Number.NEGATIVE_INFINITY;
        var _videosComments = 0;
        var _videosCommentsMin = Number.POSITIVE_INFINITY;
        var _videosCommentsMax = Number.NEGATIVE_INFINITY;
        // var _vedieoPublishedDateMin = 'YEAR-MM-DD';
        // var _vedieoPublishedDateMax = '0000-00-00';

        for (var i = _videosList.length - 1; i >= 0; i--) {
            var _videosViewCount = parseInt(_videosList[i].viewCount);
            var _videosLikeCount = parseInt(_videosList[i].likeCount);
            var _videosCommentCount = parseInt(_videosList[i].commentCount);
            var _videosId = _videosList[i].id;
            var _videosTitle = _videosList[i].title;
            var _videosThumbnailUrl = _videosList[i].thumbnailUrl;
            var _videosPublishedAt = _videosList[i].publishedAt;

            _videosCount = _videosCount + 1;
            _videosViews = _videosViews + _videosViewCount;
            _videosLikes = _videosLikes + _videosLikeCount;
            _videosComments = _videosComments + _videosCommentCount;

            if (_videosViewCount > 0 && _videosViewCount < _videosViewsMin) {
                _videosViewsMin = _videosViewCount;
                var _videosViewsMinId = _videosId;
                var _videosViewsMinTitle = _videosTitle;
                var _videosViewsMinThumbnailUrl = _videosThumbnailUrl;
                var _videosViewsMinPublishedAt = _videosPublishedAt;
            }

            if (_videosViewCount > _videosViewsMax) {
                _videosViewsMax = _videosViewCount;
                var _videosViewsMaxId = _videosId;
                var _videosViewsMaxTitle = _videosTitle;
                var _videosViewsMaxThumbnailUrl = _videosThumbnailUrl;
                var _videosViewsMaxPublishedAt = _videosPublishedAt;
            }

            if (_videosLikeCount > 0 && _videosLikeCount < _videosLikesMin) {
                _videosLikesMin = _videosLikeCount;
                var _videosLikesMinId = _videosId;
                var _videosLikesMinTitle = _videosTitle;
                var _videosLikesMinThumbnailUrl = _videosThumbnailUrl;
                var _videosLikesMinPublishedAt = _videosPublishedAt;
            }
            if (_videosLikeCount > _videosLikesMax) {
                _videosLikesMax = _videosLikeCount;
                var _videosLikesMaxId = _videosId;
                var _videosLikesMaxTitle = _videosTitle;
                var _videosLikesMaxThumbnailUrl = _videosThumbnailUrl;
                var _videosLikesMaxPublishedAt = _videosPublishedAt;
            }
            if (_videosCommentCount > 0 && _videosCommentCount < _videosCommentsMin) {
                _videosCommentsMin = _videosCommentCount;
                var _videosCommentsMinId = _videosId;
                var _videosCommentsMinTitle = _videosTitle;
                var _videosCommentsMinThumbnailUrl = _videosThumbnailUrl;
                var _videosCommentsMinPublishedAt = _videosPublishedAt;
            }
            if (_videosCommentCount > _videosCommentsMax) {
                _videosCommentsMax = _videosCommentCount;
                var _videosCommentsMaxId = _videosId;
                var _videosCommentsMaxTitle = _videosTitle;
                var _videosCommentsMaxThumbnailUrl = _videosThumbnailUrl;
                var _videosCommentsMaxPublishedAt = _videosPublishedAt;
            }
            // if (_videosList.publishedAt  < _vedieoPublishedDateMin) _vedieoPublishedDateMin = _videosList.publishedAt;
        }
        var _videosViewsAvg = Math.round(_videosViews / _videosCount, 1);
        var _videosLikesAvg = Math.round(_videosLikes / _videosCount, 1);
        var _videosCommentsAvg = Math.round(_videosComments / _videosCount);

        const newVideoStatistic = ({
            duration: _videoDuration,
            count: _videosCount,
            // published1stDate: _vedieoPublishedDateMin,
            views: {
                count: _videosViews,
                min: _videosViewsMin,
                minId: _videosViewsMinId,
                minTitle: _videosViewsMinTitle,
                minThumbnailUrl: _videosViewsMinThumbnailUrl,
                minPublishedAt: _videosViewsMinPublishedAt,

                max: _videosViewsMax,
                maxId: _videosViewsMaxId,
                maxTitle: _videosViewsMaxTitle,
                maxThumbnailUrl: _videosViewsMaxThumbnailUrl,
                maxPublishedAt: _videosViewsMaxPublishedAt,

                avg: _videosViewsAvg,
            },
            likes: {
                count: _videosLikes,
                min: _videosLikesMin,
                minId: _videosLikesMinId,
                minTitle: _videosLikesMinTitle,
                minThumbnailUrl: _videosLikesMinThumbnailUrl,
                minPublishedAt: _videosLikesMinPublishedAt,

                max: _videosLikesMax,
                maxId: _videosLikesMaxId,
                maxTitle: _videosLikesMaxTitle,
                maxThumbnailUrl: _videosLikesMaxThumbnailUrl,
                maxPublishedAt: _videosLikesMaxPublishedAt,

                avg: _videosLikesAvg,
            },
            comments: {
                count: _videosComments,
                min: _videosCommentsMin,
                minId: _videosCommentsMinId,
                minTitle: _videosCommentsMinTitle,
                minThumbnailUrl: _videosCommentsMinThumbnailUrl,
                minPublishedAt: _videosCommentsMinPublishedAt,

                max: _videosCommentsMax,
                maxId: _videosCommentsMaxId,
                maxTitle: _videosCommentsMaxTitle,
                maxThumbnailUrl: _videosCommentsMaxThumbnailUrl,
                maxPublishedAt: _videosCommentsMaxPublishedAt,

                avg: _videosCommentsAvg,
            },

        })
        videoStatistics.push(newVideoStatistic);
    }

    console.log(videoStatistics);

    return (
        <div className="AppBodyStatisticsArea">
            <div className="AppBodyStatisticsAreaHeader">
                <div className="AppBodyStatisticsAreaTitle">
                    <div className="AppBodyStatisticsAreaImg">
                        <img src={props.channelInDemand.thumbnailUrl} alt="thumbNail" />
                    </div>
                    <div className="AppBodyStatisticsAreaAbout">
                        <h5>{props.channelInDemand.title}</h5>
                        <h6>{props.channelInDemand.publishedAt.substring(0, 10)}</h6>
                    </div>
                </div>
                <div className="AppBodyStatisticsAreaStats">
                    <p>Videos: {props.channelInDemand.videoCount}</p>
                    <p>Views: {viewsCount}</p>
                    <p>Subscribers: {subscriberCount}</p>
                </div>
            </div>

            <p className='AppBodyStatisticsAreaDescription'>{props.channelInDemand.description}</p>

            {/* Statistics */}
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
                    {(videoStatistics[2].count !== 0) && <AppBodyChannelStatisticsDetail videoStatistics={videoStatistics[2]} />}
                    {(videoStatistics[1].count !== 0) && <AppBodyChannelStatisticsDetail videoStatistics={videoStatistics[1]} />}
                    {(videoStatistics[0].count !== 0) && <AppBodyChannelStatisticsDetail videoStatistics={videoStatistics[0]} />}
                </div>
            </div>
        </div>
    )
}

