import React from "react";
import "./Dashboard.css";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import Topbar from "../../elements/topbar/Topbar";
import TopPlayers from "./TopPlayers";
import { Link, useHistory } from "react-router-dom";


const Dashboard = () => {
  const history = useHistory();
  const handleButtonDashboard = () => {
    history.push({
      pathname: `/trader`,
    });
  };
  return (
    <div className="wrap-analysis">
      <div className="top">
        <Topbar />
      </div>

      <section className="banner">
        <div className="container">
          <div className="banner-text">
            <h1>nerdinvestor</h1>
            <p><strong>Our goal is to provide a risk-free approach to learning about stocks.</strong> The tools that we developed make it simple for young investors to have a taste of how the market works in real time and make informed decisions. </p>
            <button onClick= {handleButtonDashboard}>Test our Trading Simulator</button>

          </div>
        </div>
        <img className="banner-image" src="https://quatamiha.files.wordpress.com/2021/07/untitled-design-4.png" />
      </section>

      <div className="dashboard-container">
        <div className="left-dashboard" style={{ marginRight: "50" }}>
          <TopPlayers width={500} height={800} />
        </div>
        <div className="middle-spacer">

        </div>
        <div className="right-dashboard" >
          <div className="mb-30 col-md-6 col-lg-4">
            <div className="card">
              <img className="card-icon" src="https://quatamiha.files.wordpress.com/2021/07/nerdinvestor-1.png" />
              <h3 className="card-title">Trading Simulator Tool</h3>
              <p className="card-text">We use Real Time API to update financial data to make sure that our Simulator Tool provides you an authentic and market-based experience. You can also keep track of your historical activities through the <Link style={{ color: "#2b7a78" }} to="/history">Transactions Tracker</Link> tab.</p>
              <Link className="card-link" to="/trader">Learn more</Link>
            </div>
          </div>
          <div className="mb-30 col-md-6 col-lg-4">
            <div className="card">
              <img className="card-icon" src="https://quatamiha.files.wordpress.com/2021/07/nerdinvestor-2.png" />
              <h3 className="card-title">Filter stocks quotes</h3>
              <p className="card-text">Shortlist your stock quotes using our investment screener. You can filter stocks based on ratios such as Price to Earnings (P/E), Price to Book, and Price to Sales. We also included EPS, Beta and Price Range.</p>
              <Link className="card-link" to="/screener">Learn more</Link>
            </div>
          </div>
          <div className="mb-30 col-md-6 col-lg-4">
            <div className="card">
              <img className="card-icon" src="https://quatamiha.files.wordpress.com/2021/07/nerdinvestor-3.png" />
              <h3 className="card-title">Generate recommended stocks</h3>
              <p className="card-text">Diversify your portfolio. Enter the stocks symbol you are following to generate 5 alternatives. Our recommendation tool is paired with a technical chart for each stock quote to help inform decisions.</p>
              <Link className="card-link" to="/recommend">Learn more</Link>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className="container">
          <div className="row">

            <ul>
              <li>Quang Nguyen (Rice University) & Minh-Anh Ngo (University of Pennsylvania) © 2021. Made with ♥ in Vietnam.</li>
            </ul>
          </div>
        </div>

      </footer>

    </div>
  )
}

export default Dashboard



