import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    createBrowserRouter, RouteObject,
    RouterProvider,
} from "react-router-dom";
import {ConfigProvider, App as AntApp, theme} from "antd"
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
            <AntApp>
                <ConfigProvider locale={esES} theme={{
                    algorithm: isMobile ? theme.compactAlgorithm : theme.defaultAlgorithm,
                    token: {
                        colorPrimary: "#f8aa19",
                        colorInfo: "#1a2a53",
                        colorBorderSecondary: "#f1f1f1",
                        colorBgBase: "#FFFFFF",
                    },
                    components: {
                        Layout: {
                            colorBgHeader: "#f3f3f3",
                            colorBgTrigger: "#152346",
                            colorBgBody: "#ffffff",
                            colorBgContainer: "#f3f3f3",
                        },
                        Menu: {
                            colorBgContainer: "rgba(0,0,0,0)",
                            darkItemBg: "#192850",
                            darkSubMenuItemBg: "#152346",
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
                            colorFillAlter: "#FEFEFE",
                            colorBgSpotlight: "#FFFFFF",
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
            </AntApp>
    );
}

export default App;
