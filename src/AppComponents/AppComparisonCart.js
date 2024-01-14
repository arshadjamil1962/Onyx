import React from 'react'

import './AppComparisonCart.css';

import metricsImg from "../ImgComponents/metrics1.jpg";
import chartsImg from "../ImgComponents/metrics2.jpg";

import AppComparisonCartDetail from './AppComparisonCartDetail';

export default function AppComparisonCart(props) {
    const comparisonCartList = props.comparisonCart;

    return (
        <div className="AppComparisonCartArea">
            <div className='AppComparisonCartLabelsArea'>
                <div className='AppComparisonCartLabelsHeader'>
                    <img className='AppComparisonCartLabelsHeaderImg' src={metricsImg} alt="viewsImg" />
                    <h6 className='AppComparisonCartLabelsHeaderh6'>Metric's</h6>
                </div>
                <div className='AppComparisonCartLabelsMetric'>
                    <p className='AppComparisonCartLabelsHeaderp'>Total Videos</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Total Views</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Average Views per Video</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Total Subscribers</p>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Shorts-Channel Videos Ratio%</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Medium-Channel Videos Ratio%</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Long-Channel Videos Ratio%</p>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Shorts-Channel Views Ratio%</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Medium-Channel Views Ratio%</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Long-Channel Views Ratio%</p>
                    <p className='AppComparisonCartLabelsVideop'>++++++++++++++++++++</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Videos Total</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Views Total</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Likes Total</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Comments Total</p>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Views Average/Video</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Likes Average/Video</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Comments Average/Video</p>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Views Min</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Likes Min</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Comments Min</p>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Views Max</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Likes Max</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Comments Max</p>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Likes-to-Views%</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Comments-to-Views%</p>
                    <p className='AppComparisonCartLabelsVideop'>++++++++++++++++++++</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Videos Total</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Views Total</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Likes Total</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Comments Total</p>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Views Average/Video</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Likes Average/Video</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Comments Average/Video</p>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Views Min</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Likes Min</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Comments Min</p>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Views Max</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Likes Max</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Comments Max</p>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Likes-to-Views%</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Comments-to-Views%</p>
                    <p className='AppComparisonCartLabelsVideop'>++++++++++++++++++++</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Videos Total</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Views Total</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Likes Total</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Comments Total</p>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Views Average/Video</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Likes Average/Video</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Comments Average/Video</p>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Views Min</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Likes Min</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Comments Min</p>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Views Max</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Likes Max</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Comments Max</p>
                    <p className='AppComparisonCartLabelsDividerp'>==========</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Likes-to-Views%</p>
                    <p className='AppComparisonCartLabelsHeaderp'>Comments-to-Views%</p>
                </div>
            </div>

            {/* Statistics from Cart */}
            <div className='AppComparisonChannelsArea'>
                {comparisonCartList.map((cartChannel, i) =>
                    <AppComparisonCartDetail
                        key={i}
                        comparisonCartChannel={cartChannel} />
                )}
            </div>

            <div className='AppComparisonCartChartsArea'>
                <div className='AppComparisonCartChartsHeader'>
                    <img className='AppComparisonCartChartsHeaderImg' src={chartsImg} alt="viewsImg" />
                    <h6 className='AppComparisonCartChartsHeaderh6'>Chart's</h6>
                </div>
                <div className='AppComparisonCartChartsMetric'>
                </div>
            </div>
        </div>
    )
}
