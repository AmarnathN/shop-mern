import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#ff6200",
      light: "#f57b2f",
    },
    theme: {
      main: "#00e0ce",
      light: "#a7d4d0",
    },
    primary: {
      main: "#00e0ce",
      light: "#82d1cb",
    },
    background: {
      white: "#ffffff",
      default: "#e2e2e2",
      light: "#a8a8a8",
      dark: "#00000",
    },
  },
  shape: {
    borderRadius: "12px",
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});
