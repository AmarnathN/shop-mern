import React, { Component } from "react";
import NavigationBar from "./NavigationBar";

const Base = ({ title = "My Title", description = "My Description", className = "bg-dark text-white py-4", children }) => {
  return (
    <div>
      <NavigationBar></NavigationBar>
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h1 className="display-4">{title}</h1>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bd-dark mt-auto py3">
        <div className="container-fluid bg-success text-white text-center">
          <h4 className="py-3">if you got any questions react us out</h4>
          <button className="btn btn-warning btn-lg">Contact Us</button>
        </div>
        <div className="container text-center">
          <span className="text-muted">Amazing place to shop </span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
