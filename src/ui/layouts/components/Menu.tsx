import { FC } from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  appRouteAsMenuItem,
  determineCurrentRoute,
  determineCurrentRouteFullPath,
} from "../../../utils/Layout";
import { AppRoutes } from "../../../utils/Routes";

export const DashboardSiderMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const rPath = determineCurrentRouteFullPath(pathname).filter(
    (it) => !it.info?.ignore,
  );
  const selectedPath =
    rPath && rPath.length > 0
      ? rPath[rPath.length - 1].path!!
      : determineCurrentRoute(pathname)!!.path!!;
  return (
    <Menu
      theme={"light"}
      onSelect={(info) => {
        navigate(info.key);
      }}
      selectedKeys={[selectedPath]}
      mode="inline"
      items={AppRoutes.filter((it) => it.path === "/dashboard")[0]
        .children!!.filter((it) => !it.info?.ignore)
        .map((it) => appRouteAsMenuItem(it)!!)}
    />
  );
};
