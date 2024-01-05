import React from 'react'
import './AppBodyChannels.css';


export default function AppBodyChannels(props) {
    
    // Set the subscriberCount
    let subscriberCount = 0;

    switch (true) {
        // If score is M
        case props.channel.subscriberCount / 1000000 > 1:
            subscriberCount = (props.channel.subscriberCount / 1000000).toFixed(1) + "M";
            break;
        // If score is K 
        case props.channel.subscriberCount / 1000 > 1:
            subscriberCount = (props.channel.subscriberCount / 1000).toFixed(1) + "k";
            break;
        // Anything less is failing
        default:
            subscriberCount = (props.channel.subscriberCount);
    }
    // Set the subscriberCount
    let viewsCount = 0;

    switch (true) {
        // If score is M
        case props.channel.viewCount / 1000000 > 1:
            viewsCount = (props.channel.viewCount / 1000000).toFixed(1) + "M";
            break;
        // If score is K 
        case props.channel.viewCount / 1000 > 1:
            viewsCount = (props.channel.viewCount / 1000).toFixed(1) + "k";
            break;
        // Anything less is failing
        default:
            viewsCount = (props.channel.viewCount);
    }

    return (
        <div className="AppBodyChannelsArea">
            <div className="AppBodyChannelsAreaImg">
                <img src={props.channel.thumbnailUrl} alt="thumbNail" />
            </div>
            <h5>{props.channel.title}</h5>
            <p className='AppBodyChannelsAreaDescription'>{props.channel.description}</p>
            <div className="AppBodyChannelsAreaStats">
                <p>Videos: {props.channel.videoCount}</p>
                <p>Views: {viewsCount}</p>
                <p>Subscribers: {subscriberCount}</p>
            </div>

            <h6>{props.channel.publishedAt.substring(0, 19)}</h6>

            <button type="button" className="btnStatistics btn btn-primary" data-bs-toggle="modal" data-bs-target="#videostatisticmodal" id={props.channel.id} onClick={props.handleChannelStatistics}>
                Statistics
            </button>
            {/* <button type="button" className="btnVideos btn btn-primary" id={props.channel.id} onClick={props.handleChannelVideos}>
                Video's
            </button> */}
        </div>
    )
}

