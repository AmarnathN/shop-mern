import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../admin/helper/productApi";

import Base from "../Base";
import HomeCard from "./HomeCard";
import ProgressBar from "../common/progressBar";
import { Grid } from "@material-ui/core";
import { MyControls } from "../../components/ui/controls/MyControls";

export default function Home() {
  const [values, setValues] = useState({
    products: [],
    error: "",
    isSuccess: false,
    loading: true,
  });
  const [notify, setNotify] = useState({ isOpen: false, alertMessage: "", alertType: "" });
  const { loading, products } = values;
  const preLoad = () => {
    getAllProducts(0).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        setNotify({ isOpen: true, alertMessage: data.error, alertType: "error" });
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
      <MyControls.Notification notify={notify} setNotify={setNotify} />
      {!loading && (
        <Grid container>
          {products.map((product) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <HomeCard product={product} notify={notify} setNotify={setNotify}></HomeCard>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Base>
  );
}
