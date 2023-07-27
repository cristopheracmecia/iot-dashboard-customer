import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    createBrowserRouter, RouteObject,
    RouterProvider,
} from "react-router-dom";
import {ConfigProvider, theme} from "antd"
import {AppRoutes} from "./utils/Routes";


function App() {
    return (
        <ConfigProvider  theme={{
            token: {colorPrimary: "#f8aa19", colorInfo: "#1a2a53", colorBgContainer: "rgba(255,255,255,0.8)",
            colorBgLayout: "#FAFAFA", colorBgBase: "#1a2a53"},
            components: {
                Layout: {
                    colorBgHeader: "#1a2a53",
                    colorBgTrigger: "#152346"
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
                    colorSplit: "rgba(255,255,255,0.5)"
                }
            },
            algorithm: theme.defaultAlgorithm
        }}>
            <div className="w-screen h-screen overflow-hidden">
                <ToastContainer/>
                <RouterProvider router={createBrowserRouter(AppRoutes as RouteObject[])}/>
            </div>
        </ConfigProvider>
    );
}

export default App;
