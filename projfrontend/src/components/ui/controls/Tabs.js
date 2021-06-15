import React from "react";
import { Paper, Tabs as MuiTabs, Tab, Box, makeStyles, AppBar } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    width: "100%",
    height: "100%",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
  },
  appBar: {
    background: theme.palette.background.white,
    boxShadow: `0 3px 5px 2px rgba(0, 0, 0, .3)`,
  },
}));

const Tabs = (props) => {
  const [value, setValue] = React.useState(0);
  const { tabsList, variant } = props;
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <MuiTabs
          value={value}
          indicatorColor="primary"
          textColor="secondary"
          onChange={handleChange}
          variant={variant || "fullWidth"}
          scrollButtons="on"
        >
          {tabsList.length > 0 &&
            tabsList.map((tabItem) => {
              return <Tab wrapped label={tabItem.label}></Tab>;
            })}
        </MuiTabs>
      </AppBar>
      {tabsList.length > 0 &&
        tabsList.map((tabItem, i) => {
          return (
            <TabPanel value={value} index={i} key={i}>
              {tabItem.component}
            </TabPanel>
          );
        })}
    </div>
  );
};

export default Tabs;
