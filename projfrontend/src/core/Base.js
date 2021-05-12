import React, { Component } from "react";
import BaseFooter from "./BaseFooter";
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
      <BaseFooter></BaseFooter>
    </div>
  );
};

export default Base;
