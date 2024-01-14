import React, { useState, useEffect } from "react";
import axios from 'axios';

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import regionsData from '../DataComponents/Regions.json';
import languagesData from '../DataComponents/Languages.json';
import categoriesData from '../DataComponents/Categories.json';
import topicsParentData from '../DataComponents/TopicsParent.json';
import topicsData from '../DataComponents/Topics.json';
import videoDurationsData from '../DataComponents/VideoDurations.json';

import channelsOrderingData from '../DataComponents/ChannelsOrdering.json';
import channelsListingData from '../DataComponents/ChannelsList.json';


import AppHeader from './AppHeader'
import { AppFooter } from './AppFooter'
import AppBody from "./AppBody";

import { youTubeApiKey, youtubeUrl, notifyAlert } from "./AppComponents";
import AppComparisonCart from "./AppComparisonCart";

function AppHome() {
  const year = new Date().getFullYear();
  const [, setForceUpdate] = useState();

  const [regions] = useState(regionsData);
  const [languages] = useState(languagesData);
  const [categories] = useState(categoriesData);
  const [topicsParents] = useState(topicsParentData);
  const [topics] = useState(topicsData);
  const [ordering] = useState(channelsOrderingData);
  const [videoDurations] = useState(videoDurationsData);

  const regionDefault = "00";
  const languageDefault = "00";
  const categoryDefault = "0";
  const topicDefault = "/m/00000";
  const topicParentDefault = "/m/00000";
  const resultsPerPageDefault = '10';
  const resultsOrderingDefault = "relevance";
  const pageTagDefault = '';
  const pagePublishedDefault = '';
  const comparisonCartListDefault = 3;

  const [channels, setChannels] = useState([]);
  const [comparisonCart, setComparisonCart] = useState([]);

  const [paramInUse, setParamInUse] = useState({
    regionId: regionDefault,
    languageId: languageDefault,
    categoryId: categoryDefault,
    topicParentId: topicParentDefault,
    topicId: topicDefault,
    resultsPerPage: resultsPerPageDefault,
    resultsOrdering: resultsOrderingDefault,
    resultsPublishedBefore: pagePublishedDefault,
    resultsPublishedAfter: pagePublishedDefault,
    resultsCount: 0,
    pageTag: pageTagDefault,
    nextPageTag: "",
    prevPageTag: "",
    textSearch: "",
    comparisonCartListMax: comparisonCartListDefault,
  });

  // function getContentDateTime() {
  //   const currentDate = new Date();
  //   const year = currentDate.getFullYear();
  //   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  //   const day = String(currentDate.getDate()).padStart(2, '0');
  //   const hours = String(currentDate.getHours()).padStart(2, '0');
  //   const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  //   const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  //   const updatedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  //   return updatedDateTime;
  // }

  useEffect(() => {
    if (paramInUse.textSearch !== "") {
      handleChannelSearch();
    }
    console.log('UseEffet App-Home');
  }, [paramInUse.regionId,
  paramInUse.languageId,
  paramInUse.resultsPerPage,
  paramInUse.resultsOrdering,
  paramInUse.textSearch,
  paramInUse.topicParentId,
  paramInUse.pageTag,
    comparisonCart,]);

  //******************************************************************************************************
  //******************************************************************************************************
  async function handleParam(namePassed, valuePassed) {
    setParamInUse({ ...paramInUse, [namePassed]: valuePassed });
    console.log("handleParam-paramInUse", namePassed, valuePassed);
  }

  //******************************************************************************************************
  //******************************************************************************************************
  async function handleComparisionCartAdd(newComparisonStatistics) {
    const comparisonCartIndex = comparisonCart.findIndex(
      (chart) => chart.channelId === newComparisonStatistics.channelId);
    if (comparisonCartIndex !== -1) {
      // Channel Already added for Comparision
      notifyAlert("error", 'Opps!!! Channel Existed in Comparison Cart.', 2000);
    } else {
      // comparisonCart.push(newComparisonStatistics);
      // setComparisonCart(prevState => ({...prevState,newComparisonStatistics}));
      setComparisonCart(current => [...current, newComparisonStatistics]);
    }

    // console.log("comparisonCartAddition", comparisonCart);
  }

  //******************************************************************************************************
  //******************************************************************************************************
  const fetchChannelsSearchData = async (text2Search) => {
    const regionInUse = paramInUse.regionId;
    const languageInUse = paramInUse.languageId;
    const topicParentInUse = paramInUse.topicParentId;
    const resultsPerPage = paramInUse.resultsPerPage;
    const resultsOrdering = paramInUse.resultsOrdering;
    const resultPageToken = paramInUse.pageTag;
    const resultsPublishedAfter = paramInUse.resultsPublishedAfter;
    const resultsPublishedBefore = paramInUse.resultsPublishedBefore;
    const text2SearchInUrl = text2Search.replace(/[|]+/g, "%7C");

    let _searchUri = "/search?key=" + youTubeApiKey
    _searchUri = _searchUri + `&type=channel`;
    _searchUri = _searchUri + `&part=snippet`;
    _searchUri = _searchUri + `&maxResults=${resultsPerPage}`;
    _searchUri = _searchUri + `&order=${resultsOrdering}`;
    _searchUri = _searchUri + "&q=" + text2SearchInUrl;//text2Search;
    _searchUri = _searchUri + ((regionInUse !== regionDefault) ? "&regionCode=" + regionInUse : "");
    _searchUri = _searchUri + ((languageInUse !== languageDefault) ? "&relevanceLanguage=" + languageInUse : "");
    _searchUri = _searchUri + ((topicParentInUse !== topicParentDefault) ? "&topicId=" + topicParentInUse : "");
    _searchUri = _searchUri + ((resultsPublishedAfter !== pagePublishedDefault) ? `&publishedAfter=${resultsPublishedAfter + 'T00:00:00Z'}` : "");
    _searchUri = _searchUri + ((resultsPublishedBefore !== pagePublishedDefault) ? `&publishedBefore=${resultsPublishedBefore + 'T00:00:00Z'}` : "");
    _searchUri = _searchUri + ((resultPageToken !== pageTagDefault) ? `&pageToken=${resultPageToken}` : "");

    const response = await axios.get(youtubeUrl + _searchUri);
    const data = await response.data;
    // console.log(_searchUri);
    // console.log(data);
    return data;
  };

  //******************************************************************************************************
  //******************************************************************************************************
  const fetchChannelsData = async (_channelsSearchListIds) => {
    const resultsPerPage = paramInUse.resultsPerPage;
    //URL for loading channel's data with  statical information
    let _channelsUri = "/channels?key=" + youTubeApiKey;
    _channelsUri = _channelsUri + "&id=" + _channelsSearchListIds;
    _channelsUri = _channelsUri + `&maxResults=${resultsPerPage}`;
    _channelsUri = _channelsUri + `&part=snippet,statistics,topicDetails`;

    const response = await axios.get(youtubeUrl + _channelsUri);
    const data = await response.data;
    return data;
  }

  //******************************************************************************************************
  //******************************************************************************************************
  async function handleChannelSearch() {
    const text2Search = paramInUse.textSearch;

    if (text2Search === "") {
      notifyAlert("error", 'Opps!!! Search Text is Missing.', 1000);
    }
    else {

      // Show the initial loading toast
      const loadingToastId = toast.info('Loading Channel Information ...', {
        autoClose: 5000,
        closeOnClick: false,
        draggable: true,
        pauseOnHover: false,
        progress: undefined,
        theme: "light",
        closeButton: false,
      });

      let intervalId; // To keep track of the interval
      try {
        // Start a 2-second interval to repeatedly show the loading toast
        intervalId = setInterval(() => {
          toast.update(loadingToastId, {
            render: 'Loading Channel Information ...', // Update the message
          });
        }, 5000);

        let channelsListData = channelsListingData; //Channels Listing Sample Data

        // // Getting Channels Searched List via uTube API
        // let channelsSearchData = await fetchChannelsSearchData(text2Search);

        // const _nextPageToken = channelsSearchData.hasOwnProperty('nextPageToken') ? channelsSearchData['nextPageToken'] : "";
        // const _prevPageToken = channelsSearchData.hasOwnProperty('prevPageToken') ? channelsSearchData['prevPageToken'] : "";
        // const _totalResults = channelsSearchData['pageInfo']['totalResults'] || 0;

        // setParamInUse({ ...paramInUse, 'prevPageTag': _prevPageToken, 'nextPageTag': _nextPageToken, 'resultsCount': _totalResults });

        // //Getting Channels ID for loading data with statical information
        // const _channelsSearchList = channelsSearchData['items'];
        // let _channelsSearchListIds = "";
        // for (const channel of _channelsSearchList) {
        //   _channelsSearchListIds = _channelsSearchListIds + "," + channel['snippet']['channelId'];
        // };

        // _channelsSearchListIds = _channelsSearchListIds.substring(1);

        // //Getting Channels List with Primary Information
        // let channelsListData = await fetchChannelsData(_channelsSearchListIds);

        //
        // Separating Channels Information from the loaded Channels list
        //
        const _channelsList = channelsListData['items'];

        const _channels = [];
        for (const channel of _channelsList) {
          const newChannel = {
            id: channel['id'],
            title: channel['snippet']['title'],
            publishedAt: channel['snippet']['publishedAt'],
            description: channel['snippet']['description'],
            thumbnailUrl: channel['snippet']['thumbnails']['medium']['url'],
            customUrl: channel['snippet']['customUrl'],
            videoCount: channel['statistics']["videoCount"],
            viewCount: channel['statistics']["viewCount"],
            subscriberCount: channel['statistics']["subscriberCount"],
            topicIds: channel.hasOwnProperty("topicDetails") ? channel["topicDetails"]["topicIds"] : "",
            topicCategories: channel.hasOwnProperty("topicDetails") ? channel["topicDetails"]["topicCategories"] : ""
            //.substring(this.href.lastIndexOf('/') + 1)
          };
          _channels.push(newChannel);
        };

        setChannels(_channels);

      } catch (error) {
        console.error('Error fetching or processing data:', error);
        const errorCode = error.response.hasOwnProperty('status') ? error.response.status : 0;
        if (errorCode === 403) {
          notifyAlert("error", 'Current Quota Exceeds, Try Again Later next Day!', 5000);
        }
      } finally {
        // Clear the interval when the try-catch block is done
        clearInterval(intervalId);
        toast.dismiss(loadingToastId);
      }
    }
  }

  //******************************************************************************************************
  //******************************************************************************************************
  return (
    <div className="AppHomeContainer">
      <ToastContainer />
      <AppHeader
        paramInUse={paramInUse}
        setParamInUse={setParamInUse}
        handleParam={handleParam}
        videoDurations={videoDurations}
        comparisonCart={comparisonCart}
      />
      <AppBody
        channels={channels}
        setChannels={setChannels}
        regions={regions}
        languages={languages}
        topicsParents={topicsParents}
        topics={topics}
        ordering={ordering}
        categories={categories}
        paramInUse={paramInUse}
        setParamInUse={setParamInUse}
        handleParam={handleParam}
        videoDurations={videoDurations}
        comparisonCart={comparisonCart}
        handleComparisionCartAdd={handleComparisionCartAdd}
      />
      <AppFooter AppYear={year} />

      {/* <!-- Modal --> */}
      <div className="modal fade" id="comparatorModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="comparatorModalLabel" aria-hidden="true">
        <div className="modal-dialog  modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="comparatorModalLabel">Channel's Comparision</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <AppComparisonCart
                videoDurations={videoDurations}
                comparisonCart={comparisonCart}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={(e) => { setComparisonCart([]); }}>Clear Cart</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppHome
