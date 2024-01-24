import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminRoute from "./auth/helper/AdminRoute";
import PrivateRoute from "./auth/helper/PrivateRoute";
import Home from "./core/home/Home";
import Cart from "./core/cart/Cart";
import AdminDashboard from "./user/AdminDashboard";
import UserDashboard from "./user/UserDashboard";
import ManageCategory from "./admin/ManageCategory";
import CreateCategory from "./admin/CreateCategory";
import CreateProduct from "./admin/CreateProduct";
import ManageProduct from "./admin/ManageProduct";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Checkout from "./core/checkout/Checkout";
import NotFoundPage from "./core/NotFoundPage";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <PrivateRoute path="/cart" exact component={Cart}></PrivateRoute>
        <PrivateRoute
          path="/checkout/"
          exact
          component={Checkout}
        ></PrivateRoute>
        <AdminRoute
          path="/admin/dashboard"
          exact
          component={AdminDashboard}
        ></AdminRoute>
        <PrivateRoute
          path="/user/dashboard"
          exact
          component={UserDashboard}
        ></PrivateRoute>
        <AdminRoute
          path="/admin/create/category"
          exact
          component={CreateCategory}
        ></AdminRoute>
        <AdminRoute
          path="/admin/manage/categories"
          exact
          component={ManageCategory}
        ></AdminRoute>
        <AdminRoute
          path="/admin/create/product"
          exact
          component={CreateProduct}
        ></AdminRoute>
        <AdminRoute
          path="/admin/manage/products"
          exact
          component={ManageProduct}
        ></AdminRoute>
        <AdminRoute
          path="/admin/update/product/:productId"
          exact
          component={UpdateProduct}
        ></AdminRoute>
        <AdminRoute
          path="/admin/update/category/:categoryId"
          exact
          component={UpdateCategory}
        ></AdminRoute>
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
