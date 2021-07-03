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
          <img src={require('../../images/logo.svg')} alt='logo' />
        </NavLink> */}
        <Bars />
        <NavMenu>
          <div>
            <NavLink to="/analysis" activeStyle>
              Analysis
            </NavLink>
          </div>
          <div>
            <NavLink to="/filter" activeStyle>
              Filter
            </NavLink>
          </div>
          <div>
            <NavLink to="/watchlist" activeStyle>
              Watch List
            </NavLink>
          </div>
          <div>
            <NavLink to="/trader" activeStyle>
              Trader
            </NavLink>
          </div>
          <div>
            <NavLink to="/history" activeStyle>
              History
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
              <NavBtnLink to="/login">Sign Out</NavBtnLink> :
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
