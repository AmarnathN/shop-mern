import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllCategories } from "./helper/categoryApi";
import { goBack } from "./helper/common";
import { getProduct, updateProduct } from "./helper/productApi";
import Alert from "@material-ui/lab/Alert";
import { Snackbar, CircularProgress } from "@material-ui/core";
import { Redirect } from "react-router-dom";

const UpdateProduct = (props) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    sold_units: 0,
    image: "",
    categories: [],
    category: "",
    loading: true,
    error: "",
    isSuccess: false,
    getRedirect: false,
    formData: new FormData(),
  });

  const { user, token } = isAuthenticated();

  const { name, description, price, stock, sold_units, categories, error, isSuccess, formData, loading, getRedirect } = values;

  const preLoad = () => {
    let productId = props.match.params.productId;
    getProduct(token, productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(data);
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          sold_units: data.sold_units.toString(),
          category: data.category,
          loading: false,
        });
        preloadCategories();
      }
    });
  };

  const preloadCategories = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(data);
        setValues({ categories: data, error: "", isSuccess: false, loading: false, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  const handleChange = (valueName) => (event) => {
    const value = valueName === "image" ? event.target.files[0] : event.target.value;
    formData.set(valueName, value);
    setValues({ ...values, [valueName]: value });
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

  const onUpdateProduct = (event) => {
    let productId = props.match.params.productId;
    event.preventDefault();
    setValues({ ...values, error: "", isSuccess: false, loading: true });

    updateProduct(token, productId, formData).then((data) => {
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
      return <Redirect to="/admin/manage/products" />;
    }
  };

  const updateProductForm = () => {
    return (
      !loading &&
      !isSuccess && (
        <form>
          <div className="form-group row my-2">
            <label for="nameInput" className="col-sm-2">
              Name
            </label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="nameInput" onChange={handleChange("name")} value={name} autoFocus required />
            </div>
          </div>
          <div className="form-group row my-2">
            <label for="productDescriptionInput" className="col-sm-2">
              Description
            </label>
            <div className="col-sm-8">
              <textarea
                type="text"
                className="form-control"
                id="productDescriptionInput"
                onChange={handleChange("description")}
                value={description}
              />
            </div>
          </div>
          <div className="form-group row my-2">
            <label for="productPriceInput" className="col-sm-2">
              Price
            </label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="productPriceInput" onChange={handleChange("price")} value={price} required />
            </div>
          </div>
          <div className="form-group row my-2">
            <label for="productStockInput" className="col-sm-2">
              Stock
            </label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="productStockInput" onChange={handleChange("stock")} value={stock} required />
            </div>
          </div>
          <div className="form-group row my-2">
            <label for="productSoldInput" className="col-sm-2">
              Sold
            </label>
            <div className="col-sm-8 my-2">
              <input
                type="text"
                className="form-control"
                id="productSoldInput"
                placeholder="Example input"
                onChange={handleChange("sold_units")}
                value={sold_units}
              />
            </div>
          </div>
          <div className="form-group row my-2">
            <label for="productCategorySelect" className="col-sm-2">
              Category
            </label>
            <div className="col-sm-8">
              <select className="form-select" id="productCategorySelect" onChange={handleChange("category")}>
                <option>Select to update</option>
                {categories.map((categ, index) => {
                  return (
                    <option key={index} value={categ._id}>
                      {categ.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="form-group row my-2">
            <label for="productImageInput" className="col-sm-2">
              Update Product Image
            </label>
            <div className="col-sm-8">
              <input type="file" className="form-control-file" id="productImageInput" accpet="image" onChange={handleChange("image")} />
            </div>
          </div>
          <button type="submit" onClick={onUpdateProduct} className="btn btn-primary rounded my-2">
            Update Product
          </button>
        </form>
      )
    );
  };

  return (
    <Base title="Update Product" description="Update your product here" className="bg-secondary gx-2">
      <div className="row bg-light text-left">
        <div className="col-md-8">{goBack()}</div>
        {updateProductForm()}
        <div className="col-md-8">{loading && <CircularProgress />}</div>
      </div>
      {successMessage()}
      {errorMessage()}
      {performRedirect()}
    </Base>
  );
};

export default UpdateProduct;
