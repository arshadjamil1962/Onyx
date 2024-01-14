import React from 'react'
import './AppBodyChannels.css';

// import altImg from "../ImgComponents/tryit4.jpg";
import altImg from "../ImgComponents/write6.jpg";

export default function AppBodyChannels(props) {
    const compactNumberFormat = new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short", maximumFractionDigits: 2, });
    const averageViewCount = props.channel.viewCount / props.channel.videoCount;
    const averageSubscriberCount = props.channel.subscriberCount / props.channel.videoCount;
    
    return (
        <div className="AppBodyChannelsArea">
            <div className="AppBodyChannelsAreaImg">
                <img src={props.channel.thumbnailUrl} alt={props.channel.customUrl} onError={(e) => e.target.src = altImg}/>
            </div>
            <h5>{props.channel.title}</h5>
            <p className='AppBodyChannelsAreaDescription'>{props.channel.description}</p>
            <div className="AppBodyChannelsAreaStats">
                <p>Videos: {compactNumberFormat.format(props.channel.videoCount)}</p>
                <p>Views: {compactNumberFormat.format(props.channel.viewCount)} - {compactNumberFormat.format(averageViewCount)} Avg.</p>
                <p>Subscribers: {compactNumberFormat.format(props.channel.subscriberCount)} - {compactNumberFormat.format(averageSubscriberCount)} Avg.</p>
            </div>

            <h6>{props.channel.publishedAt.substring(0, 19)}</h6>

            <button type="button" className="btnStatistics btn btn-primary" data-bs-toggle="modal" data-bs-target="#videostatisticmodal" id={props.channel.id} onClick={props.handleChannelStatistics}>
                Statistics
            </button>
            <button type="button" className="btnCompare btn btn-primary" id={props.channel.id} onClick={props.handleComparisionCart}>
                + Compare
            </button>
        </div>
    )
}

