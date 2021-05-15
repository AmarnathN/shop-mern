import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    isSuccess: false,
  });
  const { name, email, password, error, isSuccess } = values;

  const handleChange = (value) => (event) => {
    setValues({ ...values, error: false, [value]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, name: "", email: "", password: "", error: false, isSuccess: true });
        }
      })
      .catch((err) => {
        console.log("Error in signup : " + err);
      });
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-md-4 text-left">
          <div className="alert alert-success" style={{ display: isSuccess ? "" : "none" }}>
            {" "}
            <p>Signup Successful</p>
            <Link to="/signin">Login here now</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-md-4 text-left">
          <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
            {" "}
            <p>Signup Failed</p>
            <p>{JSON.stringify(error)}</p>
          </div>
        </div>
      </div>
    );
  };
  const signupForm = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-md-4 text-left">
          <form>
            <div className="form-group my-2">
              <label className="form-label">Name</label>
              <input className="form-control" onChange={handleChange("name")} type="text" value={name} />
            </div>
            <div className="form-group my-2">
              <label className="form-label">Email</label>
              <input className="form-control" onChange={handleChange("email")} type="email" value={email} />
            </div>
            <div className="form-group my-2">
              <label className="form-label">Password</label>
              <input className="form-control" onChange={handleChange("password")} type="password" value={password} />
            </div>
            <button className="btn btn-secondary rounded my-2" onClick={onSubmit}>
              Signup
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign Up" description="Please sign up for Shop">
      {signupForm()}
      {successMessage()}
      {errorMessage()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
