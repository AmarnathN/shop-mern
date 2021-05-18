import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategory, updateCategory } from "./helper/categoryApi";
import { goBack } from "./helper/common";
import Alert from "@material-ui/lab/Alert";
import { Snackbar, CircularProgress } from "@material-ui/core";
import { Redirect } from "react-router-dom";

const UpdateCategory = (props) => {
  const [values, setValues] = useState({
    name: "",
    loading: true,
    error: "",
    isSuccess: false,
    getRedirect: false,
  });

  const { user, token } = isAuthenticated();

  const { name, error, isSuccess, loading, getRedirect } = values;

  const preLoad = () => {
    let categoryId = props.match.params.categoryId;
    getCategory(categoryId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          loading: false,
        });
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  const handleChange = (valueName) => (event) => {
    setValues({ ...values, [valueName]: event.target.value });
  };

  const handleClose = () => {
    if (isSuccess == "updated") {
      setValues({ ...values, error: "", isSuccess: false, getRedirect: true });
    } else {
      setValues({ ...values, error: "", isSuccess: false });
    }
  };

  const successMessage = () => {
    return (
      <div className="row">
        <Snackbar
          open={isSuccess != false}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert onClose={handleClose} severity="success">
            <p>Category has been successfully {isSuccess}</p>
          </Alert>
        </Snackbar>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <Snackbar
          open={error != ""}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert onClose={handleClose} severity="error">
            <p>{JSON.stringify(error)}</p>
          </Alert>
        </Snackbar>
      </div>
    );
  };

  const onUpdateCategory = (event) => {
    let categoryId = props.match.params.categoryId;
    event.preventDefault();
    setValues({ ...values, error: "", isSuccess: false, loading: true });

    updateCategory(categoryId, { name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, getRedirect: false });
      } else {
        setValues({
          ...values,
          loading: false,
          isSuccess: "updated",
        });
      }
    });
  };
  const performRedirect = () => {
    if (getRedirect) {
      return <Redirect to="/admin/manage/categories" />;
    }
  };

  const updateCategoryForm = () => {
    return (
      !loading &&
      !isSuccess && (
        <form>
          <div className="row-md-4">
            <label className="form-label">Category Name :</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange("name")}
              value={name}
              autoFocus
              required
              placeholder="Enter catefory name E.g:Shirts"
            />
          </div>
          <div className="row-md-4">
            <div className="col-md-4">
              <button type="submit" onClick={onUpdateCategory} className="btn btn-primary rounded my-2">
                Update Category
              </button>
            </div>
          </div>
        </form>
      )
    );
  };

  return (
    <Base title="Update Product" description="Update your product here" className="bg-secondary gx-2">
      <div className="row bg-light text-left">
        <div className="col-md-8">{goBack()}</div>
        {updateCategoryForm()}
        <div className="col-md-8">{loading && <CircularProgress />}</div>
      </div>
      {successMessage()}
      {errorMessage()}
      {performRedirect()}
    </Base>
  );
};

export default UpdateCategory;
