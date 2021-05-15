import React from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = isAuthenticated();

  const adminLeftPanel = () => {
    return (
      <div className="card">
        {/* <h4 className="card-header bg-dark bg-gradient text-white">Admin Navigation</h4> */}
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-dark">
              Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-dark">
              Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-dark">
              Orders
            </Link>
          </li>
        </ul>
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
            <span className="badge bg-danger"> Admin </span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base title="Admin Dashboard Page" description="Manage your shop here" className="container bg-secondary bg-gradient p-4">
      <div className="row">
        <div className="col-3">{adminLeftPanel()}</div>
        <div className="col-9">{adminRightPanel()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
