import React from "react";
import { logout } from "../modules/authManager";
import "./Header.css"
import logo from '../images/logo.png'

export default function Header({ isLoggedIn }) {

  return (

    <div>
      <nav className="navbar-containter">
        <div className="navbar-title-set">
          <a href="/">
          <img src={logo} className="navbar-logo" ></img>          
        </a>
        </div>
        <div className="navbar-links">
          <ul>
            <div className="nav-links">
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/user/details">
                      User Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/wordgame">
                      Play Game
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/standings">
                      Current Standings
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" style={{ cursor: "pointer" }} onClick={logout} href="/login">
                      Logout
                    </a>
                  </li>
                </>
              )}
            </div>
          </ul>

          {!isLoggedIn && (
            <>
              <div className="nav-links">
                <ul>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/register">
                      Register
                    </a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>

      </nav>
    </div>
  );
}
