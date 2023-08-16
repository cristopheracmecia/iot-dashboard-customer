import {FC, PropsWithChildren} from "react";
import {createPortal} from "react-dom";
import {Spin, Typography} from "antd";


type Props = {
    loading?: boolean
}
export const AppLoader: FC<Props> = ({loading = true}) => {
    return <LoaderWrapper>
        {
            loading ? <div
                className={`absolute z-50 w-full h-full bg-black bg-opacity-20 flex items-center justify-center gap-4 flex-col`}>
                <Spin size={"large"}/>
                <Typography.Text className={"text-white"} strong>Cargando...</Typography.Text>
            </div> : null
        }
    </LoaderWrapper>
}

const LoaderWrapper: FC<PropsWithChildren> = ({children}) => {
    return createPortal(children, document.getElementById("loader_container")!)
}