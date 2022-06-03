import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { goBack } from "./helper/common";
import Alert from "@material-ui/lab/Alert";
import { DataGrid } from "@material-ui/data-grid";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { Snackbar, Grid, Button } from "@material-ui/core";
import { deleteProduct, getAllProducts } from "./helper/productApi";

const ManageProduct = () => {
  const [values, setValues] = useState({
    products: [],
    error: "",
    isSuccess: false,
    isLoading: true,
  });
  const { user, token } = isAuthenticated();

  const { products, error, isSuccess, isLoading } = values;

  const preLoad = () => {
    getAllProducts(0).then((data) => {
      if (!data){
        setValues({ ...values,  products: [], isLoading: false, error: "No Products Data" });
      }
      else if(data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, products: data, isLoading: false });
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, [isSuccess]);

  const handleClose = () => {
    setValues({ ...values, error: "", isSuccess: false });
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
            <p>Product has been successfully {isSuccess}</p>
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

  const OnDelete = (event, productId) => {
    event.preventDefault();
    setValues({ ...values, error: "", isSuccess: false, isLoading: true });

    deleteProduct(token, productId)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, isLoading: false });
        } else {
          setValues({ ...values, error: "", isSuccess: "Deleted", isLoading: false });
        }
      })
      .catch((error) => {
        setValues({ ...values, error: error, isSuccess: false, isLoading: false });
        console.log("Error deleting product : " + error);
      });
  };

  const columns = [
    { field: "ProductName", headerName: "Name", width: 200 },
    { field: "CategoryName", headerName: "Category", width: 200 },
    {
      field: "actionUpdate",
      headerName: "Update",
      width: 200,
      renderCell: (params) => (
        <strong>
          <Button variant="contained" href={`/admin/update/product/${params.id}`}>
            Update
          </Button>
        </strong>
      ),
    },
    {
      field: "actionDelete",
      headerName: "Delete",
      renderCell: (params) => (
        <strong>
          <DeleteOutlinedIcon onClick={(e) => OnDelete(e, params.id)} />
        </strong>
      ),
    },
  ];

  const rows =
    products.length > 0
      ? products.map((product) => {
          return {
            ProductName: product.name,
            id: product._id,
            CategoryName: `${product.category != undefined ? product.category.name : null}`,
          };
        })
      : [];

  const productsTable = () => {
    return (
      <Grid spacing={2}>
        <Grid item xs={12}>
          <div style={{ height: 350 }}>
            <DataGrid rows={rows} columns={columns} autoPageSize={true} loading={isLoading} />
          </div>
        </Grid>
      </Grid>
    );
  };

  return (
    <Base title="Manage Products" description="Manage your products here" className="bg-secondary gx-2">
      <div className="row bg-light text-left">
        <div className="col-md-8">{goBack()}</div>
        {productsTable()}
      </div>
      {successMessage()}
      {errorMessage()}
    </Base>
  );
};

export default ManageProduct;
