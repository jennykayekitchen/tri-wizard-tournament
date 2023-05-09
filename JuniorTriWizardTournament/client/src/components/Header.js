import React from "react";
import { logout } from "../modules/authManager";
import "./Header.css"

export default function Header({ isLoggedIn }) {

  return (

    <div>
      <nav className="navbar">
        <a className="navbar-title" href="/">
          Junior Tri-Wizard Tournament
        </a>
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
                    Current School Standings
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
      </nav>
    </div>
  );
}
