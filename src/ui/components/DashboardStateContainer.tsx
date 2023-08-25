import {FC, useEffect, useState} from "react";
import {AppState} from "../../data/domain/State";
import {DashboardSubpageContainer, DashboardSubpageContainerProps} from "./DashboardContainer";
import {AppStateComponent} from "./State";
import {Skeleton} from "antd";

type Props = {
    state?: AppState<any> | null
} & DashboardSubpageContainerProps
export const DashboardStateContainer : FC<Props> = ({state, children, ...props}) => {
    const [lastState, setLastState] = useState<AppState<any> | undefined>(undefined)

    useEffect(() => {
        if(!!state) setLastState(state)
    }, [state])

    return !!lastState?.hasError ? <AppStateComponent title={"Ocurrió un error"} description={lastState.error?.message!!} /> : <DashboardSubpageContainer {...props} >
        {!!lastState?.loading ? <Skeleton active/> : children}
    </DashboardSubpageContainer>
}