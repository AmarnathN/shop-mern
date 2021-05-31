import React from "react";
import { Paper, Tabs as MuiTabs, Tab, Box } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const Tabs = (props) => {
  const [value, setValue] = React.useState(0);
  const { tabsList } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <MuiTabs variant="fullWidth" value={value} indicatorColor="primary" textColor="primary" onChange={handleChange}>
        {tabsList.length > 0 &&
          tabsList.map((tabItem) => {
            return <Tab label={tabItem.label}></Tab>;
          })}
      </MuiTabs>
      {tabsList.length > 0 &&
        tabsList.map((tabItem, i) => {
          return (
            <TabPanel value={value} index={i}>
              {tabItem.component}
            </TabPanel>
          );
        })}
    </React.Fragment>
  );
};

export default Tabs;
