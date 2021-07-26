import React, { useEffect, useRef } from 'react'

const CompanyFinancials = (props) => {
    const {companyName, width, height} = props
    const divRef = useRef()

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-financials.js" 
        script.async = true;
        script.innerHTML =  JSON.stringify({
            "symbol": `${companyName}`,
            "colorTheme": "light",
            "isTransparent": false,
            "largeChartUrl": "",
            "displayMode": "regular",
            "width": `${width}`,
            "height": 900,
            "locale": "en"
          })

          
        divRef.current.appendChild(script);
    }, [])


    return (
        <div className="tradingview-widget-container" ref={divRef}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    )
}

export default CompanyFinancials

