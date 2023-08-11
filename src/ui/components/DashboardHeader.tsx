import {FC, ReactNode} from "react";
import {Typography} from "antd";
import {useBreakpoints} from "../hooks/Breakpoint";
import {isSm, isXs, screenIsAnyOf} from "../../utils/tailwind.screens";

type Props = {
    title: string
    subtitle?: string
    extra?: ReactNode
}
export const DashboardSubpageHeader: FC<Props> = ({title, extra, subtitle}) => {
    const {breakpoint} = useBreakpoints()
    const isMobile = screenIsAnyOf(breakpoint, isXs, isSm)
    return <div className={`w-full pt-2 md:py-4 px-2 md:px-4 flex flex-col sm:flex-row flex-wrap`}>
            <div className={"flex flex-col"}>
                <Typography.Title level={isMobile ? 5 : 3}>{title}</Typography.Title>
                {subtitle ? <Typography.Text type={"secondary"}>{subtitle}</Typography.Text> : null}
            </div>
            <div className={"h-fit w-fit flex place-items-center place-content-center ml-auto"}>
                {extra}
            </div>
        </div>
}