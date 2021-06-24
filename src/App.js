import "./App.css";
import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Signup from "./components/auth/Signup/Signup";
import Login from "./components/auth/Login/Login";
// import PrivateRoute from './components/auth/PrivateRoute';
import { Route, Switch } from "react-router-dom";
import Analysis from "./components/analysis/Analysis";
import Watchlist from "./components/watchlist/Watchlist";
import Topbar from "./elements/topbar/Topbar";
import Filter from "./components/filter/Filter"

const App = () => {
  return (
    <>
      <div className="d-flex" style={{ minHeight: "100vh", height: "auto" }}>
        <div className="w-100">
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/analysis" component={Analysis} />
            <Route path="/filter" component={Filter} />
            <Route path="/watchlist" component={Watchlist} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default App;
