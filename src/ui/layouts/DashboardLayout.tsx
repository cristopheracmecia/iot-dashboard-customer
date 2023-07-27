import {Drawer, Layout, Typography} from "antd"
import {FC, useState} from "react";
import {Outlet} from "react-router-dom";
import {DashboardLayoutSiderContent} from "./components/Sider";
import {DashboardLayoutHeader} from "./components/Header";
import {useBreakpoints} from "../hooks/Breakpoint";
import {isSm, isMd, isLg, isXl, is2Xl, screenIsAnyOf} from "../../utils/tailwind.screens";

const {Content, Footer, Sider} = Layout
export const DashboardLayout: FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const {breakpoint} = useBreakpoints()
    const atLeastMedium = screenIsAnyOf(breakpoint, isSm, isMd, isLg, isXl, is2Xl)
    return <Layout className={"w-screen h-screen overflow-hidden bg-white"}>
        {
            atLeastMedium ? <Sider collapsible collapsed={collapsed}
                                   onCollapse={(value) => setCollapsed(value)}>
                <DashboardLayoutSiderContent collapsed={collapsed}/>
            </Sider> : <Drawer bodyStyle={{
                padding: 0, margin: 0
            }} placement="left" onClose={() => {
                setCollapsed(false)
            }} open={collapsed}>
                <DashboardLayoutSiderContent collapsed={collapsed}/>
            </Drawer>
        }
        <Layout>
            <DashboardLayoutHeader isMediumScreen={atLeastMedium} openDrawer={() => setCollapsed(true)}/>
            <Content>
                <Outlet/>
            </Content>
            <Footer className={"flex place-content-center w-full bg-neutral-100 py-1 m-0"}>
                <Typography.Text  style={{padding:0, margin: 0}} type={"secondary"}>
                    2023 ACME & CIA. Todos los derechos reservados.
                </Typography.Text>
            </Footer>
        </Layout>
    </Layout>
};
