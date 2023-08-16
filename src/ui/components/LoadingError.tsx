import {FC} from "react";
import {Divider, Typography} from "antd";
import {useAsyncError, useRouteError} from "react-router-dom";
import {AppStateComponent} from "./State";

type Props = {
    title?: string
    description?: string
}
export const LoadingError: FC<Props> = ({title, description}) => {
    const error1 = useRouteError() as any
    const error2 = useAsyncError() as any
    const error = error1 ?? error2
    return <AppStateComponent title={title ?? "Error"} description={description ?? error?.message ?? "Ha ocurrido un error"}/>
}