import React, { useEffect, useRef } from 'react'

const TopPlayers = (props) => {
    const { width, height } = props
    const divRef = useRef()

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js'
        script.async = true;
        script.innerHTML = JSON.stringify({
            "colorTheme": "light",
            "dateRange": "12M",
            "exchange": "US",
            "showChart": true,
            "locale": "en",
            "largeChartUrl": "",
            "isTransparent": true,
            "showSymbolLogo": false,
            "width": `${width}`,
            "height": `${height}`,
            "plotLineColorGrowing": "rgba(58, 175, 169, 1)",
            "plotLineColorFalling": "rgba(58, 175, 169, 1)",
            "gridLineColor": "rgba(254, 255, 255, 0)",
            "scaleFontColor": "rgba(23, 37, 42, 1)",
            "belowLineFillColorGrowing": "rgba(43, 122, 120, 0.12)",
            "belowLineFillColorFalling": "rgba(43, 122, 120, 0.12)",
            "belowLineFillColorGrowingBottom": "rgba(58, 175, 169, 0)",
            "belowLineFillColorFallingBottom": "rgba(58, 175, 169, 0)",
            "symbolActiveColor": "rgba(43, 122, 120, 0.12)"
        })
        divRef.current.appendChild(script);
    }, [])

    return (
        <div className="tradingview-widget-container" ref={divRef}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    )
}

export default TopPlayers