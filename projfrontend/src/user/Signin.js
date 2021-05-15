import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    didRedirect: false,
    loading: false,
  });
  const { email, password, error, didRedirect, loading } = values;
  const { user } = isAuthenticated();

  const handleChange = (value) => (event) => {
    setValues({ ...values, error: false, [value]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, email: "", password: "", error: false, loading: false, didRedirect: true });
          });
        }
      })
      .catch((err) => {
        console.log("Error in Signin : " + err);
      });
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-md-4 text-left">
          <div className="alert alert-success" style={{ display: didRedirect ? "" : "none" }}>
            {" "}
            <p>Signin Successful</p>
            <Link to="/">Go to home</Link>
          </div>
        </div>
      </div>
    );
  };

  const performRedirect = () => {
    // TODO : Do a redirection
    if (didRedirect) {
      if (user && user.role == 1) {
        return <p>redirect to admin</p>;
      } else {
        return <p>redirect to dashboard</p>;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-md-4 text-left">
          <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
            {" "}
            <p>Signin Failed</p>
            <p>{JSON.stringify(error)}</p>
          </div>
        </div>
      </div>
    );
  };

  const signinForm = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-md-4 text-left">
          <form>
            <div className="form-group my-2">
              <label className="form-label">Email</label>
              <input className="form-control" onChange={handleChange("email")} type="email" value={email} />
            </div>
            <div className="form-group my-2">
              <label className="form-label">Password</label>
              <input className="form-control" onChange={handleChange("password")} type="password" value={password} />
            </div>
            <button onClick={onSubmit} className="btn btn-secondary rounded my-2">
              SignIn
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In" description="Please sign in to Shop">
      {loadingMessage()}
      {errorMessage()}
      {successMessage()}
      {signinForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
