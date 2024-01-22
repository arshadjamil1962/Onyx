import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Duration } from 'luxon';

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
  const [channelVideosSampleData] = useState(channelsVideoData);//Videos Sample Data
  const [channelVideos, setChannelVideos] = useState();

  const [channelsVideoStatistics, setChannelsStatistics] = useState([]);

  const [videoDurationsList] = useState(props.videoDurations);
  const [channelsVideoCount, setChannelsVideoCount] = useState(0);

  const [validChannelVideosData, setValidChannelVideosData] = useState(true);
  const [channelDataProcessed, setChannelDataProcessed] = useState(false);

  // const regionInUseTitle = props.regions.filter(region => region.id.includes(props.paramInUse.regionId))[0].name;
  // const languageInUseTitle = props.languages.filter(language => language.id.includes(props.paramInUse['languageId']))[0].name;

  //******************************************************************************************************
  //******************************************************************************************************
  function initializeChannelStatisticArray(channelId) {
    // Using splice to remove all elements from the array
    channelsVideoStatistics.splice(0, channelsVideoStatistics.length);
    //Creating/Initializing the Statistics Array base on Duration for respective channelID
    for (const videoDuration of videoDurationsList) {
      var initChannelStatistics = ({
        "channelId": channelId,
        "statisticsType": videoDuration.name,
        "durationLength": videoDuration.durationLength,
      });
      channelsVideoStatistics.push(initChannelStatistics);
    }

  }

  //******************************************************************************************************
  //******************************************************************************************************
  async function handleComparisionCart(e) {
    var comparisonCartCount = props.comparisonCart.length;
    var comparisonCartListMax = props.paramInUse.comparisonCartListMax;

    const comparisonCartIndex = props.comparisonCart.findIndex(
      (chart) => chart.channelId === e.target.id);
    if (comparisonCartIndex !== -1) {
      // Channel Already added for Comparision
      notifyAlert("error", 'Opps!!! Channel Existed in Comparison Cart.', 2000);
    } else if (comparisonCartCount < comparisonCartListMax) {
      console.log('handleComparisionCart: ');//, e.target.id, _channelInDemand);

      const _channelInDemand = props.channels.filter(channel => channel.id.includes(e.target.id))[0];
      // setChannelInDemand(_channelInDemand);

      initializeChannelStatisticArray(e.target.id);

      await getChannelsVideosList(e.target.id); //Get Videos From uTube API

      // //Sample Videos Statistics loading
      // const channelVideosSample = channelVideosSampleData.filter(channel => channel.channelId.includes(e.target.id));
      // if (channelVideosSample.length !== 0) {
      //   for (const video of channelVideosSample) {
      //     await channelVideoAnalysis(e.target.id, video);
      //     setValidChannelVideosData(true);
      //   }
      // } else {
      //   setValidChannelVideosData(false);
      // }

      // Creating Comparison Statistics for recpective Channel
      // if (validChannelVideosData) {
        const newComparisonStatistics = ({
          channelId: _channelInDemand.id,
          channelCustomUrl: _channelInDemand.customUrl,
          channelThumbnailUrl: _channelInDemand.thumbnailUrl,
          channelTitle: _channelInDemand.title,
          channelPublishedAt: _channelInDemand.publishedAt,
          channelVideosTotal: _channelInDemand.videoCount,
          channelViewsTotal: _channelInDemand.viewCount,
          channelViewsAveragePerVideo: _channelInDemand.viewCount / _channelInDemand.videoCount,
          channelSubscribersTotal: _channelInDemand.subscriberCount,
        });

        for (const videoStats of channelsVideoStatistics) {
          if (videoStats.hasOwnProperty('statistics')) {
            var newCartStats = ({
              [videoStats.statisticsType]:
              {
                videoDuration: videoStats.durationLength,
                VideoTotal: videoStats.statistics.count,
                ViewsTotal: videoStats.statistics.views.count,
                ViewsAveragePerVideo: videoStats.statistics.views.count / videoStats.statistics.count,
                ViewsMin: videoStats.statistics.views.min,
                ViewsMax: videoStats.statistics.views.max,
                LikesTotal: videoStats.statistics.likes.count,
                LikesAveragePerVideo: videoStats.statistics.likes.count / videoStats.statistics.count,
                LikesMin: videoStats.statistics.likes.min,
                LikesMax: videoStats.statistics.likes.max,
                LikesPerViewsRatio: videoStats.statistics.likes.count / videoStats.statistics.views.count,
                CommentsTotal: videoStats.statistics.comments.count,
                CommentsAveragePerVideo: videoStats.statistics.comments.count / videoStats.statistics.count,
                CommentsMin: videoStats.statistics.comments.min,
                CommentsMax: videoStats.statistics.comments.max,
                CommentsPerViewsRatio: videoStats.statistics.comments.count / videoStats.statistics.views.count,
                VideoRatio2ChannelVideos: videoStats.statistics.count / _channelInDemand.videoCount,
                ViewsRatio2ChannelViews: videoStats.statistics.views.count / _channelInDemand.viewCount,
              }
            });
          } else {
            var newCartStats = ({
              [videoStats.statisticsType]:
              {
                videoDuration: videoStats.durationLength,
                VideoTotal: 0,
                ViewsTotal: 0,
                ViewsAveragePerVideo: 0,
                ViewsMin: 0,
                ViewsMax: 0,
                LikesTotal: 0,
                LikesAveragePerVideo: 0,
                LikesMin: 0,
                LikesMax: 0,
                LikesPerViewsRatio: 0,
                CommentsTotal: 0,
                CommentsAveragePerVideo: 0,
                CommentsMin: 0,
                CommentsMax: 0,
                CommentsPerViewsRatio: 0,
                VideoRatio2ChannelVideos: 0,
                ViewsRatio2ChannelViews: 0,
              }
            });
          }

          Object.assign(newComparisonStatistics, newCartStats);
          // newComparisonStatistics((prev)=>[...prev, newCartStats]);
        };

        // props.comparisonCart.push(newComparisonStatistics);
        props.handleComparisionCartAdd(newComparisonStatistics);
      // }
    } else {
      notifyAlert("warning", 'Reached Comparison Cart Max Limit of ' + comparisonCartListMax, 3000);
    }
  }

  //******************************************************************************************************
  //******************************************************************************************************
  async function handleChannelStatistics(e) {
    console.log('handleChannelStatistics: ');

    const _channelInDemand = props.channels.filter(channel => channel.id.includes(e.target.id))[0];
    setChannelInDemand(_channelInDemand);

    initializeChannelStatisticArray(e.target.id);

    await getChannelsVideosList(e.target.id); //Get Videos From uTube API

    // //Sample Videos Statistics loading
    // const channelVideosSample = channelVideosSampleData.filter(channel => channel.channelId.includes(e.target.id));
    // if (channelVideosSample.length !== 0) {
    //   setValidChannelVideosData(true);
    //   for (const video of channelVideosSample) {
    //     channelVideoAnalysis(e.target.id, video);
    //   }
    // } else {
    //   setValidChannelVideosData(false);
    // }
  }

  //******************************************************************************************************
  //******************************************************************************************************
  async function getChannelsVideosList(channelTargetId) {
    console.log('getChannelsVideosList');
    setChannelVideos([]);
    setChannelDataProcessed(false);
    // Show the initial loading toast
    const loadingToastId = toast.info('Loading Channel Video Statistics ...', {
      autoClose: 5000,
      position: "top-center",
      closeOnClick: false,
      draggable: true,
      pauseOnHover: false,
      progress: undefined,
      theme: "light",
      closeButton: false,
    });

    let intervalId; // To keep track of the interval

    try {
      //**************************************************************************************************
      let videosListingData = await fetchChannelsVideoList(channelTargetId, "");
      //**************************************************************************************************
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

        //************************************************************************************************
        //Getting Videos Statistical Information
        let videoStatisticalData = await fetchChannelsVideoInfo(_videosListIds);
        //************************************************************************************************

        const _videosList = videoStatisticalData['items'];

        for (const video of _videosList) {

          // Getting Video Length based on Duration ISO string
          let durationInMinutes = 0;

          try {
            const duration = Duration.fromISO(video["contentDetails"]["duration"]);
            durationInMinutes = duration.as('minutes');
          } catch (error) {
            console.error('Error parsing duration:', error);
          }

          // Getting Duration Category based on Video Duration
          let durationCategory;
          switch (true) {
            case durationInMinutes < 4:
              durationCategory = 'Short';
              break;
            case durationInMinutes <= 20:
              durationCategory = 'Medium';
              break;
            default:
              durationCategory = 'Long';
          }

          const newVideo = {
            channelId: video['snippet']["channelId"],
            durationType: durationCategory,
            channelVideoCount: channelsVideoCount,
            id: video['id'],
            title: video['snippet']['title'],
            publishedAt: video['snippet']['publishedAt'],
            description: video['snippet']['description'],
            thumbnailUrl: video['snippet']['thumbnails']['medium']['url'],
            categoryId: video['snippet']['categoryId'],
            duration: video["contentDetails"]["duration"],
            dimension: video["contentDetails"]["dimension"],
            defination: video["contentDetails"]["definition"],
            uploadStatus: video["status"]["uploadStatus"],
            viewCount: video['statistics']["viewCount"],
            likeCount: video['statistics']["likeCount"],
            commentCount: video['statistics']["commentCount"]
            //.substring(this.href.lastIndexOf('/') + 1)
          };

          // channelVideos.push(newVideo);//Storing Video Information
          await channelVideoAnalysis(channelTargetId, newVideo);//Direct Analysing Video
        };

        // Move to the next page on ChannelsVideoList
        if (_nextPageToken !== "") {
          // Start a 2-second interval to repeatedly show the loading toast
          intervalId = setInterval(() => {
            toast.update(loadingToastId, {
              render: 'Loading Channel Video Statistics ...' + _nextPageToken, // Update the message
            });
          }, 5000);

          //**********************************************************************************************
          videosListingData = await fetchChannelsVideoList(channelTargetId, _nextPageToken);
          //**********************************************************************************************
        } else { _totalResults = 0 }
      }
      setValidChannelVideosData(true);
    } catch (error) {
      console.error('Error fetching or processing data:', error);
      setValidChannelVideosData(false);
      const errorCode = error.response.hasOwnProperty('status') ? error.response.status : 0;
      if (errorCode === 403) {
        notifyAlert("error", 'Current Quota Exceeds, Try Again Later next Day!', 5000);
      }
    } finally {
      // Clear the interval when the try-catch block is done
      clearInterval(intervalId);
      toast.dismiss(loadingToastId);
      setChannelDataProcessed(true);
    }
  }

  //******************************************************************************************************
  //******************************************************************************************************
  const fetchChannelsVideoList = async (channelTargetId, channelsPageToken) => {
    let _searchChannelsVideosUri = "/search?key=" + youTubeApiKey
    _searchChannelsVideosUri = _searchChannelsVideosUri + `&type=video`;
    _searchChannelsVideosUri = _searchChannelsVideosUri + `&part=snippet`;
    _searchChannelsVideosUri = _searchChannelsVideosUri + `&maxResults=50`;
    _searchChannelsVideosUri = _searchChannelsVideosUri + "&order=date";
    _searchChannelsVideosUri = _searchChannelsVideosUri + "&channelId=" + channelTargetId;
    // _searchChannelsVideosUri = _searchChannelsVideosUri + "&videoDuration=" + videoDuration;
    _searchChannelsVideosUri = _searchChannelsVideosUri + ((channelsPageToken !== "") ? `&pageToken=${channelsPageToken}` : "");

    // Your logic to fetch parent data with pagination
    const response = await axios.get(youtubeUrl + _searchChannelsVideosUri);
    const data = await response.data;
    return data;
  };

  //******************************************************************************************************
  //******************************************************************************************************
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

  //******************************************************************************************************
  //******************************************************************************************************
  // function channelVideoAnalysis(_channelInDemand, newVideo) {
  async function channelVideoAnalysis(channelId, newVideo) {
    let channelStats = ([]);

    const statsChannelId = channelId;
    const statsVideoDuration = newVideo.durationType;

    // const channelStats = channelsVideoStatistics.filter(stats => stats.channelId === statsChannelId && stats.statisticsType === statsVideoDuration);
    const channelStatsIndex = channelsVideoStatistics.findIndex(
      (stats) => stats.channelId === statsChannelId && stats.statisticsType === statsVideoDuration
    );
    
    if (channelStatsIndex !== -1) {
      channelStats = channelsVideoStatistics[channelStatsIndex];
    }

    var statsVideoDurationLength = channelStats.durationLength;

    var _videosCount = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.count : 0;

    var _videosViews = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.views.count : 0;
    var _videosViewsMin = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.views.min : Number.POSITIVE_INFINITY;
    var _videosViewsMax = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.views.max : Number.NEGATIVE_INFINITY;
    var _videosViewsMinId = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.views.minId : "";
    var _videosViewsMinTitle = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.views.minTitle : "";
    var _videosViewsMinThumbnailUrl = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.views.minThumbnailUrl : "";
    var _videosViewsMinPublishedAt = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.views.minPublishedAt : "";
    var _videosViewsMaxId = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.views.maxId : "";
    var _videosViewsMaxTitle = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.views.maxTitle : "";
    var _videosViewsMaxThumbnailUrl = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.views.maxThumbnailUrl : "";
    var _videosViewsMaxPublishedAt = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.views.maxPublishedAt : "";

    var _videosLikes = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.likes.count : 0;
    var _videosLikesMin = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.likes.min : Number.POSITIVE_INFINITY;
    var _videosLikesMax = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.likes.max : Number.NEGATIVE_INFINITY;
    var _videosLikesMinId = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.likes.minId : "";
    var _videosLikesMinTitle = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.likes.minTitle : "";
    var _videosLikesMinThumbnailUrl = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.likes.minThumbnailUrl : "";
    var _videosLikesMinPublishedAt = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.likes.minPublishedAt : "";
    var _videosLikesMaxId = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.likes.maxId : "";
    var _videosLikesMaxTitle = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.likes.maxTitle : "";
    var _videosLikesMaxThumbnailUrl = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.likes.maxThumbnailUrl : "";
    var _videosLikesMaxPublishedAt = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.likes.maxPublishedAt : "";

    var _videosComments = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.comments.count : 0;
    var _videosCommentsMin = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.comments.min : Number.POSITIVE_INFINITY;
    var _videosCommentsMax = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.comments.max : Number.NEGATIVE_INFINITY;
    var _videosCommentsMinId = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.comments.minId : "";
    var _videosCommentsMinTitle = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.comments.minTitle : "";
    var _videosCommentsMinThumbnailUrl = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.comments.minThumbnailUrl : "";
    var _videosCommentsMinPublishedAt = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.comments.minPublishedAt : "";
    var _videosCommentsMaxId = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.comments.maxId : "";
    var _videosCommentsMaxTitle = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.comments.maxTitle : "";
    var _videosCommentsMaxThumbnailUrl = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.comments.maxThumbnailUrl : "";
    var _videosCommentsMaxPublishedAt = channelStats.hasOwnProperty('statistics') ? channelStats.statistics.comments.maxPublishedAt : "";


    var _videosViewCount = parseInt(newVideo.viewCount);
    var _videosLikeCount = parseInt(newVideo.likeCount);
    var _videosCommentCount = parseInt(newVideo.commentCount);
    var _videosId = newVideo.id;
    var _videosTitle = newVideo.title;
    var _videosThumbnailUrl = newVideo.thumbnailUrl;
    var _videosPublishedAt = newVideo.publishedAt;

    _videosCount = _videosCount + 1;
    _videosViews = _videosViews + _videosViewCount;
    _videosLikes = _videosLikes + _videosLikeCount;
    _videosComments = _videosComments + _videosCommentCount;

    if (_videosViewCount > 0 && _videosViewCount < _videosViewsMin) {
      _videosViewsMin = _videosViewCount;
      _videosViewsMinId = _videosId;
      _videosViewsMinTitle = _videosTitle;
      _videosViewsMinThumbnailUrl = _videosThumbnailUrl;
      _videosViewsMinPublishedAt = _videosPublishedAt;
    }

    if (_videosViewCount > _videosViewsMax) {
      _videosViewsMax = _videosViewCount;
      _videosViewsMaxId = _videosId;
      _videosViewsMaxTitle = _videosTitle;
      _videosViewsMaxThumbnailUrl = _videosThumbnailUrl;
      _videosViewsMaxPublishedAt = _videosPublishedAt;
    }

    if (_videosLikeCount > 0 && _videosLikeCount < _videosLikesMin) {
      _videosLikesMin = _videosLikeCount;
      _videosLikesMinId = _videosId;
      _videosLikesMinTitle = _videosTitle;
      _videosLikesMinThumbnailUrl = _videosThumbnailUrl;
      _videosLikesMinPublishedAt = _videosPublishedAt;
    }
    if (_videosLikeCount > _videosLikesMax) {
      _videosLikesMax = _videosLikeCount;
      _videosLikesMaxId = _videosId;
      _videosLikesMaxTitle = _videosTitle;
      _videosLikesMaxThumbnailUrl = _videosThumbnailUrl;
      _videosLikesMaxPublishedAt = _videosPublishedAt;
    }
    if (_videosCommentCount > 0 && _videosCommentCount < _videosCommentsMin) {
      _videosCommentsMin = _videosCommentCount;
      _videosCommentsMinId = _videosId;
      _videosCommentsMinTitle = _videosTitle;
      _videosCommentsMinThumbnailUrl = _videosThumbnailUrl;
      _videosCommentsMinPublishedAt = _videosPublishedAt;
    }
    if (_videosCommentCount > _videosCommentsMax) {
      _videosCommentsMax = _videosCommentCount;
      _videosCommentsMaxId = _videosId;
      _videosCommentsMaxTitle = _videosTitle;
      _videosCommentsMaxThumbnailUrl = _videosThumbnailUrl;
      _videosCommentsMaxPublishedAt = _videosPublishedAt;
    }
    var _videosViewsAvg = Math.round(_videosViews / _videosCount, 1);
    var _videosLikesAvg = Math.round(_videosLikes / _videosCount, 1);
    var _videosCommentsAvg = Math.round(_videosComments / _videosCount);

    var _videosLikes2Views = (_videosLikes / _videosViews) * 100;
    var _videosComments2Views = (_videosComments / _videosViews) * 100;

    const newVideoStatistic = ({
      duration: statsVideoDuration,
      durationLength: statsVideoDurationLength,
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
        engage2Views: _videosLikes2Views,
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
        engage2Views: _videosComments2Views,
      },
    });

    const newChannelsStatistics = ({
      channelId: statsChannelId,
      statisticsType: statsVideoDuration,
      durationLength: statsVideoDurationLength,
      statistics: newVideoStatistic,
    });

    // console.log("newStatistics", newChannelsStatistics);

    // Update/Add channelsVideoStatistics array
    if (channelStatsIndex !== -1) {
      // Updating the old entry and store its statistics
      channelsVideoStatistics.splice(channelStatsIndex, 1, newChannelsStatistics);
    } else {
      // Add new entry and store its statistics
      channelsVideoStatistics.push(newChannelsStatistics);
    }
  }

  //******************************************************************************************************
  //******************************************************************************************************
  return (
    <div className="AppBodyContainer">
      <div className="AppBodyContainerHeader">
        <div className="AppBodyContainerTitle">
          <h6>Channels </h6>
        </div>
        {/* <div className="AppBodyContainerSelections">
          <div className="AppBodyContainerSelectionsItem"> Region: {regionInUseTitle} </div>
          <div className="AppBodyContainerSelectionsItem">Language: {languageInUseTitle}</div>
          {(props.paramInUse.textSearch !== '') && <div className="AppBodyContainerSelectionsItem">Searched for: {props.paramInUse['textSearch']}</div>}
        </div> */}
        <div className="AppBodyContainerComparator">
          {/* <!-- Button trigger modal --> */}
          <button type="button" className="AppBodyComparatorListImgBtn btn btn-primary" data-bs-toggle="modal" data-bs-target="#comparatorModal" disabled={props.comparisonCart.length === 0}>
            {/* <span className="badge bg-info rounded-pill"> */}
            <span className="top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {props.comparisonCart.length}
            </span>
          </button>
          {/* <!-- Button trigger modal --> */}
          <button type="button" className="AppBodyComparatorImgBtn btn btn-primary" data-bs-toggle="modal" data-bs-target="#comparatorModal" disabled={props.comparisonCart.length === 0}>
          </button>
        </div>

        <div className="AppBodyContainerPageSelector">
          <h6>{(props.paramInUse.resultsCount === 0) ? "" : props.paramInUse.resultsCount + " Matching's"}</h6>
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
            </div>
          }

          {props.channels.map((channel, index) => {
            return (
              <AppBodyChannel
                key={index}
                channel={channel}
                channelVideos={channelVideos}
                handleComparisionCart={handleComparisionCart}
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
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                onClick={(e) => { setChannelInDemand([]); }}></button>
            </div>
            <div className="modal-body">

              {(channelInDemand.length !== 0 && channelDataProcessed) &&
                <AppBodyChannelStatistics
                  channelInDemand={channelInDemand}
                  videoDurationsList={videoDurationsList}
                  channelsVideoStatistics={channelsVideoStatistics}
                  validChannelVideosData={validChannelVideosData}
                />}

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                onClick={(e) => { setChannelInDemand([]); }}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
