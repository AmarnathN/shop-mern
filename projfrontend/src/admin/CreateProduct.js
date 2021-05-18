import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllCategories } from "./helper/categoryApi";
import { goBack } from "./helper/common";
import { createProduct } from "./helper/productApi";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

const CreateProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    sold: 0,
    image: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    isSuccess: false,
    getRedirect: false,
    formData: new FormData(),
  });
  const { user, token } = isAuthenticated();

  const { name, description, price, stock, sold, image, categories, category, loading, error, isSuccess, getRedirect, formData } = values;

  const preLoad = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(data);
        setValues({ ...values, categories: data });
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

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "" });

    createProduct(token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(data);
        setValues({
          ...values,
          name: "",
          description: "",
          price: 0,
          stock: 0,
          sold: 0,
          image: "",
          category: "",
          loading: false,
          isSuccess: "created",
        });
      }
    });
  };

  const createProductForm = () => {
    return (
      <form>
        <div class="form-group row my-2">
          <label for="nameInput" className="col-sm-2">
            Name
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="nameInput"
              placeholder="Name"
              onChange={handleChange("name")}
              value={name}
              autoFocus
              required
            />
          </div>
        </div>
        <div class="form-group row my-2">
          <label for="productDescriptionInput" className="col-sm-2">
            Description
          </label>
          <div className="col-sm-8">
            <textarea
              type="text"
              class="form-control"
              id="productDescriptionInput"
              placeholder="Description"
              onChange={handleChange("description")}
              value={description}
            />
          </div>
        </div>
        <div class="form-group row my-2">
          <label for="productPriceInput" className="col-sm-2">
            Price
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="productPriceInput"
              placeholder="Example : 11.2"
              onChange={handleChange("price")}
              value={price}
              required
            />
          </div>
        </div>
        <div class="form-group row my-2">
          <label for="productStockInput" className="col-sm-2">
            Stock
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="productStockInput"
              placeholder="Example input"
              onChange={handleChange("stock")}
              value={stock}
              required
            />
          </div>
        </div>
        <div class="form-group row my-2">
          <label for="productSoldInput" className="col-sm-2">
            Sold
          </label>
          <div className="col-sm-8 my-2">
            <input
              type="text"
              class="form-control"
              id="productSoldInput"
              placeholder="Example input"
              onChange={handleChange("sold")}
              value={sold}
            />
          </div>
        </div>
        <div class="form-group row my-2">
          <label for="productCategorySelect" className="col-sm-2">
            Category
          </label>
          <div className="col-sm-8">
            <select class="form-control custom-select" id="productCategorySelect" onChange={handleChange("category")}>
              <option>Select ...</option>
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
        <div class="form-group row my-2">
          <label for="productImageInput" className="col-sm-2">
            Product Image
          </label>
          <div className="col-sm-8">
            <input type="file" class="form-control-file" id="productImageInput" accpet="image" onChange={handleChange("image")} />
          </div>
        </div>
        <button type="submit" onClick={onSubmit} class="btn btn-primary rounded my-2">
          Create Product
        </button>
      </form>
    );
  };

  return (
    <Base title="Create Product" description="Create your product here" className="bg-secondary gx-2">
      <div className="row bg-light text-left">
        <div className="col-md-8">{goBack()}</div>
        {createProductForm()}
      </div>
      {successMessage()}
      {errorMessage()}
    </Base>
  );
};

export default CreateProduct;
