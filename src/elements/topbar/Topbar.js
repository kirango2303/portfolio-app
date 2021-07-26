import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Topbar = () => {
  const { currentUser, logout } = useAuth();
  return (
    <>
      <Nav>
        {/* <NavLink to='/'>
          <img src="https://quatamiha.files.wordpress.com/2021/07/screen-shot-2021-07-26-at-15.08.22.pngs" alt='' />
        </NavLink> */}
        <Bars />
        <NavMenu>
          <div>
            <NavLink to="/home" activeStyle>
              Dashboard
            </NavLink>
          </div>
          <div>
            <NavLink to="/screener" activeStyle>
              Stocks Screener
            </NavLink>
          </div>
          <div>
            <NavLink to="/recommend" activeStyle>
              Recommendations Generator
            </NavLink>
          </div>
          <div>
            <NavLink to="/trader" activeStyle>
              Trading Simulator 
            </NavLink>
          </div>
          <div>
            <NavLink to="/history" activeStyle>
              Transactions Tracker
            </NavLink>
          </div>
          {/* <div>
            <NavLink to="/signup" activeStyle>
              Sign Up
            </NavLink>
          </div> */}
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          {currentUser ? (
            <div onClick={logout}>
              <NavBtnLink to="/login">Sign Out</NavBtnLink> 
            </div>
          ) : (
            <NavBtnLink to="/login">Sign In</NavBtnLink>
          )}
        </NavBtn>
      </Nav>
    </>
  );
};

export default Topbar;
