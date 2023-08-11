import {FC, PropsWithChildren} from "react";
import {Divider, Typography} from "antd";
import {useLottie} from "lottie-react";
import animationData from "../../assets/animations/animation_empty.json";

type Props = PropsWithChildren<{
    title?: string
    description: string
    animation?: unknown
}>
export const AppState: FC<Props> = ({description, children, title = "Lista vacía", animation = animationData}) => {
    const {View} = useLottie({
        loop: true, animationData: animation, style: {
            width: 200,
            height: 200,
        }
    })
    return <div className={"flex flex-col justify-center items-center"}>
        <Divider className={"mt-0 pt-0"}/>
        {View}
        <Typography.Title level={4}>{title}</Typography.Title>
        <Typography.Text type={"secondary"}>{description}</Typography.Text>
        {children && <div className={"mt-4"}>{children}</div>}
        <Divider className={"mb-0 pb-0"}/>
    </div>
}