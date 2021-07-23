import "./App.css";
import React from "react";
import Signup from "./components/auth/Signup/Signup";
import Login from "./components/auth/Login/Login";
import { Route, Switch } from "react-router-dom";
import Analysis from "./components/analysis/Analysis";
// import Watchlist from "./components/watchlist/Watchlist";
import Filter from "./components/Filter/Filter";
import PrivateRoute from "./components/auth/PrivateRoute";
import Trader from "./components/trader/Trader";
import TraderSymbol from "./components/trader/TraderSymbol";
import History from "./components/history/History";

const App = () => {
  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/analysis" component={Analysis} />
          <PrivateRoute path="/filter" component={Filter} />
          {/* <PrivateRoute path="/watchlist" component={Watchlist} /> */}
          <PrivateRoute exact path="/trader" component={Trader} />
          <PrivateRoute exact path="/history" component={History} />
          <PrivateRoute exact path="/trader/:symbol" component={TraderSymbol} />
        </Switch>
      </div>
    </>
  );
};

export default App;
