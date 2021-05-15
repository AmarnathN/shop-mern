import React, { useState } from "react";
import { Link } from "react-router-dom";

import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const ManageCategory = () => {
  const [name, setName] = useState("initialState");
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => {
    return (
      <div class="col-lg-4">
        <Link className="btn btn-secondary rounded my-2" to="/admin/dashboard">
          Go To Dashboard
        </Link>
      </div>
    );
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div class="md-3">
          <label class="form-label">Category Name</label>
          <input type="text" class="form-control" autoFocus required placeholder="Enter catefory name E.g:Shirts" />
        </div>
        <div className="row">
          <div class="col-lg-4">
            <button type="submit" class="btn btn-primary rounded my-2">
              Create Category
            </button>
          </div>
          {goBack()}
        </div>
      </form>
    );
  };

  return (
    <Base title="Manage Categories" description="Manage your catgories" className="container bg-secondary p-4">
      <div className="row bg-light text-left">
        <div className="col-md-8">{myCategoryForm()}</div>
      </div>
    </Base>
  );
};
export default ManageCategory;
