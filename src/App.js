import './App.css';
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Signup from './components/auth/Signup/Signup';
import Login from './components/auth/Login/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import { Route, Switch } from 'react-router-dom';
import Analysis from './components/analysis/Analysis';
// import Filter from './components/filter/Filter';
import Recommend from './components/recommend/Recommend';
import Dashboard from './components/dashboard/Dashboard';

const App = () => {
  return (
    <div 
      className="d-flex"
      style = {{minHeight:"100vh", height:"auto"}}
    >
      <div className="w-100">
        <AuthProvider>
          <Switch>
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={Login}/>
            <Route path="/analysis" component={Analysis}/>
            <Route path="/recommend" component={Recommend}/>
            <Route path="/dashboard" component={Dashboard}/>
          </Switch>
        </AuthProvider>
      </div>
    </div>


  )
}

export default App;