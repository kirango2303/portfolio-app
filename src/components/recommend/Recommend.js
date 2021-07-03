import React, { useState, useRef, useEffect } from "react";
import "./Recommend.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import CompanyCard from "../CompanyCard/CompanyCard";
import { Button, Form } from "react-bootstrap";
import CompanyFinancials from "../CompanyFinancials/CompanyFinancials";
import { useCallbackRef } from "use-callback-ref";
import SmallCompanyCard from "../dashboard/SmallCompanyCard/SmallCompanyCard";

function Recommend() {
  const [query, setQuery] = useState("");
  const [similarStocks, setSimilarStocks] = useState([]);
  const [searchedStocks, setSearchedStocks] = useState("");
  const [searching, setSearching] = useState(false);
  const stocksRef = useCallbackRef(null, (ref) => ref && ref.focus());
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
    <div className="body">
      <div className="two">
        <h1>
          Get Similar Stocks
          <span>
            Enter a Stocks Symbol to Generate Recommendations. Reset before
            Searching Again.
          </span>
        </h1>
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
        <button className="button" onClick={handleSearch} disabled={searching}>
          Find Similar Stocks
        </button>
        <button className="button" onClick={reset}>
          Reset and Search Again
        </button>
      </div>
      <div>
        {count !== 5 &&
          "Enter Search. Reset before Searching again. If you see no result, you may have entered invalid stocks symbol"}
      </div>

      <div className="company-container">
        <div>
          <div>
            {searchedStocks &&
              similarStocks &&
              count === 5 &&
              "We found 5 alternatives"}
          </div>
          {searchedStocks &&
            similarStocks.map((stock) => (
              <CompanyCard companyName={stock.symbol} width={800} />
            ))}
        </div>
        <div>
          <div>
            {similarStocks &&
              searchedStocks &&
              count == 5 &&
              "You searched for:"}
          </div>
          <div>
            {similarStocks && searchedStocks && count == 5 && (
              <SmallCompanyCard companyName={searchedStocks} width={500} />
            )}
          </div>
          {similarStocks && searchedStocks && count == 5 && (
            <CompanyFinancials companyName={searchedStocks} width={500} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Recommend;
