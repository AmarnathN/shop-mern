import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const signupForm = () => {
  return (
    <div className="row">
      <div className="col-md-4 offset-md-4 text-left">
        <form>
          <div className="form-group my-2">
            <label className="form-label">Name</label>
            <input className="form-control" type="text" />
          </div>
          <div className="form-group my-2">
            <label className="form-label">Email</label>
            <input className="form-control" type="email" />
          </div>
          <div className="form-group my-2">
            <label className="form-label">Password</label>
            <input className="form-control" type="password" />
          </div>
          <button className="btn btn-secondary rounded my-2">Signup</button>
        </form>
      </div>
    </div>
  );
};

const Signup = () => {
  return (
    <Base title="Sign Up" description="Please sign up for Shop">
      {signupForm()}
    </Base>
  );
};

export default Signup;
