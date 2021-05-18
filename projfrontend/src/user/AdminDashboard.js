import React from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = isAuthenticated();

  const adminLeftPanel = () => {
    return (
      <div className="accordion" id="adminLeftAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingCategories">
            <button className="accordion-button btn text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCategories">
              Categories
            </button>
          </h2>
          <div id="collapseCategories" className="accordion-collapse collapse" data-bs-parent="#adminLeftAccordion">
            <ul className="list-group">
              <li className="list-group-item">
                <Link to="/admin/create/category" className="nav-link text-dark">
                  Create Category
                </Link>
              </li>
              <li className="list-group-item">
                <Link to="/admin/manage/categories" className="nav-link text-dark">
                  Manage Category
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingProducts">
            <button className="accordion-button btn text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseProducts">
              Products
            </button>
          </h2>
          <div id="collapseProducts" className="accordion-collapse collapse" data-bs-parent="#adminLeftAccordion">
            <ul className="list-group">
              <li className="list-group-item">
                <Link to="/admin/create/product" className="nav-link text-dark">
                  Create Product
                </Link>
              </li>
              <li className="list-group-item">
                <Link to="/admin/manage/products" className="nav-link text-dark">
                  Manage Product
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const adminRightPanel = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Details</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge bg-secondary"> Name </span> {user.name}
          </li>
          <li className="list-group-item">
            <span className="badge bg-secondary"> Email </span> {user.email}
          </li>

          <li className="list-group-item">
            <span className="badge bg-danger"> Admin </span> {user.role}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base title="Admin Dashboard Page" description="Manage your shop here" className=" bg-secondary bg-gradient p-2">
      <div className="row">
        <div className="col-lg-3 col-md-3 col-sm-12">{adminLeftPanel()}</div>
        <div className="col-lg-9 col-md-9 col-sm-12">{adminRightPanel()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
