import React from "react";
import { LinearProgress } from "@material-ui/core";

const ProgressBar = () => {
  return (
    <div className="row bg-secondary bg-gradient" style={{ justifyContent: "center" }}>
      <LinearProgress color="primary" />
      <LinearProgress />
      <LinearProgress color="secondary" />
    </div>
  );
};

export default ProgressBar;
