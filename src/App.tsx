import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    createBrowserRouter, RouteObject,
    RouterProvider,
} from "react-router-dom";
import {Button, ConfigProvider, Result, theme} from "antd"
import {AppRoutes} from "./utils/Routes";

import dayjs from 'dayjs';
import esES from 'antd/locale/es_ES';
import 'dayjs/locale/es';
import {useBreakpoints} from "./ui/hooks/Breakpoint";
import {isSm, isXs, screenIsAnyOf} from "./utils/tailwind.screens";

dayjs.locale('es');

function App() {
    const {breakpoint} = useBreakpoints()
    const isMobile = screenIsAnyOf(breakpoint, isXs, isSm)
    return (
        <ConfigProvider locale={esES} theme={{
            algorithm: isMobile ? theme.compactAlgorithm : theme.defaultAlgorithm,
            token: {
                colorPrimary: "#f8aa19",
                colorInfo: "#1a2a53",
                colorBorderSecondary: "#f1f1f1"
            },
            components: {
                Layout: {
                    colorBgHeader: "#1a2a53",
                    colorBgTrigger: "#152346",
                    colorBgBody: "#ffffff"
                },
                Menu: {
                    colorBgContainer: "#1a2a53",
                    darkItemBg: "#192850",
                    darkSubMenuItemBg: "#152346"
                },
                Drawer: {
                    colorIcon: "#FFFFFF",
                    colorText: "#FFFFFF",
                    colorIconHover: "#FFFFFF",
                    colorSplit: "rgba(255,255,255,0.5)",
                    colorBgElevated: "#1a2a53"
                },
                Table: {
                    colorBorder: "rgba(0,0,0,0)",
                    colorBorderBg: "rgba(0,0,0,0)",
                    colorBorderSecondary: "#f1f1f1",
                    colorFillAlter: "rgba(248,170,25,0.11)",
                },
                Input: {
                    colorText: "#505050",
                },
            },
        }}>
            <div className="w-screen h-screen overflow-hidden">
                <ToastContainer/>
                <RouterProvider router={createBrowserRouter(AppRoutes as RouteObject[])}/>
            </div>
        </ConfigProvider>
    );
}

export default App;
