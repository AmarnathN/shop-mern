import React, { Component } from "react";
import BaseFooter from "./BaseFooter";
import NavigationBar from "./NavigationBar";
import "../style.css";
import BaseHeader from "./BaseHeader";
import { CssBaseline, makeStyles, ThemeProvider } from "@material-ui/core";
import { theme } from "./Theme";

const useStyles = makeStyles((theme) => ({
  appMain: {
    width: "100%",
    backgroundColor: theme.palette.background.dark,
  },
}));

const Base = ({ title = "My Title", description = "My Description", className = "bg-dark text-white p-2", children }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <div className={classes.appMain}>
            <BaseHeader />
          </div>
          <div className="container-fluid bg-dark">
            <div className="card bg-dark">
              {/* <div class="card-header main_header bg-gradient">
            <NavigationBar></NavigationBar>
          </div> */}
              <div class="container-fluid card-body bg-dark main_body overflow-auto">
                <div className=" card-title bg-dark text-white text-center">
                  <h1 className=" card-text text-warning">{title}</h1>
                  <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
              </div>

              <div className="card-footer main_footer bg-gradient text-white text-center">
                <BaseFooter />
              </div>
            </div>
          </div>
          <CssBaseline></CssBaseline>
        </ThemeProvider>
      </React.Fragment>
    </React.Fragment>
  );
};

export default Base;
