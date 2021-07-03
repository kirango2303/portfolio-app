import React, { useEffect, useRef } from "react";
import "./CompanyCard.css";
const CompanyCard = (props) => {
  const { companyName, width } = props;
  const divRef = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: `${companyName}`,
      width: `${width}`,
      locale: "en",
      colorTheme: "dark",
      isTransparent: false,
    });
    script.className = "componentCard";
    divRef.current.appendChild(script);
  }, [companyName, width]);

  return (
    <div className="tradingview-widget-container componentCard" ref={divRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default CompanyCard;
