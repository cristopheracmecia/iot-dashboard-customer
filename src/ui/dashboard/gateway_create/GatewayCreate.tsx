import {FC, useEffect} from "react";
import {DashboardSubpageContainer} from "../../components/DashboardContainer";
import {DashboardSubpageHeader} from "../../components/DashboardHeader";
import {GatewayCreateForm} from "./components/Form";
import {toast} from "react-toastify";
import {useGatewayViewModel} from "../../../viewmodel/Gateway";
import {AppLoader} from "../../components/AppLoader";

type Props = {}
export const DashboardGatewayCreatePage: FC<Props> = ({}) => {
    const {createGateway, createGatewayState, onCreateGatewayStateReceived} = useGatewayViewModel()

    useEffect(()=> {
        if(!!createGatewayState && !createGatewayState.loading) {
            if(createGatewayState.hasError) {
                toast.error(createGatewayState.error?.message)
            } else {
                toast.success("Gateway registrado correctamente.")
            }
            onCreateGatewayStateReceived()
        }
    }, [createGatewayState])

    return <DashboardSubpageContainer className={"w-full h-full overflow-hidden"}>
        <AppLoader loading={!!createGatewayState && createGatewayState.loading}/>
        <DashboardSubpageHeader title={"Nuevo Gateway"} />
        <div className={"w-full h-full overflow-y-auto flex flex-row justify-center items-start"}>
            <div className={"max-w-md w-full p-2"}>
                <GatewayCreateForm onFinish={createGateway}/>
            </div>
        </div>
    </DashboardSubpageContainer>
}