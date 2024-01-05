import React, { useState } from "react";

import logo from '../ImgComponents/logoonyx2.jpg'

import './AppHeader.css';

import { notifyAlert } from "./AppComponents";

export default function AppHeader(props) {
  const [textSearchInUseValue, setTextSearchInUseValue] = useState("");

  function handleSearchSubmit(){
    if (textSearchInUseValue === "") {
      notifyAlert("error", 'Opps!!! Search Text is Missing.', 1000);
    }
    else {
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
            <h6>
              Onyx
            </h6>
            <p>uTube Tracker & Comparator</p>
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
          </div>
      </header>
    </>
  )
}

