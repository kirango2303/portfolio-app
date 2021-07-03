import React, { useEffect, useRef } from 'react'

const TechAnalysis = (props) => {
    const {companyName, width} = props
    const divRef = useRef()

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js'
        script.async = true;
        script.innerHTML =  JSON.stringify({
            "symbol": `${companyName}`,
            "width": `${width}`,
            "interval": "1m",
            "isTransparent": false,
            "showIntervalTabs": true,
            "locale": "en",
            "colorTheme": "dark"
          })
        divRef.current.appendChild(script);
    }, [])

    return (
        <div className="tradingview-widget-container" ref={divRef}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    )
}

export default TechAnalysis

