import {Drawer, Layout} from "antd"
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
            </Drawer> : <Sider collapsible collapsed={collapsed}
                               onCollapse={(value) => setCollapsed(value)}>
                <DashboardLayoutSiderContent isMobile={isMobile} collapsed={collapsed}/>
            </Sider>
        }
        <Layout className={"h-screen w-full overflow-hidden"}>
            <DashboardLayoutHeader isMediumScreen={!isMobile} openDrawer={() => setCollapsed(true)}/>
            <Content className={"w-full h-full overflow-hidden"}>
                <Outlet/>
            </Content>
            {/*<Footer className={"flex place-content-center w-full bg-neutral-100 py-1 m-0"}>*/}
            {/*    <Typography.Text style={{padding: 0, margin: 0}} type={"secondary"}>*/}
            {/*        2023 ACME & CIA. Todos los derechos reservados.*/}
            {/*    </Typography.Text>*/}
            {/*</Footer>*/}
        </Layout>
    </Layout>
};
