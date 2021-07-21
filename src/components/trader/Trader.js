import React, { useEffect, useState } from "react";
import Topbar from "../../elements/topbar/Topbar";
import { db } from "../../services/firebase";
import axios from "axios";
import "./Trader.css";
import { useHistory } from "react-router-dom";

const URL = `https://cloud.iexapis.com/stable/stock/market/list/gainers?token=${process.env.REACT_APP_API_URL}`;
const Trader = () => {
  const [query, setQuery] = useState("");
  const [financeData, setFinanceData] = useState([]);
  const [topGainers, setTopGainers] = useState([]);
  const history = useHistory();
  useEffect(() => {
    db.collection("finance").onSnapshot((snapShot) => {
      setFinanceData(snapShot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    const getTopGainers = async () => {
      const res = await axios.get(URL);
      setTopGainers(res.data);
    };
    getTopGainers();
  }, []);

  const handleCheckout = (data, id) => {
    history.push({
      pathname: `/trader/${data.symbol}`,
      state: { data: data, id: id },
    });
  };
  return (
    <div className="outer-container">
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Topbar />
        <div
          className="container-stock"
          style={{ height: query ? "50%" : "15%" }}
        >
          <h1>Search your stock</h1>
          <input
            type="text"
            width={400}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button>Search</button>
          {query ? (
            <div className="search-container">
              <div className="search-header">
                <div
                  style={{
                    width: "20%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <span>SYMBOL</span>
                </div>
                <div
                  style={{
                    width: "80%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    display: "flex",
                  }}
                >
                  <span>STOCK'S NAME</span>
                </div>
              </div>
              <div className="search-content">
                {financeData &&
                financeData.filter((data) =>
                  data.symbol.includes(query.trim().toUpperCase())
                ).length ? (
                  financeData
                    .filter((data) =>
                      data.symbol.includes(query.trim().toUpperCase())
                    )
                    .slice(0, 5)
                    .map((data) => {
                      return (
                        <div
                          className="company-container"
                          id="yahoo"
                          onClick={(e) => handleCheckout(data, e.target.id)}
                        >
                          <div
                            style={{
                              width: "20%",
                              height: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                            }}
                          >
                            <span>{data.symbol}</span>
                          </div>
                          <div
                            style={{
                              width: "80%",
                              height: "100%",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              display: "flex",
                            }}
                          >
                            <span>{data.shortName}</span>
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <div>No stocks found according to your search</div>
                )}
              </div>
            </div>
          ) : null}
        </div>

        <div
          className="top-movers-container"
          style={{ height: query ? "50%" : "85%" }}
        >
          <h1>Top Movers Today</h1>
          <div className="top-movers">
            <div className="search-header">
              <div
                style={{
                  width: "25%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <span>SYMBOL</span>
              </div>
              <div
                style={{
                  width: "20%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <span>PRICE($)</span>
              </div>
              <div
                style={{
                  width: "20%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <span>MARKET CAP</span>
              </div>
              <div
                style={{
                  width: "20%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <span>STATUS</span>
              </div>
              <div
                style={{
                  width: "20%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <span>CHECKOUT</span>
              </div>
            </div>
            <div className="search-content">
              {topGainers.slice(0, 5).map((data) => {
                return (
                  <div className="company-container">
                    <div
                      style={{
                        width: "20%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <span>{data.symbol}</span>
                    </div>
                    <div
                      style={{
                        width: "20%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <span>{data.close || data.iexClose}</span>
                    </div>
                    <div
                      style={{
                        width: "20%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <span>{data.marketCap}</span>
                    </div>
                    <div
                      style={{
                        width: "20%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <span>+${data.change}</span>
                    </div>
                    <div
                      style={{
                        width: "20%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <button
                        id="iex"
                        onClick={(e) => handleCheckout(data, e.target.id)}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trader;
