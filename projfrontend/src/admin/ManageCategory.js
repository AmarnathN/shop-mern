import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteCategory, getAllCategories } from "./helper/categoryApi";
import { DataGrid } from "@material-ui/data-grid";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Alert from "@material-ui/lab/Alert";
import { Snackbar, Grid, Button } from "@material-ui/core";
import { goBack } from "./helper/common";

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
      .catch((error) => {
        console.log("Error fetching all categories : " + error);
      });
  };

  useEffect(fetchAllCategories, [isSuccess]);

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
      .catch((error) => {
        console.log("Error deleting cateogry : " + error);
      });
  };

  useEffect(fetchAllCategories, []);

  const columns = [
    { field: "CategoryName", headerName: "Category name", width: 200 },
    {
      field: "actionUpdate",
      headerName: "Update",
      width: 200,
      renderCell: (params) => (
        <strong>
          <Button variant="contained" href={`/admin/update/category/${params.id}`}>
            Update
          </Button>
        </strong>
      ),
    },
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
      <Grid spacing={2}>
        <Grid item xs={12}>
          <div style={{ height: 300 }}>
            <DataGrid rows={rows} columns={columns} autoPageSize={true} />
          </div>
        </Grid>
      </Grid>
    );
  };

  return (
    <Base title="Manage Categories" description="Manage your catgories" className="bg-secondary p-1">
      <div className="row bg-light text-left">
        <div className="row">{goBack()}</div>
        <div className="col-md-8">{categoriesTable()}</div>
      </div>
      {successMessage()}
      {errorMessage()}
    </Base>
  );
};
export default ManageCategory;
