import {Drawer, Layout, Typography} from "antd"
import {FC, useState} from "react";
import {Outlet} from "react-router-dom";
import {DashboardLayoutSiderContent} from "./components/Sider";
import {DashboardLayoutHeader} from "./components/Header";
import {useBreakpoints} from "../hooks/Breakpoint";
import {isSm, screenIsAnyOf, isXs} from "../../utils/tailwind.screens";

const {Content, Footer, Sider} = Layout
export const DashboardLayout: FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const {breakpoint} = useBreakpoints()
    const isMobile = screenIsAnyOf(breakpoint, isXs, isSm)
    return <Layout className={"w-screen h-screen overflow-hidden bg-white"}>
        {
            isMobile ? <Drawer bodyStyle={{
                padding: 0, margin: 0
            }} placement="left" onClose={() => {
                setCollapsed(false)
            }} open={collapsed}>
                <DashboardLayoutSiderContent isMobile={isMobile} collapsed={collapsed}/>
            </Drawer> : <Sider theme={"light"}  collapsible collapsed={collapsed}
                               onCollapse={(value) => setCollapsed(value)}>
                <DashboardLayoutSiderContent isMobile={isMobile} collapsed={collapsed}/>
            </Sider>
        }
        <Layout className={"h-screen w-full overflow-hidden"}>
            <DashboardLayoutHeader isMediumScreen={!isMobile} openDrawer={() => setCollapsed(true)}/>
            <Content className={"w-full h-full overflow-hidden flex flex-col"}>
                <Outlet/>
                <Footer className={"flex place-content-center w-full bg-transparent py-1 m-0"}>
                    <Typography.Text style={{padding: 0, margin: 0}} type={"secondary"}>
                        2023 ACME & CIA. Todos los derechos reservados.
                    </Typography.Text>
                </Footer>
            </Content>
        </Layout>
    </Layout>
};
