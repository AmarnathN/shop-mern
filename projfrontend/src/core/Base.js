import React, { Component } from "react";
import BaseFooter from "./BaseFooter";
import NavigationBar from "./NavigationBar";

const Base = ({ title = "My Title", description = "My Description", className = "bg-dark text-white p-2", children }) => {
  return (
    <div className="container-fluid bg-dark">
      <div className="card bg-dark">
        <div class="card-header main_header bg-gradient">
          <NavigationBar></NavigationBar>
        </div>
        <div class="container-fluid card-body bg-dark main_body overflow-auto">
          <div className=" card-title bg-dark text-white text-center">
            <h1 className=" card-text text-warning">{title}</h1>
            <p className="lead">{description}</p>
          </div>
          <div className={className}>{children}</div>
        </div>

        <div className="card-footer main_footer bg-gradient text-white text-center">
          <BaseFooter />
        </div>
      </div>
    </div>
  );
};

export default Base;
