import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {AppLoaderProvider} from "./ui/context/Loading";
import {AppBreakpointsProvider} from "./ui/context/Breakpoint";
import {DayNightThemeProvider} from "./ui/hooks/SwitchTheme";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    // <React.StrictMode>
    <AppBreakpointsProvider>
        <AppLoaderProvider>
            <DayNightThemeProvider>
                <App/>
            </DayNightThemeProvider>
        </AppLoaderProvider>
    </AppBreakpointsProvider>
    // </React.StrictMode>
);

reportWebVitals();
