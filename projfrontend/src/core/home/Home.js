import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../admin/helper/productApi";

import Base from "../Base";
import HomeCard from "./HomeCard";
import ProgressBar from "../common/progressBar";

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

  return (
    <Base title="Homepage">
      {loading && ProgressBar()}
      {!loading && (
        <div className="row bg-gradient">
          {products.map((product) => {
            return (
              <div className="col-lg-4 col-md-6 col-sm-6 gy-4">
                <HomeCard product={product}></HomeCard>
              </div>
            );
          })}
        </div>
      )}
    </Base>
  );
}
