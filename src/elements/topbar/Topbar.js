import React from 'react'
import "./Topbar.css"
import {Link} from "react-router-dom";

const Topbar = () => {
    return (
        <div className="headerNavbar">

            <div className="navbar">
                <h1 className="navbarLogo"><Link to="/dashboard">STOCKS APP</Link></h1>
                <div className="navbarLinks">
                <div> <Link className="link" to="/dashboard">Dashboard</Link></div>
                <div><Link className="link" to="/dashboard">My watchlist</Link></div>
                <div><Link className="link" to="/filter">Filter Tool</Link></div>
                <div><Link className="link" to="/analysis">Analysis Tool</Link></div>
                </div>
            </div>
        </div>
    )
}

export default Topbar
