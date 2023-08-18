import { MenuProps, BreadcrumbProps } from "antd";
import { AppRoute } from "../types/Route";
import { Fragment } from "react";
import { AppRoutes } from "./Routes";

type MenuItem = Required<MenuProps>["items"][number];
type BreadcrumbItem = Required<BreadcrumbProps>["items"][number];

export function appRouteAsMenuItem(route: AppRoute): MenuItem | undefined {
  const { path, children, info } = route;
  if (info?.ignore) return undefined;
  const cRoutes: Array<AppRoute | undefined> | undefined = children
    ? children.filter((it) => !!it && !it.info?.ignore)
    : undefined;
  const nChildren = (
    cRoutes
      ? cRoutes
          .map((it) => (it ? appRouteAsMenuItem(it) : undefined))
          .filter((it) => !!it)
      : undefined
  ) as Array<MenuItem> | undefined;
  if (!!nChildren && nChildren.length >= 1) {
    return {
      key: path || "/",
      icon: info?.icon,
      label: info?.label,
      children: nChildren,
    };
  } else {
    return {
      key: path || "/",
      icon: info?.icon,
      label: info?.label,
    };
  }
}

export function appRouteAsBreadcrumbItem(route: AppRoute): BreadcrumbItem {
  const { path, info } = route;
  return {
    key: path,
    href: path,
    title: (
      <Fragment>
        {info?.icon} {info?.label}
      </Fragment>
    ),
  };
}

export function determineCurrentRoutePath(keyOrPath: string): AppRoute[] {
  const result: Array<AppRoute> = determineCurrentRouteFullPath(keyOrPath);
  result.pop();
  return result;
}

export function determineCurrentRouteFullPath(keyOrPath: string): AppRoute[] {
  const result: Array<AppRoute> = [];
  let parts = keyOrPath.split("/");
  parts.splice(0, 1);
  if (parts.length <= 1) return result;
  let base: Array<AppRoute> | undefined = AppRoutes;
  for (let i = 0; i < parts.length; i++) {
    const absolutePath = `/${parts.slice(0, i + 1).join("/")}`;
    if (!!base) {
      const presult: Array<AppRoute> | undefined = base.filter(
        (it) => it.path === absolutePath,
      );
      if (!!presult && presult.length !== 0) {
        result.push(presult[0]);
        base = presult[0].children;
      }
    }
  }
  return result;
}

export function determineCurrentRoute(keyOrPath: string): AppRoute | undefined {
  let parts = keyOrPath.split("/");
  parts.splice(0, 1);
  let base: Array<AppRoute> | undefined = AppRoutes;
  for (let i = 0; i < parts.length; i++) {
    const absolutePath = `/${parts.slice(0, i + 1).join("/")}`;
    if (!!base) {
      const presult: Array<AppRoute> | undefined = base.filter(
        (it) => it.path === absolutePath,
      );
      if (!!presult && presult.length !== 0) {
        if (i === parts.length - 1) {
          return presult[0];
        }
        base = presult[0].children;
      }
    }
  }
  return undefined;
}
