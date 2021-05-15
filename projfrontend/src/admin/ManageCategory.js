import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory, deleteCategory, getAllCategories } from "./helper/adminApi";

const ManageCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const fetchAllCategories = () => {
    getAllCategories()
      .then((data) => setAllCategories(data))
      .catch((err) => {
        console.log("Error fetching all categories : " + err);
      });
  };

  useEffect(fetchAllCategories, [isSuccess]);

  const goBack = () => {
    return (
      <div className="col-lg-4">
        <Link className="btn btn-secondary rounded my-2" to="/admin/dashboard">
          Go To Dashboard
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="alert alert-success" style={{ display: isSuccess ? "" : "none" }}>
          {" "}
          <p>Category Successfully {isSuccess}</p>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
          {""}
          <p>Failed to create category</p>
          <p>{JSON.stringify(error)}</p>
        </div>
      </div>
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setIsSuccess(false);

    createCategory({ name }, token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError("");
          setIsSuccess("Created");
          setName("");
        }
      })
      .catch((err) => {
        console.log("Error creating cateogry : " + err);
      });
  };

  const OnDelete = (event) => {
    let categoryId = event.target.value;
    event.preventDefault();
    setError("");
    setIsSuccess(false);

    deleteCategory(categoryId, token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError("");
          setIsSuccess("Deleted");
        }
      })
      .catch((err) => {
        console.log("Error deleting cateogry : " + err);
      });
  };

  useEffect(fetchAllCategories, []);

  const myCategoryForm = () => {
    return (
      <form>
        <div className="md-3">
          <label className="form-label">Category Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="Enter catefory name E.g:Shirts"
          />
        </div>
        <div className="row">
          <div className="col-lg-4">
            <button type="submit" onClick={onSubmit} className="btn btn-primary rounded my-2">
              Create Category
            </button>
          </div>
          {goBack()}
        </div>
      </form>
    );
  };

  const categoriesTable = () => {
    return (
      <div className="row bg-light text-center">
        <table className="table table-striped table-hover caption-top">
          <caption className="text-dark">
            <h4>List of Categories (last 3)</h4>
          </caption>
          <thead>
            <tr>
              <th scope="col">S.No#</th>
              <th scope="col">Name</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          {allCategories.length > 0 && (
            <tbody>
              {allCategories.slice(0, 3).map((cateogry, index) => {
                return (
                  <tr>
                    <td scope="row">{index + 1}</td>
                    <td>{cateogry.name}</td>
                    <td>
                      <button onClick={OnDelete} className="btn btn-danger rounded" value={cateogry._id}>
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
          {allCategories.length == 0 && (
            <tbody>
              <tr>
                <td colspan="3">
                  <p> no Categories to show</p>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    );
  };

  return (
    <Base title="Manage Categories" description="Manage your catgories" className="container bg-secondary p-4">
      <div className="row bg-light text-left">
        <div className="col-md-8">{myCategoryForm()}</div>
      </div>
      {successMessage()}
      {errorMessage()}
      {categoriesTable()}
    </Base>
  );
};
export default ManageCategory;
