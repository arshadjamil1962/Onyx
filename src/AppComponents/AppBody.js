import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { toast } from 'react-toastify';

import './AppBody.css';

import channelsVideoData from '../DataComponents/ChannelsVideos.json';

import AppBodyChannel from './AppBodyChannels';
import AppBodyOptions from './AppBodyOptions';
import AppBodyChannelStatistics from './AppBodyChannelStatistics';

import { youTubeApiKey, youtubeUrl, notifyAlert } from "./AppComponents";

import emptyImg from "../ImgComponents/empty3.gif";

export default function AppBody(props) {
  const perPageSizes = [10, 20, 30, 40, 50];
  const [perPageResults, setPerPageResults] = useState(props.paramInUse.resultsPerPage);
  const [channelInDemand, setChannelInDemand] = useState([]);
  const [channelVideos, setChannelVideos] = useState(channelsVideoData);
  const [showVideos, setShowVideos] = useState(false);

  const [videoDurationsList] = useState(["long", "medium", "short"]);
  const [channelsVideoCount, setChannelsVideoCount] = useState(0);

  const regionInUseTitle = props.regions.filter(region => region.id.includes(props.paramInUse.regionId))[0].name;
  const languageInUseTitle = props.languages.filter(language => language.id.includes(props.paramInUse['languageId']))[0].name;

  async function handleChannelVideos(e) {
    const channelInDemand = props.channels.filter(channel => channel.id.includes(e.target.id))[0];
    setChannelInDemand(channelInDemand);
    setShowVideos(true);
    console.log('handleChannelVideos: ');
    // handleChannelsVideosList(e.target.id);
    console.log(channelVideos);
  }

  async function handleChannelStatistics(e) {
    const channelInDemand = props.channels.filter(channel => channel.id.includes(e.target.id))[0];
    setChannelInDemand(channelInDemand);
    console.log('handleChannelStatistics: ');
    // handleChannelsVideosList(e.target.id);
    console.log(channelVideos);
  }

  async function handleChannelsVideosList(channelTargetId) {

    setChannelVideos([]);
    for (const videoDuration of videoDurationsList) {
      await getChannelsVideosList(channelTargetId, videoDuration);
    }
  }

  const fetchChannelsVideoList = async (channelTargetId, videoDuration, channelsPageToken) => {
    let _searchChannelsVideosUri = "/search?key=" + youTubeApiKey
    _searchChannelsVideosUri = _searchChannelsVideosUri + `&type=video`;
    _searchChannelsVideosUri = _searchChannelsVideosUri + `&part=snippet`;
    _searchChannelsVideosUri = _searchChannelsVideosUri + `&maxResults=50`;
    _searchChannelsVideosUri = _searchChannelsVideosUri + "&order=date";
    _searchChannelsVideosUri = _searchChannelsVideosUri + "&channelId=" + channelTargetId;
    _searchChannelsVideosUri = _searchChannelsVideosUri + "&videoDuration=" + videoDuration;
    _searchChannelsVideosUri = _searchChannelsVideosUri + ((channelsPageToken !== "") ? `&pageToken=${channelsPageToken}` : "");

    // Your logic to fetch parent data with pagination
    const response = await axios.get(youtubeUrl + _searchChannelsVideosUri);
    const data = await response.data;
    return data;
  };

  const fetchChannelsVideoInfo = async (_videosListIds) => {
    //URL for loading channel's data with  statical information
    let _videosUri = "/videos?key=" + youTubeApiKey;
    _videosUri = _videosUri + "&id=" + _videosListIds;
    _videosUri = _videosUri + `&maxResults=50`;
    _videosUri = _videosUri + `&part=snippet,statistics,status,contentDetails`;

    const response = await axios.get(youtubeUrl + _videosUri);
    const data = await response.data;
    return data;
  };

  async function getChannelsVideosList(channelTargetId, videoDuration) {

    try {
      notifyAlert("info", 'Loading Channels Video Data. Wait...!', 1000);

      let videosListingData = await fetchChannelsVideoList(channelTargetId, videoDuration, "");
      let _totalResults = videosListingData['pageInfo']['totalResults'] || 0;

      // Process each page of parent data
      while (_totalResults > 0) {
        const _nextPageToken = videosListingData.hasOwnProperty('nextPageToken') ? videosListingData['nextPageToken'] : "";
        // const _prevPageToken = videosListingData.hasOwnProperty('prevPageToken') ? videosListingData['prevPageToken'] : "";
        _totalResults = videosListingData['pageInfo']['totalResults'] || 0;

        if (channelsVideoCount === 0) {
          setChannelsVideoCount(_totalResults)
        }

        //Getting Channels ID for loading videos statical information
        const _videosIdDataList = videosListingData['items'];
        let _videosListIds = "";

        for (const videoIds of _videosIdDataList) {
          _videosListIds = _videosListIds + "," + videoIds['id']['videoId'];
        };

        _videosListIds = _videosListIds.substring(1);

        //Getting Videos Statistical Information
        let videoStatisticalData = await fetchChannelsVideoInfo(_videosListIds);

        const _videosList = videoStatisticalData['items'];

        for (const video of _videosList) {
          const newVideo = {
            channelId: video['snippet']["channelId"],
            durationType: videoDuration,
            channelVideoCount: channelsVideoCount,
            id: video['id'],
            title: video['snippet']['title'],
            publishedAt: video['snippet']['publishedAt'],
            description: video['snippet']['description'],
            thumbnailUrl: video['snippet']['thumbnails']['medium']['url'],
            categoryId: video['snippet']['categoryId'],
            duration: ["contentDetails"]["duration"],
            dimension: ["contentDetails"]["dimension"],
            defination: ["contentDetails"]["definition"],
            uploadStatus: ["status"]["uploadStatus"],
            viewCount: video['statistics']["viewCount"],
            likeCount: video['statistics']["likeCount"],
            commentCount: video['statistics']["commentCount"]
            //.substring(this.href.lastIndexOf('/') + 1)
          };

          channelVideos.push(newVideo);
        };

        // Move to the next page on ChannelsVideoList
        if (_nextPageToken !== "") {
          videosListingData = await fetchChannelsVideoList(channelTargetId, videoDuration, _nextPageToken);
        } else { _totalResults = 0 }
      }
      toast.dismiss();
    } catch (error) {
      console.error('Error fetching or processing data:', error);
      const errorCode = error.response.hasOwnProperty('status') ? error.response.status : 0;
      if (errorCode === 403) {
        notifyAlert("error", 'Current Quota Exceeds, Try Again Later next Day!', 5000);
      }
    }
  }

  return (
    <div className="AppBodyContainer">
      <div className="AppBodyContainerHeader">
        <div className="AppBodyContainerTitle">
          <h6>{(props.paramInUse.resultsCount === 0) ? "" : props.paramInUse.resultsCount} Channel's </h6>
        </div>
        {/* <div className="AppBodyContainerSelections">
          <div className="AppBodyContainerSelectionsItem"> Region: {regionInUseTitle} </div>
          <div className="AppBodyContainerSelectionsItem">Language: {languageInUseTitle}</div>
          {(props.paramInUse.textSearch !== '') && <div className="AppBodyContainerSelectionsItem">Searched for: {props.paramInUse['textSearch']}</div>}
        </div> */}
        <div className="AppBodyContainerPageSelector">
          <button type="button" className="btnPrevPageTag btn btn-primary btn-sm" disabled={props.paramInUse.prevPageTag === "" ? true : false}
            onClick={(e) => { props.handleParam('pageTag', props.paramInUse.prevPageTag); console.log("PrevPage"); }}
          >Previous</button>

          <select className="form-select" id="pageSizeSelection" aria-label="Default select example"
            onChange={(e) => {
              setPerPageResults(e.target.value);
              props.handleParam('resultsPerPage', e.target.value);
            }}
            value={perPageResults}>
            {perPageSizes.map((perPageSize, i) =>
              <option key={i} value={perPageSize}>{perPageSize} per page</option>
            )}
          </select>

          <button type="button" className="btnNextPageTag btn btn-info btn-sm" disabled={props.paramInUse.nextPageTag === "" ? true : false}
            onClick={(e) => { props.handleParam('pageTag', props.paramInUse.nextPageTag); console.log("NextPage"); }}
          >Next</button>
        </div>
      </div>

      <div className='AppBodyContainerBody'>
        <div className='AppBodyContainerBodyOptions'>
          <AppBodyOptions regions={props.regions}
            languages={props.languages}
            topicsParents={props.topicsParents}
            ordering={props.ordering}
            paramInUse={props.paramInUse}
            setParamInUse={props.setParamInUse}
            handleParam={props.handleParam} />
        </div>
        <div className='AppBodyContainerBodyChannels'>
          {(props.channels.length === 0) &&
            <div className='emptySearchImgArea'>
              <img className='emptySearchImg' src={emptyImg} alt="Empty Search Img" />
            </div>}

          {props.channels.map((channel, index) => {
            return (
              <AppBodyChannel
                key={index}
                channel={channel}
                channelVideos={channelVideos}
                handleChannelVideos={handleChannelVideos}
                handleChannelStatistics={handleChannelStatistics}
              />
            );
          })}
        </div>
      </div>

      {/* <!-- Button trigger modal --> */}
      {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#videostatisticmodal">
        Launch static backdrop modal
      </button> */}

      {/* <!-- Modal --> */}
      <div className="modal fade" id="videostatisticmodal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="videostatisticmodalLabel" aria-hidden="true">
        <div className="modal-dialog  modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="videostatisticmodalLabel">Statistics</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              {(channelInDemand.length !== 0) && 
               <AppBodyChannelStatistics 
               channelInDemand={channelInDemand}
               channelVideos={channelVideos}
               videoDurationsList={videoDurationsList}
                />}

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
