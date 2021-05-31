import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  pageHeader: {
    padding: theme.spacing(4),
    display: "flex",
    marginBotton: theme.spacing(2),
    background: `linear-gradient(190deg,white 75%, ${theme.palette.secondary.main}  95%)`,
    boxShadow: `0 3px 5px 2px rgba(255, 98, 0, .3)`,
  },
  pageIcon: {
    display: "inline-block",
    padding: theme.spacing(2),
    color: theme.palette.primary,
    backgroundColor: theme.palette.background,
  },
  pageTitle: {
    paddingLeft: theme.spacing(4),
    "& .MuiTypography-subtitle2": {
      opacity: "0.6",
    },
  },
}));

const PageHeader = (props) => {
  const classes = useStyles();
  const { title, description } = props;
  return (
    <Paper elevation={4} className={classes.root}>
      <div className={classes.pageHeader}>
        <div className={classes.pageTitle}>
          <Typography variant={"h6"} component={"div"}>
            {title}
          </Typography>
          <Typography variant={"subtitle2"} component={"div"}>
            {description}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default PageHeader;
