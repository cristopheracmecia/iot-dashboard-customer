import {FC, HTMLProps, PropsWithChildren} from "react";

type Props = PropsWithChildren<{
    className?: HTMLProps<HTMLDivElement>["className"]
    style?: HTMLProps<HTMLDivElement>["style"]
}>
export const DashboardSubpageContainer: FC<Props> = ({style, className, children}) => {
    return <div className={`w-full h-full py-4 px-2 md:px-4 flex flex-col ${className}`}
                style={style}>
        {children}
    </div>
}