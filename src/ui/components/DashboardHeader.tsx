import {FC, ReactNode} from "react";
import {Typography} from "antd";

type Props = {
    title: string
    extra ?: ReactNode
}
export const DashboardSubpageHeader : FC<Props> = ({title, extra}) => {
    return <div className={"w-full py-4 px-2 md:px-4 flex flex-col sm:flex-row flex-wrap gap-3"}>
        <Typography.Title level={3}>{title}</Typography.Title>
        <div className={"h-fit w-fit flex place-items-center place-content-center ml-auto"}>
            {extra}
        </div>
    </div>
}