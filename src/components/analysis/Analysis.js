import React from 'react'
import './Analysis.css'
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import Topbar from '../../elements/topbar/Topbar';
 
const Analysis = () => (
  
    <div className="wrap">
       <div className="top"><Topbar /></div>
 <div className="under"><TradingViewWidget
    symbol="NASDAQ:AAPL"
    theme={Themes.LIGHT}
    locale="en"
    // width="980"
    // height="610 !important"
    autosize
    interval="D"
    timezone="Etc/UTC"
    style="1"
    toolbarBg="#f1f3f6"
    enablePublishing="false"
    allowSymbolChange="true"
    containerId= "tradingview_17f8f"
  />
  </div> 
  <div className="bottom"></div>
  </div>
);

export default Analysis
