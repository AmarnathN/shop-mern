import React, { Component } from "react";
import BaseFooter from "./BaseFooter";
import NavigationBar from "./NavigationBar";

const Base = ({ title = "My Title", description = "My Description", className = "bg-dark text-white py-2", children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <NavigationBar></NavigationBar>
      </div>
      <div className="row">
        <div className="jumbotron bg-dark text-white text-center">
          <h3 className="display-4">{title}</h3>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <div className="row">
        <BaseFooter></BaseFooter>
      </div>
    </div>
  );
};

export default Base;
