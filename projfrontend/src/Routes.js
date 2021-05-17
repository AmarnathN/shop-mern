import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminRoute from "./auth/helper/AdminRoute";
import PrivateRoute from "./auth/helper/PrivateRoute";
import Home from "./core/Home";
import AdminDashboard from "./user/AdminDashboard";
import UserDashboard from "./user/UserDashboard";
import Signin from "./user/Signin";
import Signup from "./user/SignUp";
import ManageCategory from "./admin/ManageCategory";
import CreateCategory from "./admin/CreateCategory";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}></AdminRoute>
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard}></PrivateRoute>
        <AdminRoute path="/admin/create/category" exact component={CreateCategory}></AdminRoute>
        <AdminRoute path="/admin/manage/categories" exact component={ManageCategory}></AdminRoute>
      </Switch>
    </BrowserRouter>
  );
}