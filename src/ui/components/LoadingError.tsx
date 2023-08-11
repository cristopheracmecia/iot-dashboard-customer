import {FC} from "react";
import {Divider, Typography} from "antd";
import {useRouteError} from "react-router-dom";

type Props = {
    title?: string
    description?: string
}
export const LoadingError: FC<{ error: Error }> = ({error}) => {
    const error = useRouteError()
    return
}