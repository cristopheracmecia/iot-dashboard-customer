import {FC, Fragment, PropsWithChildren} from "react";
import {createPortal} from "react-dom";
import {Spin, Typography} from "antd";
import {useBreakpoints} from "../hooks/Breakpoint";
import {isSm, isXs, screenIsAnyOf} from "../../utils/tailwind.screens";

type Props = {
    loading?: boolean;
};
export const AppLoader: FC<Props> = ({loading = true}) => {
    const {breakpoint} = useBreakpoints()
    const isMobile = screenIsAnyOf(breakpoint, isXs, isSm)
    return (
            <LoaderWrapper>
                {loading && !isMobile ? (
                    <div
                        className={"absolute w-full h-full bg-black bg-opacity-20 backdrop-blur-sm"}
                        style={{zIndex: 99998}}
                    />
                ) : null}
                {loading ? (
                    <div
                        className={`absolute w-full h-full bg-black bg-opacity-20 flex items-center justify-center gap-4 flex-col`}
                        style={{zIndex: 99999}}
                    >
                        <Spin size={"large"}/>
                        <Typography.Text className={"text-white"} strong>
                            Cargando...
                        </Typography.Text>
                    </div>
                ) : null}
            </LoaderWrapper>
    );
};

const LoaderWrapper: FC<PropsWithChildren> = ({children}) => {
    return createPortal(children, document.getElementById("loader_container")!);
};
