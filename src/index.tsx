import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, Theme, createTheme } from "@mui/material";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const theme: Partial<Theme> = createTheme({
  palette: {
    primary: {
      main: "#f8aa19",
      light: "#f8aa19",
      dark: "#f8aa19",
      contrastText: "#fff",
    },
    secondary: {
      main: "#1a2a53",
      light: "#1a2a53",
      dark: "#1a2a53",
      contrastText: "#fff",
    },
  },
});
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
