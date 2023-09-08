import {FC, useEffect} from "react";
import {DashboardSubpageContainer} from "../../components/DashboardContainer";
import {DashboardSubpageHeader} from "../../components/DashboardHeader";
import {CustomerCreateForm} from "./components/Form";
import {toast} from "react-toastify";
import {useCustomerViewModel} from "../../../viewmodel/Customer";
import {AppLoader} from "../../components/AppLoader";

type Props = {}
export const DashboardCustomerCreatePage: FC<Props> = ({}) => {
    const {createCustomer, createCustomerState, onCreateCustomerStateReceived} = useCustomerViewModel()

    useEffect(()=> {
        if(!!createCustomerState && !createCustomerState.loading) {
            if(createCustomerState.hasError) {
                toast.error(createCustomerState.error?.message)
            } else {
                toast.success("Cliente registrado correctamente.")
            }
            onCreateCustomerStateReceived()
        }
    }, [createCustomerState])

    return <DashboardSubpageContainer className={"w-full h-full overflow-hidden"}>
        <AppLoader loading={!!createCustomerState && createCustomerState.loading}/>
        <DashboardSubpageHeader title={"Nuevo Cliente"} />
        <div className={"w-full h-full overflow-y-auto flex flex-row justify-center items-start"}>
            <div className={"max-w-md w-full p-2"}>
                <CustomerCreateForm  onFinish={createCustomer}/>
            </div>
        </div>
    </DashboardSubpageContainer>
}