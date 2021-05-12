import React from "react";

const BaseFooter = () => {
  return (
    <div className="fixed-bottom">
      <footer className="footer bd-dark mt-auto">
        <div className="container-fluid bg-secondary text-white text-center">
          <h6 className="my-1">if you got any questions react us out</h6>
          <button className="btn btn-warning btn-lg rounded my-1">Contact Us</button>
        </div>
        <div className="container text-center">
          <span className="text-muted">Amazing place to shop </span>
        </div>
      </footer>
    </div>
  );
};

export default BaseFooter;
