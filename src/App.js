import './App.css';
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Signup from './components/auth/Signup/Signup';
import Login from './components/auth/Login/Login';
// import PrivateRoute from './components/auth/PrivateRoute';
import { Route, Switch } from 'react-router-dom';
import home from './components/home/home';

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
            <Route path="/home" component={home}/>
          </Switch>
        </AuthProvider>
      </div>
    </div>


  )
}

export default App;