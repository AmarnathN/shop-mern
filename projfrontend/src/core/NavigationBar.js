import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";

const currentTab = (history, path) => {
  return history.location.pathname === path ? { color: "#E8BD0D" } : { color: "#CAD5E2" };
};

const NavigationBar = ({ history }) => {
  return (
    <ul className="nav nav-tabs bg-dark card-header-tabs">
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
      {isAuthenticated() && isAuthenticated().user.role != 1 && (
        <li className="nav-item">
          <Link style={currentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">
            Dashboard
          </Link>
        </li>
      )}
      {isAuthenticated() && isAuthenticated().user.role == 1 && (
        <li className="nav-item">
          <Link style={currentTab(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard">
            Dashboard
          </Link>
        </li>
      )}
      {!isAuthenticated() && (
        <React.Fragment>
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
        </React.Fragment>
      )}
      {isAuthenticated() && (
        <li className="nav-item">
          <span
            className="nav-link"
            style={currentTab(history, "/signin")}
            onClick={() => {
              signout(() => {
                history.push("/signin");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  );
};

export default withRouter(NavigationBar);
