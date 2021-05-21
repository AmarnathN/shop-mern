import React from "react";
import { LinearProgress } from "@material-ui/core";

const ProgressBar = () => {
  return (
    <div className="row bg-secondary bg-gradient" style={{ justifyContent: "center", padding: 50 }}>
      <LinearProgress color="primary" />
      <LinearProgress color="seconadry" />
    </div>
  );
};

export default ProgressBar;
