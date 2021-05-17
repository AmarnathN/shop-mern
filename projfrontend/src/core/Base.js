import React, { Component } from "react";
import BaseFooter from "./BaseFooter";
import NavigationBar from "./NavigationBar";

const Base = ({ title = "My Title", description = "My Description", className = "bg-dark text-white py-2", children }) => {
  return (
    <div className="container-fluid bg-dark">
      <div className="card bg-dark">
        <div class="card-header main_header">
          <NavigationBar></NavigationBar>
        </div>
        <div class="card-body main_body">
          <div className="bg-dark text-white text-center">
            <h3 className="display-4">{title}</h3>
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
