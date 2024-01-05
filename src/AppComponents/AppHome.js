import React, { useState, useEffect } from "react";
import axios from 'axios';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import regionsData from '../DataComponents/Regions.json';
import languagesData from '../DataComponents/Languages.json';
import categoriesData from '../DataComponents/Categories.json';
import topicsParentData from '../DataComponents/TopicsParent.json';
import topicsData from '../DataComponents/Topics.json';
import channelsOrderingData from '../DataComponents/ChannelsOrdering.json';
import channelsListingData from '../DataComponents/ChannelsList.json';


import AppHeader from './AppHeader'
import { AppFooter } from './AppFooter'
import AppBody from "./AppBody";

import { youTubeApiKey, youtubeUrl, notifyAlert } from "./AppComponents";

function AppHome() {
  const year = new Date().getFullYear();
  const [, setForceUpdate] = useState();

  const [regions] = useState(regionsData);
  const [languages] = useState(languagesData);
  const [categories] = useState(categoriesData);
  const [topicsParents] = useState(topicsParentData);
  const [topics] = useState(topicsData);
  const [ordering] = useState(channelsOrderingData);

  const regionDefault = "00";
  const languageDefault = "00";
  const categoryDefault = "0";
  const topicDefault = "/m/00000";
  const topicParentDefault = "/m/00000";
  const resultsPerPageDefault = '10';
  const resultsOrderingDefault = "relevance";
  const pageTagDefault = '';

  const [channels, setChannels] = useState([]);

  const [paramInUse, setParamInUse] = useState({
    regionId: regionDefault,
    languageId: languageDefault,
    categoryId: categoryDefault,
    topicParentId: topicParentDefault,
    topicId: topicDefault,
    resultsPerPage: resultsPerPageDefault,
    resultsOrdering: resultsOrderingDefault,
    resultsPublishedBefore: "",
    resultsPublishedAfter: "",
    resultsCount: 0,
    pageTag: pageTagDefault,
    nextPageTag: "",
    prevPageTag: "",
    textSearch: "",
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
  }, [paramInUse.regionId,
  paramInUse.languageId,
  paramInUse.resultsPerPage,
  paramInUse.resultsOrdering,
  paramInUse.textSearch,
  paramInUse.topicParentId,
  paramInUse.pageTag]);

  async function handleParam(namePassed, valuePassed) {
    setParamInUse({ ...paramInUse, [namePassed]: valuePassed });
    console.log(paramInUse);
  }

  const fetchChannelsSearchData = async (text2Search) => {
    const regionInUse = paramInUse.regionId;
    const languageInUse = paramInUse.languageId;
    const topicParentInUse = paramInUse.topicParentId;
    const resultsPerPage = paramInUse.resultsPerPage;
    const resultsOrdering = paramInUse.resultsOrdering;
    const resultPageToken = paramInUse.pageTag;

    let _searchUri = "/search?key=" + youTubeApiKey
    _searchUri = _searchUri + `&type=channel`;
    _searchUri = _searchUri + `&part=snippet`;
    _searchUri = _searchUri + `&maxResults=${resultsPerPage}`;
    _searchUri = _searchUri + `&order=${resultsOrdering}`;
    _searchUri = _searchUri + "&q=" + text2Search;
    _searchUri = _searchUri + ((regionInUse !== regionDefault) ? "&regionCode=" + regionInUse : "");
    _searchUri = _searchUri + ((languageInUse !== languageDefault) ? "&relevanceLanguage=" + languageInUse : "");
    _searchUri = _searchUri + ((topicParentInUse !== topicParentDefault) ? "&topicId=" + topicParentInUse : "");
    _searchUri = _searchUri + ((resultPageToken !== pageTagDefault) ? `&pageToken=${resultPageToken}` : "");

    const response = await axios.get(youtubeUrl + _searchUri);
    const data = await response.data;
    return data;
  };

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

  async function handleChannelSearch() {
    const text2Search = paramInUse.textSearch;

    if (text2Search === "") {
      notifyAlert("error", 'Opps!!! Search Text is Missing.', 1000);
    }
    else {

      try {
        //Getting Channels Search List
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

        // //Getting Channels List with information
        // let channelsListData = await fetchChannelsData(_channelsSearchListIds);
        let channelsListData = channelsListingData;
        const _channelsList = channelsListData['items'];

        const _channels = [];
        for (const channel of _channelsList) {
          const newChannel = {
            id: channel['id'],
            title: channel['snippet']['title'],
            publishedAt: channel['snippet']['publishedAt'],
            description: channel['snippet']['description'],
            thumbnailUrl: channel['snippet']['thumbnails']['medium']['url'],
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
        console.error('Error:', error);
        const errorCode = error.response.status;
        if (errorCode === 403) {
          notifyAlert("error", 'Current Quota Exceeds, Try Again Later next Day!', 5000);
        }
      }
    }
  }

  return (
    <div className="AppHomeContainer">
      <ToastContainer />
      <AppHeader
        paramInUse={paramInUse}
        setParamInUse={setParamInUse}
        handleParam={handleParam}
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
      />
      <AppFooter AppYear={year} />
    </div>
  )
}

export default AppHome
