import React from 'react'

import './AppComparisonCartDetail.css';

import altImg from "../ImgComponents/write6.jpg";

export default function AppComparisonCartDetailDetail(props) {
    const cartChannel = props.comparisonCartChannel;
    // console.log(cartChannel);

    const compactNumberFormat = new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short", maximumFractionDigits: 2, });
    // const commaNumberFormat = new Intl.NumberFormat("en-US");
    const percentNumberformat = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 5 });
    return (
        <div key={props.i} className="AppComparisonCartDetailArea">
            <div className='AppComparisonCartDetailHeader'>
                <img className='AppComparisonCartDetailHeaderImg' src={cartChannel.channelThumbnailUrl}  alt={cartChannel.channelCustomUrl} onError={(e) => e.target.src = altImg} />
                <h6 className='AppComparisonCartDetailHeaderh6'>{cartChannel.channelTitle}</h6>
                <p className='AppComparisonCartDetailHeaderp'>{cartChannel.channelPublishedAt.substring(0, 10)}</p>
            </div>
            <div className='AppComparisonCartDetailMetric'>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.channelVideosTotal)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.channelViewsTotal)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.channelViewsAveragePerVideo)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.channelSubscribersTotal)}</p>
                <p className='AppComparisonCartDetailDividerp'>Video Ratio to Channel Videos</p>
                <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.short.VideoRatio2ChannelVideos)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.medium.VideoRatio2ChannelVideos)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.long.VideoRatio2ChannelVideos)}</p>
                <p className='AppComparisonCartDetailDividerp'>Views Ratio to Channel Views</p>
                <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.short.ViewsRatio2ChannelViews)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.medium.ViewsRatio2ChannelViews)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.long.ViewsRatio2ChannelViews)}</p>

                <p className='AppComparisonCartDetailVideop'>+++++ Short Videos +++++</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.short.VideoTotal)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.short.ViewsTotal)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.short.LikesTotal)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.short.CommentsTotal)}</p>
                <p className='AppComparisonCartDetailDividerp'>Averages per Short Video</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.short.ViewsAveragePerVideo)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.short.LikesAveragePerVideo)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.short.CommentsAveragePerVideo)}</p>
                <p className='AppComparisonCartDetailDividerp'>Low Rnaked</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.short.ViewsMin)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.short.LikesMin)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.short.CommentsMin)}</p>
                <p className='AppComparisonCartDetailDividerp'>High Rnaked</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.short.ViewsMax)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.short.LikesMax)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.short.CommentsMax)}</p>
                <p className='AppComparisonCartDetailDividerp'>Engagements</p>
                <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.short.LikesPerViewsRatio)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.short.CommentsPerViewsRatio)}</p>

                <p className='AppComparisonCartDetailVideop'>+++++ Medium Videos +++++</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.medium.VideoTotal)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.medium.ViewsTotal)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.medium.LikesTotal)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.medium.CommentsTotal)}</p>
                <p className='AppComparisonCartDetailDividerp'>Averages per Medium Video</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.medium.ViewsAveragePerVideo)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.medium.LikesAveragePerVideo)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.medium.CommentsAveragePerVideo)}</p>
                <p className='AppComparisonCartDetailDividerp'>Low Rnaked</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.medium.ViewsMin)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.medium.LikesMin)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.medium.CommentsMin)}</p>
                <p className='AppComparisonCartDetailDividerp'>High Rnaked</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.medium.ViewsMax)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.medium.LikesMax)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.medium.CommentsMax)}</p>
                <p className='AppComparisonCartDetailDividerp'>Engagements</p>
                <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.medium.LikesPerViewsRatio)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.medium.CommentsPerViewsRatio)}</p>

                <p className='AppComparisonCartDetailVideop'>+++++ Long Videos +++++</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.long.VideoTotal)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.long.ViewsTotal)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.long.LikesTotal)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.long.CommentsTotal)}</p>
                <p className='AppComparisonCartDetailDividerp'>Averages per Long Video</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.long.ViewsAveragePerVideo)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.long.LikesAveragePerVideo)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.long.CommentsAveragePerVideo)}</p>
                <p className='AppComparisonCartDetailDividerp'>Low Rnaked</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.long.ViewsMin)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.long.LikesMin)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.long.CommentsMin)}</p>
                <p className='AppComparisonCartDetailDividerp'>High Rnaked</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.long.ViewsMax)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.long.LikesMax)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{compactNumberFormat.format(cartChannel.long.CommentsMax)}</p>
                <p className='AppComparisonCartDetailDividerp'>Engagements</p>
                <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.long.LikesPerViewsRatio)}</p>
                <p className='AppComparisonCartDetailHeaderp'>{percentNumberformat.format(cartChannel.long.CommentsPerViewsRatio)}</p>
            </div>

        </div>
    )
}
