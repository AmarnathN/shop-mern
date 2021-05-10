import React from "react";
import { Link, withRouter } from "react-router-dom";

const currentTab = (history, path) => {
  return history.location.pathname === path ? { color: "#E8BD0D" } : { color: "#CAD5E2" };
};

const NavigationBar = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link style={currentTab(history, "/")} className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart">
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link style={currentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link style={currentTab(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard">
            Admin Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin">
            Sign In
          </Link>
        </li>
        <li className="nav-item">
          <Link style={currentTab(history, "/signout")} className="nav-link" to="/signout">
            Sign Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(NavigationBar);
