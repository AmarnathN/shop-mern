import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#D8D28C",
      light: "#D8D28C",
    },
    theme: {
      main: "#FFEF33",
      light: "#D8D28C",
    },
    primary: {
      main: "#D8D28C",
      light: "#D8D28C",
    },
    background: {
      white: "#ffffff",
      default: "#f2f2f2",
      light: "#a8a8a8",
      dark: "#000000",
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
