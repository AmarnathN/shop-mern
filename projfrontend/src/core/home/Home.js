import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../admin/helper/productApi";

import Base from "../Base";
import HomeCard from "./HomeCard";
import ProgressBar from "../common/progressBar";
import { Grid } from "@material-ui/core";
import { MyControls } from "../../components/ui/controls/MyControls";
import { getAllCategories } from "../../admin/helper/categoryApi";

export default function Home() {
  const [values, setValues] = useState({
    products: [],
    categories: [],
    isSuccess: false,
    loading: true,
  });

  const [notify, setNotify] = useState({ isOpen: false, alertMessage: "", alertType: "" });
  const { loading, products, categories } = values;
  const preLoad = () => {
    getAllProducts(0).then((productsData) => {
      if (!productsData){
        setValues({ ...values, error: "No Products Data", loading: false });
        setNotify({ isOpen: true, alertMessage: "Error Getting Product data", alertType: "error" });
      }
      else if(productsData.error) {
        setValues({ ...values, error: productsData.error, loading: false });
        setNotify({ isOpen: true, alertMessage: productsData.error, alertType: "error" });
      } else {
        let categoriesList = productsData.map((prod) => {
          return prod.category;
        });
        categoriesList = [...new Set(categoriesList.map((e) => JSON.stringify(e)))].map((e) => JSON.parse(e));
        setValues({ ...values, products: productsData, categories: categoriesList, loading: false });
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  const getCategoriesTabList = () => {
    return categories.map((category) => {
      let productsWithCateogry = products.filter((prod) => prod.category._id === category._id);
      const productCardData = productsWithCateogry.length > 0 && (
        <Grid container>
          {productsWithCateogry.map((product) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <HomeCard product={product} notify={notify} setNotify={setNotify}></HomeCard>
              </Grid>
            );
          })}
        </Grid>
      );
      return {
        label: category.name,
        component: productCardData,
      };
    });
  };

  return (
    <Base title="Homepage" description="Please find the products here">
      {loading && ProgressBar()}
      <MyControls.Notification notify={notify} setNotify={setNotify} />
      {!loading && categories.length > 0 && <MyControls.Tabs variant="scrollable" tabsList={getCategoriesTabList()}></MyControls.Tabs>}
    </Base>
  );
}
