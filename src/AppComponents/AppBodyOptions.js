import React from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './AppBodyOptions.css';

export default function AppBodyOptions(props) {

    const regionInUse = props.paramInUse.regionId;
    const languageInUse = props.paramInUse.languageId;
    const orderingInUse = props.paramInUse.resultsOrdering;
    const topicInUse = props.paramInUse.topicParentId;
    const datePublishedBefore = (props.paramInUse.resultsPublishedBefore !== "") ? new Date(props.paramInUse.resultsPublishedBefore.replace(/-/g, '\/')) : "";
    const datePublishedAfter = (props.paramInUse.resultsPublishedAfter !== "") ? new Date(props.paramInUse.resultsPublishedAfter.replace(/-/g, '\/')) : "";

    function handleDateEntry(dateNamePassed, dateValuePassed) {
        if (dateValuePassed !== "") {
            const formattedDate = dateValuePassed.toLocaleDateString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('/').reverse().join('-');
            console.log(dateNamePassed);
            console.log(formattedDate);
            props.handleParam(dateNamePassed, formattedDate);
        }
    }

    return (
        <div className='AppBodyOptionsContainer'>
            <div className='AppBodyOptionsFilter'>
                <div className='AppBodyOptionsFiltertitle'>
                    Choice of Interest
                </div>
                <div className="AppBodyOptionsFilterRegion">
                    Region:
                    <select className="form-select" id="regionSelection" aria-label="Default select example"
                        onChange={(e) => { props.handleParam('regionId', e.target.value); console.log("regionChange"); }}
                        value={regionInUse}>
                        {props.regions.map((region, i) =>
                            <option key={i} value={region['id']}>{region['name']}</option>
                        )}
                    </select>
                </div>
                <div className="AppBodyOptionsFilterLanguage">
                    Language:
                    <select className="form-select" id="klangusgeSelection" aria-label="Default select example"
                        onChange={(e) => { props.handleParam('languageId', e.target.value); console.log("LanguageChange"); }}
                        value={languageInUse}>
                        {props.languages.map((language, i) =>
                            <option key={i} value={language['id']}>{language['name']}</option>
                        )}
                    </select>
                </div>
                <div className="AppBodyOptionsFilterTopic">
                    Topic:
                    <select className="form-select" id="topicSelection" aria-label="Default select example"
                        onChange={(e) => { props.handleParam('topicParentId', e.target.value); console.log("topicChange"); }}
                        value={topicInUse}>
                        {props.topicsParents.map((topic, i) =>
                            <option key={i} value={topic['id']}>{topic['name']}</option>
                        )}
                    </select>
                </div>
                <div className="AppBodyOptionsFilterOrder">
                    Fetch Order:
                    <select className="form-select" id="orderSelection" aria-label="Default select example"
                        onChange={(e) => { props.handleParam('resultsOrdering', e.target.value); console.log("orderingChange"); }}
                        value={orderingInUse}>
                        {props.ordering.map((order, i) =>
                            <option key={i} value={order['id']}>{order['name']}</option>
                        )}
                    </select>
                </div>
                <div>
                    Published After:
                    <DatePicker selected={datePublishedBefore}
                        dateFormat="dd-mm-yyyy"
                        // Add props to DatePicker
                        showYearDropdown
                        scrollableMonthYearDropdow
                        onChange={(date) => handleDateEntry('resultsPublishedBefore', date)} />
                </div>
                <div>
                    Published Before:
                    <DatePicker selected={datePublishedAfter}
                        dateFormat="dd-mm-yyyy"
                        // Add props to DatePicker
                        showYearDropdown
                        scrollableMonthYearDropdow
                        onChange={(date) => handleDateEntry('resultsPublishedAfter', date)} />
                </div>
            </div>
        </div>
    )
}
