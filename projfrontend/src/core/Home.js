import React, { useEffect, useState } from "react";
import { getAllProducts } from "../admin/helper/productApi";
import { API } from "../backend";
import "../style.css";
import Base from "./Base";
import MyCard from "./Card";
import { Snackbar, CircularProgress } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

export default function Home() {
  const [values, setValues] = useState({
    products: [],
    error: "",
    isSuccess: false,
    loading: true,
  });
  const { loading, products } = values;
  const preLoad = () => {
    getAllProducts(0).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      }
      setValues({ ...values, products: data, error: "", isSuccess: true, loading: false });
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loading ? (
    <Skeleton />
  ) : (
    <Base title="Homepage">
      <div className="row">
        {products.map((product) => {
          return (
            <div className="col-md-3 col-sm-6 gy-4">
              <MyCard product={product}></MyCard>
            </div>
          );
        })}
      </div>
    </Base>
  );
}
