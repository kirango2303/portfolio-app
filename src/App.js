import "./App.css";
import React from "react";
import Signup from "./components/auth/Signup/Signup";
import Login from "./components/auth/Login/Login";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/analysis/Dashboard";
// import Watchlist from "./components/watchlist/Watchlist";
import Filter from "./components/filter/filter";
import PrivateRoute from "./components/auth/PrivateRoute";
import Trader from "./components/trader/Trader";
import TraderSymbol from "./components/trader/TraderSymbol";
import History from "./components/history/History";
import Recommend from "./components/recommend/Recommend";

const App = () => {
  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/screener" component={Filter} />
          <PrivateRoute path="/recommend" component={Recommend} />
          <PrivateRoute exact path="/trader" component={Trader} />
          <PrivateRoute path="/history" component={History} />
          <PrivateRoute path="/trader/:symbol" component={TraderSymbol} />
        </Switch>
      </div>
    </>
  );
};

export default App;
