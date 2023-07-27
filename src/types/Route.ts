import {ReactNode} from "react";
import {RouteObject} from "react-router-dom";


export type AppRoute = {
    info?: {
        icon?: ReactNode
        label?: ReactNode
        ignore?: true
    }
} & Omit<RouteObject, "children"> & {
    children?: AppRoute[]
}