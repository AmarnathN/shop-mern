import { Link } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { MyControls } from "../components/ui/controls/MyControls";
import Base from "./Base";

const NotFoundPage = () => {
  const history = useHistory();
  const redirectToHome = () => {
    history.push("/");
  };
  return (
    <Base title="Page Not found" description="You have been redirect to an invalid url">
      <MyControls.Box>
        <MyControls.Button text="Go to Dashboard" onClick={redirectToHome}></MyControls.Button>
      </MyControls.Box>
    </Base>
  );
};

export default NotFoundPage;
