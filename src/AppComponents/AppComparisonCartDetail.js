import React from 'react'

import './AppComparisonCartDetail.css';

import altImg from "../ImgComponents/write6.jpg";

export default function AppComparisonCartDetailDetail(props) {
    const cartChannel = props.comparisonCartChannel;
    // console.log(cartChannel);

    const compactNumberFormat = new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short", maximumFractionDigits: 2, });
    // const commaNumberFormat = new Intl.NumberFormat("en-US");
    const percentNumberformat = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 5 });

    //******************************************************************************************************
    //******************************************************************************************************
    return (
        <div key={props.i} className="AppComparisonCartDetailArea">
            <button type="button" id={cartChannel.channelId} className="AppComparisonCartDetailDeleteImgBtn btn btn-primary" onClick={(e) => { props.handleComparisionCartdelete(e.target.id) }}>
            </button>

            <div className='AppComparisonCartDetailHeader'>
                <img className='AppComparisonCartDetailHeaderImg' src={cartChannel.channelThumbnailUrl} alt={cartChannel.channelCustomUrl} onError={(e) => e.target.src = altImg} />
                <h6 className='AppComparisonCartDetailHeaderh6 text-1'>{cartChannel.channelTitle}</h6>
                <p className='AppComparisonCartDetailHeaderp'>{cartChannel.channelPublishedAt.substring(0, 10)}</p>
            </div>
            <div className='AppComparisonCartDetailMetric'>
                <div className='AppComparisonCartDetailMetricSection'>
                    <div className='AppComparisonCartDetailMetricTitles'>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.channelVideosTotal)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.channelViewsTotal)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.channelViewsAveragePerVideo)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.channelSubscribersTotal)}</p>
                    </div>
                </div>
                <p className='AppComparisonCartDetailDividerp'>Video Ratio to Channel Videos</p>
                <div className='AppComparisonCartDetailMetricSection'>
                    <div className='AppComparisonCartDetailMetricTitles'>
                        <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.Short.VideoRatio2ChannelVideos)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.Medium.VideoRatio2ChannelVideos)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.Long.VideoRatio2ChannelVideos)}</p>
                    </div>
                </div>
                <p className='AppComparisonCartDetailDividerp'>Views Ratio to Channel Views</p>
                <div className='AppComparisonCartDetailMetricSection'>
                    <div className='AppComparisonCartDetailMetricTitles'>
                        <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.Short.ViewsRatio2ChannelViews)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.Medium.ViewsRatio2ChannelViews)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.Long.ViewsRatio2ChannelViews)}</p>
                    </div>
                </div>

                <p className='AppComparisonCartDetailVideop'>+++ Short {cartChannel.Short.videoDuration} +++</p>
                <div className='AppComparisonCartDetailMetricSection'>
                    <div className='AppComparisonCartDetailMetricTitles'>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Short.VideoTotal)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Short.ViewsTotal)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Short.LikesTotal)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Short.CommentsTotal)}</p>
                    </div>
                </div>
                <p className='AppComparisonCartDetailDividerp'>Averages per Short Video</p>
                <div className='AppComparisonCartDetailMetricSection'>
                    <div className='AppComparisonCartDetailMetricTitles'>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Short.ViewsAveragePerVideo)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Short.LikesAveragePerVideo)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Short.CommentsAveragePerVideo)}</p>
                    </div>
                </div>
                <p className='AppComparisonCartDetailDividerp'>Low Rnaked</p>
                <div className='AppComparisonCartDetailMetricSection'>
                    <div className='AppComparisonCartDetailMetricTitles'>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Short.ViewsMin)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Short.LikesMin)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Short.CommentsMin)}</p>
                    </div>
                </div>
                <p className='AppComparisonCartDetailDividerp'>High Rnaked</p>
                <div className='AppComparisonCartDetailMetricSection'>
                    <div className='AppComparisonCartDetailMetricTitles'>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Short.ViewsMax)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Short.LikesMax)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Short.CommentsMax)}</p>
                    </div>
                </div>
                <p className='AppComparisonCartDetailDividerp'>Engagements</p>
                <div className='AppComparisonCartDetailMetricSection'>
                    <div className='AppComparisonCartDetailMetricTitles'>
                        <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.Short.LikesPerViewsRatio)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.Short.CommentsPerViewsRatio)}</p>
                    </div>
                </div>

                <p className='AppComparisonCartDetailVideop'>+++ Medium {cartChannel.Medium.videoDuration} +++</p>
                <div className='AppComparisonCartDetailMetricSection'>
                    <div className='AppComparisonCartDetailMetricTitles'>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Medium.VideoTotal)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Medium.ViewsTotal)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Medium.LikesTotal)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Medium.CommentsTotal)}</p>
                    </div>
                </div>
                <p className='AppComparisonCartDetailDividerp'>Averages per Medium Video</p>
                <div className='AppComparisonCartDetailMetricSection'>
                    <div className='AppComparisonCartDetailMetricTitles'>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Medium.ViewsAveragePerVideo)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Medium.LikesAveragePerVideo)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Medium.CommentsAveragePerVideo)}</p>
                    </div>
                </div>
                <p className='AppComparisonCartDetailDividerp'>Low Rnaked</p>
                <div className='AppComparisonCartDetailMetricSection'>
                    <div className='AppComparisonCartDetailMetricTitles'>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Medium.ViewsMin)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Medium.LikesMin)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Medium.CommentsMin)}</p>
                    </div>
                </div>
                <p className='AppComparisonCartDetailDividerp'>High Rnaked</p>
                <div className='AppComparisonCartDetailMetricSection'>
                    <div className='AppComparisonCartDetailMetricTitles'>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Medium.ViewsMax)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Medium.LikesMax)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Medium.CommentsMax)}</p>
                    </div>
                </div>
                <p className='AppComparisonCartDetailDividerp'>Engagements</p>
                <div className='AppComparisonCartDetailMetricSection'>
                    <div className='AppComparisonCartDetailMetricTitles'>
                        <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.Medium.LikesPerViewsRatio)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.Medium.CommentsPerViewsRatio)}</p>
                    </div>
                </div>

                <p className='AppComparisonCartDetailVideop'>+++ Long {cartChannel.Long.videoDuration} +++</p>
                <div className='AppComparisonCartDetailMetricSection'>
                    <div className='AppComparisonCartDetailMetricTitles'>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Long.VideoTotal)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Long.ViewsTotal)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Long.LikesTotal)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Long.CommentsTotal)}</p>
                    </div>
                </div>
                <p className='AppComparisonCartDetailDividerp'>Averages per Long Video</p>
                <div className='AppComparisonCartDetailMetricSection'>
                    <div className='AppComparisonCartDetailMetricTitles'>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Long.ViewsAveragePerVideo)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Long.LikesAveragePerVideo)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Long.CommentsAveragePerVideo)}</p>
                    </div>
                </div>
                <p className='AppComparisonCartDetailDividerp'>Low Rnaked</p>
                <div className='AppComparisonCartDetailMetricSection'>
                    <div className='AppComparisonCartDetailMetricTitles'>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Long.ViewsMin)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Long.LikesMin)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Long.CommentsMin)}</p>
                    </div>
                </div>
                <p className='AppComparisonCartDetailDividerp'>High Rnaked</p>
                <div className='AppComparisonCartDetailMetricSection'>
                    <div className='AppComparisonCartDetailMetricTitles'>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Long.ViewsMax)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Long.LikesMax)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.Long.CommentsMax)}</p>
                    </div>
                </div>
                <p className='AppComparisonCartDetailDividerp'>Engagements</p>
                <div className='AppComparisonCartDetailMetricSection'>
                    <div className='AppComparisonCartDetailMetricTitles'>
                        <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.Long.LikesPerViewsRatio)}</p>
                        <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.Long.CommentsPerViewsRatio)}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
