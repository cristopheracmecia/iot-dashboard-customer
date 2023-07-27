import {FC} from "react";
import {Menu} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {appRouteAsMenuItem} from "../../../utils/Layout";
import {AppRoutes} from "../../../utils/Routes";


export const DashboardSiderMenu: FC = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    return <Menu className={"h-full overflow-auto"} theme={"dark"} onSelect={(info) => {
        navigate(info.key)
    }} selectedKeys={[pathname]} mode="inline"
                 items={AppRoutes.filter(it => it.path === "/dashboard")[0].children!!.filter(it => !it.info?.ignore).map(it => appRouteAsMenuItem(it))}/>
}