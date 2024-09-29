import React, { useState } from "react";

import logo from '../ImgComponents/logoonyx2.jpg'

import './AppHeader.css';

import { notifyAlert } from "./AppComponents";

export default function AppHeader(props) {
  const [textSearchInUseValue, setTextSearchInUseValue] = useState("");

  function handleSearchSubmit() {
    if (textSearchInUseValue === "") {
      notifyAlert("error", 'Opps!!! Search Text is Missing.', 1000);
    }
    else {
      props.setParamInUse({ ...props.paramInUse, 'prevPageTag': "", 'nextPageTag': "", 'resultsCount': 0 });
      props.handleParam('textSearch', textSearchInUseValue);
    }
  }

  return (
    <>
      <header className='AppHeaderContainer'>
        <div className="AppHeaderContainerLogo">
          <div>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className='headerH6'>
            <div className="headerH6Title">
            <h6>
              Onyx <p>( Version 2.0 )</p>
            </h6>
            </div>
            <p>uTube Analyser & Comparator</p>
          </div>

        </div>

        <div className='AppHeaderContainerFilter'>
          <div className="AppHeaderFilterSearch row">
            <div className="mx-auto">
              <div className="input-group">
                <input className="searchInput form-control" placeholder='Enter Search Text' value={textSearchInUseValue} id="search-input"
                  onChange={(e) => { setTextSearchInUseValue(e.target.value) }} />
                <span className="input-group-append">
                  <button className="searchImgBtn" type="button"
                    onClick={(e) => { handleSearchSubmit() }}>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="AppHeaderFilterHelp">
            {/* <!-- Button trigger modal --> */}
            <button className="helpImgBtn btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#helpModal">
            </button>
          </div>
        </div>

      </header>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="helpModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="helpModalLabel">Help</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Your request can also use the Boolean NOT (-) and OR (|) operators to exclude videos or to find videos that are associated with one of several search terms. </p>
              <p>For example, to search for matching either "boating" or "sailing", set the q parameter value to boating|sailing.</p>
              <p>Similarly, to search for matching either "boating" or "sailing" but not "fishing", set the q parameter value to boating|sailing -fishing.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

