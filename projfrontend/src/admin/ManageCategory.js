import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteCategory, getAllCategories } from "./helper/categoryApi";
import { DataGrid } from "@material-ui/data-grid";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Alert from "@material-ui/lab/Alert";
import { Snackbar, Grid } from "@material-ui/core";

const ManageCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  const handleClose = (event) => {
    setIsSuccess(false);
    setError("");
  };

  const { user, token } = isAuthenticated();

  const fetchAllCategories = () => {
    getAllCategories(25)
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

  const OnDelete = (event, categoryId) => {
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

  const columns = [
    { field: "CategoryName", headerName: "Category name", width: 200 },
    {
      field: "action",
      headerName: "",
      renderCell: (params) => (
        <strong>
          <DeleteOutlinedIcon onClick={(e) => OnDelete(e, params.id)} />
        </strong>
      ),
    },
  ];

  const rows = allCategories.map((category) => {
    return { CategoryName: category.name, id: category._id };
  });

  const categoriesTable = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{ height: 300 }}>
            <DataGrid rows={rows} columns={columns} autoPageSize={true} />
          </div>
        </Grid>
      </Grid>
    );
  };

  return (
    <Base title="Manage Categories" description="Manage your catgories" className="container-fluid bg-secondary p-1">
      <div className="container-fluid">
        <div className="row bg-light text-left">
          <div className="row">{goBack()}</div>
          <div className="col-md-8">{categoriesTable()}</div>
        </div>
        {successMessage()}
        {errorMessage()}
      </div>
    </Base>
  );
};
export default ManageCategory;
