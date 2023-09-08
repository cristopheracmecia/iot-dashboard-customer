import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { ConfigProvider, App as AntApp, theme } from "antd";
import { AppRoutes } from "./utils/Routes";
import dayjs from "dayjs";
import esES from "antd/locale/es_ES";
import "dayjs/locale/es";
import { useBreakpoints } from "./ui/hooks/Breakpoint";
import { isSm, isXs, screenIsAnyOf } from "./utils/tailwind.screens";
import { useDayNightTheme } from "./ui/hooks/SwitchTheme";
import { HappyProvider } from "@ant-design/happy-work-theme";

dayjs.locale("es");

function App() {
  const { breakpoint } = useBreakpoints();
  const isMobile = screenIsAnyOf(breakpoint, isXs, isSm);
  const { darkMode } = useDayNightTheme();
  return (
    <AntApp>
      <ConfigProvider
        locale={esES}
        componentSize={isMobile ? "small" : "middle"}
        theme={{
          algorithm: isMobile
            ? darkMode
              ? [theme.compactAlgorithm, theme.darkAlgorithm]
              : theme.compactAlgorithm
            : darkMode
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
          token: {
            colorPrimary: "#f8aa19",
            colorBorderSecondary: darkMode ? "#727272" : "#f1f1f1",
            colorBgBase: darkMode ? "#424242" : "#FFFFFF",
            colorLink: darkMode ? "rgba(255,255,255,0.6)" : "#505050",
          },
          components: {
            Layout: {
              colorBgHeader: darkMode ? "#212121" : "#FFF",
              colorBgTrigger: "#f3f3f3",
              colorBgBody: darkMode ? "#212121" : "#f5f8ff",
              colorBgContainer: darkMode ? "#424242" : "#1a2a53",
              colorText: "rgba(255,255,255,0.6)",
            },
            Menu: {
              colorBgContainer: "transparent",
              colorText: "rgba(255,255,255,0.6)",
              itemSelectedBg: darkMode ? "#212121" : "#274081",
              colorBgElevated: darkMode ? "#424242" : "#1a2a53",
              colorBgBase: "transparent",
            },
            Drawer: {
              colorIcon: "#FFFFFF",
              colorText: "#FFFFFF",
              colorIconHover: "#FFFFFF",
              colorSplit: "rgba(255,255,255,0.5)",
              colorBgElevated: "#1a2a53",
            },
            Table: {
              colorBorder: "rgba(0,0,0,0)",
              colorBorderBg: "rgba(0,0,0,0)",
              colorBorderSecondary: darkMode ? "#727272" : "#f1f1f1",
              colorFillAlter: darkMode ? "#464646" : "#FEFEFE",
              colorBgSpotlight: darkMode ? "#424242" : "#FEFEFE",
              colorBgBase: darkMode ? "#424242" : "#FEFEFE",
              colorBgContainer: darkMode ? "#424242" : "#FEFEFE",
              colorText: darkMode ? "rgba(255,255,255,0.6)" : "#000000",
              colorTextBase: darkMode ? "rgba(255,255,255,0.6)" : "#000000",
            },
            Input: {
              colorText: darkMode ? "rgba(255,255,255,0.6)" : "#505050",
            },
            Alert: {
              colorInfoBg: darkMode ? "#282a33" : "#c5d1f5",
              colorText: darkMode ? "#EFEFEF" : "#212121",
              colorErrorBg: darkMode ? "#1f1111" : "#f5c5c5",
              colorWarningBg: darkMode ? "#262217" : "#f5eac5",
              colorInfoText: "#212121",
              colorTextBase: "#212121",
            },
            Card: {
              colorBgContainer: darkMode ? "#424242" : "#FFFFFF",
              colorBgElevated: darkMode ? "#424242" : "#FFFFFF",
            },
          },
        }}
      >
        <HappyProvider>
          <div
            className={`w-screen h-screen overflow-hidden ${
              darkMode ? "dark" : ""
            }`}
          >
            <ToastContainer />
            <RouterProvider
              router={createBrowserRouter(AppRoutes as RouteObject[])}
            />
          </div>
        </HappyProvider>
      </ConfigProvider>
    </AntApp>
  );
}

export default App;
