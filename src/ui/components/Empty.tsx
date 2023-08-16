import {FC, PropsWithChildren} from "react";
import animationData from "../../assets/animations/animation_empty.json";
import {AppStateComponent} from "./State";

type Props = PropsWithChildren<{
    title?: string
    description: string
    animation?: unknown
}>
export const EmptyData: FC<Props> = ({title = "Lista vacía", animation = animationData, ...props}) => {
    return <AppStateComponent title={title} animation={animation} {...props}/>
}