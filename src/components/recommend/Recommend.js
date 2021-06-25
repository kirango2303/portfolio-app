import React, { useState, useRef, useEffect } from "react";
import "./Recommend.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import CompanyCard from "../CompanyCard/CompanyCard";
import { Button, Form } from "react-bootstrap";
import CompanyFinancials from "../CompanyFinancials/CompanyFinancials";
import { useCallbackRef } from "use-callback-ref";

function Recommend() {
  const [query, setQuery] = useState("");
  const [similarStocks, setSimilarStocks] = useState([]);
  const [searchedStocks, setSearchedStocks] = useState("");
  const [searching, setSearching] = useState(false);
  const stocksRef = useCallbackRef(null, (ref) => ref && ref.focus());

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
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = () => {
    setSearching(true);
    setSearchedStocks(query);
    searchSimilarStocks();
    setQuery("");
  };
  const reset = () => {
    setSearching(false);
    setSearchedStocks("");
    setSimilarStocks([]);
    setQuery("");
  };

  return (
    <div className="body">
      <h1>Enter a Stocks Symbol</h1>
      <div>
        <input
          type="text"
          placeholder="i.e. AAPL"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} disabled={searching}>
          Search
        </button>
        <button onClick={reset}>Reset</button>
      </div>

      <div className="company-container">
        <div>
          {similarStocks &&
            similarStocks.map((stock) => (
              <CompanyCard
                companyName={stock.symbol}
                width={800}
                height={200}
              />
            ))}
        </div>
        <div>
          {searchedStocks && (
            <CompanyFinancials
              companyName={searchedStocks}
              width={500}
              height={800}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Recommend;
