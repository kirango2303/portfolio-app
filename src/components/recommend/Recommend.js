import React, { useState, useRef, useEffect } from "react";
import "./Recommend.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import CompanyCard from "../CompanyCard/CompanyCard";
import { Button, Form } from "react-bootstrap";
import CompanyFinancials from "../CompanyFinancials/CompanyFinancials";
// import { useCallbackRef } from "use-callback-ref";
import SmallCompanyCard from "../dashboard/SmallCompanyCard/SmallCompanyCard";
import Topbar from "../../elements/topbar/Topbar";
import TechAnalysis from "../dashboard/TechAnalysis/TechAnalysis";

function Recommend() {
  const [query, setQuery] = useState("");
  const [similarStocks, setSimilarStocks] = useState([]);
  const [searchedStocks, setSearchedStocks] = useState("");
  const [searching, setSearching] = useState(false);
  // const stocksRef = useCallbackRef(null, (ref) => ref && ref.focus());
  const [count, setCount] = useState(0);

  const searchSimilarStocks = async () => {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-recommendations?symbol=${query}`;
    try {
      const res = await axios.get(url, {
        headers: {
          "x-rapidapi-key":
            "a48948c3dbmsh0752220de3da440p119094jsnf7916aa82678",
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        },
      });
      setSimilarStocks(res.data.finance.result[0].quotes);
      setCount(res.data.finance.result[0].count);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = () => {
    setSearching(true);
    setSearchedStocks(query);
    searchSimilarStocks();
  };
  const reset = () => {
    setSearching(false);
    setSearchedStocks("");
    setSimilarStocks([]);
    setQuery("");
    setCount(0);
  };

  return (
    <div className="wrap-recommend">
      <div className="top-nav">
        <Topbar />
      </div>
      <div
        style={{
          width: "100%",
          height: "40%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="header-recommend">
          <h1 style={{ marginBottom: 20, marginTop: 20, color: "#3aafa9" }}>
            Get Similar Stocks
          </h1>
        </div>
        <div className="header-recommend">
          <h2 style={{ marginBottom: 20, color: "#17252a" }}>
            Enter a Stocks Symbol to Generate Recommendations. Reset before
            Searching Again.
          </h2>
        </div>
        <div className="bar">
          <input
            className="searchbar"
            type="text"
            placeholder="i.e. AAPL"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button
            className="button"
            onClick={handleSearch}
            disabled={searching}
          >
            Find Similar Stocks
          </button>
          <button className="button" onClick={reset}>
            Reset and Search Again
          </button>
        </div>
      </div>
      <div>
        {count !== 5 && (
          <div className="recommend-warning">
            <div className="warning">
              <h3>
                If you see no result, you may have entered an invalid stocks
                symbol
              </h3>
            </div>
            <div className="wrapper">
              <div className="pie spinner"></div>
              <div className="pie filler"></div>
              <div className="mask"></div>
            </div>
          </div>
        )}
      </div>

      <div className="company-container">
        <div>
          <h1 style={{ color: "#2b7a78" }}>
            {searchedStocks &&
              similarStocks &&
              count === 5 &&
              "We found 5 alternatives"}
          </h1>
          {searchedStocks &&
            similarStocks.map((stock) => (
              <CompanyCard companyName={stock.symbol} width={800} />
            ))}
        </div>
        <div>
          <h1 style={{ color: "#2b7a78" }}>
            {similarStocks &&
              searchedStocks &&
              count == 5 &&
              "You searched for:"}
          </h1>
          <div>
            {similarStocks && searchedStocks && count == 5 && (
              <SmallCompanyCard companyName={searchedStocks} width={500} />
            )}
          </div>
          {similarStocks && searchedStocks && count == 5 && (
            <TechAnalysis companyName={searchedStocks} width={500} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Recommend;
