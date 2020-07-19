import React from "react";
import "./Nav.css";
import { NavLink, Link, history, useHistory } from "react-router-dom";
import LanguageDropDown from '../LanguageDropDown';

const Nav = (props) => {
  let history = useHistory();
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <i class="brand fab fa-hubspot">
          <span className='nav-title'>   CovidSync</span>
          </i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            {menu.map((item, idx) => (
              <li key={idx} className="nav-item">
                <NavLink
                  exact
                  className="nav-link"
                  to={item.link}
                  activeClassName="active"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            {props.user.isLoggedIn ? (
              <div className="user-container" onClick={() => props.signOut(history)}>
                <span className="user-letter">
                  {props.user.username[0].toUpperCase()}
                </span>
              </div>
            ) : (
              <li className="nav-item">
                <NavLink
                  exact
                  className="nav-link"
                  to="/login"
                  activeClassName="active"
                >
                  Log in
                </NavLink>
              </li>
            )}
          </ul>
            <LanguageDropDown value={props.lang} onSelect={props.changeLanguage}/>
        </div>
      </nav>
    );
}

const menu = [
  {
    label: "Statistics",
    link: "/stats",
  },
  {
    label: "Testing Centers",
    link: "/testingcenters",
  },
  {
    label: "Gigs",
    link: '/jobs'
  },
  {
    label: "FAQ",
    link: '/faq'
  }
];

export default Nav;
