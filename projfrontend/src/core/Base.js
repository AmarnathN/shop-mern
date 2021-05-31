import React, { Component } from "react";
import BaseFooter from "./BaseFooter";
import BaseHeader from "./BaseHeader";
import { CssBaseline, makeStyles, ThemeProvider, Paper, Divider } from "@material-ui/core";
import { theme } from "./Theme";
import PageHeader from "./PageHeader";

const useStyles = makeStyles((theme) => ({
  appMain: {
    width: "100%",
    backgroundColor: theme.palette.background.light,
  },
  appHeader: {
    height: "8vh",
  },
  appBody: {
    height: "87vh",
    overflow: "auto",
  },
  appBodyChildren: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  appFooter: {
    height: "5vh",
  },
}));

const Base = ({ title = "My Title", description = "My Description", className = "text-white p-2", children }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <div className={classes.appMain}>
            <div className={classes.appHeader}>
              <BaseHeader />
            </div>
            <div className={classes.appBody}>
              <PageHeader title={title} description={description} />

              <div className={classes.appBodyChildren}>{children}</div>
            </div>
            <div className={classes.appFooter}>
              <BaseFooter />
            </div>
          </div>
          <CssBaseline></CssBaseline>
        </ThemeProvider>
      </React.Fragment>
    </React.Fragment>
  );
};

export default Base;
