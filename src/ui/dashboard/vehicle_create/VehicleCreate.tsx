import {FC, useEffect} from "react";
import {DashboardSubpageContainer} from "../../components/DashboardContainer";
import {DashboardSubpageHeader} from "../../components/DashboardHeader";
import {VehicleCreateForm} from "./components/Form";
import {toast} from "react-toastify";
import {useCustomerViewModel} from "../../../viewmodel/Customer";
import {useVehicleViewModel} from "../../../viewmodel/Vehicle";
import {AppLoader} from "../../components/AppLoader";

type Props = {}
export const DashboardVehicleCreatePage: FC<Props> = ({}) => {
    const {
        fetchList: fetchCustomerList,
        fetchListState: fetchCustomerListState,
        onFetchListStateReceived: onFetchCustomerListStateReceived,
        customerList
    } = useCustomerViewModel()
    const {createVehicle, createVehicleState, onCreateVehicleStateReceived} = useVehicleViewModel()
    useEffect(() => {
        if (!!fetchCustomerListState && !fetchCustomerListState.loading) {
            if (fetchCustomerListState.hasError) {
                toast.error(fetchCustomerListState.error?.message)
            }
            onFetchCustomerListStateReceived()
        }
    }, [fetchCustomerListState])

    useEffect(() => {
        if (!!createVehicleState && !createVehicleState.loading) {
            if (createVehicleState.hasError) {
                toast.error(createVehicleState.error?.message)
            } else {
                toast.success("Vehículo registrado correctamente.")
            }
            onCreateVehicleStateReceived()
        }
    }, [createVehicleState])

    useEffect(() => {
        void fetchCustomerList()
    }, [])

    return <DashboardSubpageContainer className={"w-full h-full overflow-hidden"}>
        <AppLoader
            loading={(!!fetchCustomerListState && fetchCustomerListState.loading) || (!!createVehicleState && createVehicleState.loading)}/>
        <DashboardSubpageHeader title={"Nuevo Vehículo"}/>
        <div className={"w-full h-full overflow-y-auto flex flex-row justify-center items-start"}>
            <div className={"max-w-md w-full p-2"}>
                <VehicleCreateForm customerList={customerList} onFinish={createVehicle}/>
            </div>
        </div>
    </DashboardSubpageContainer>
}