import {FC, useEffect} from "react";
import {DashboardSubpageContainer} from "../../components/DashboardContainer";
import {DashboardSubpageHeader} from "../../components/DashboardHeader";
import {UnitCreateForm} from "./components/Form";
import {toast} from "react-toastify";
import {useAppLoader} from "../../hooks/Loading";
import {useUnitViewModel} from "../../../viewmodel/Unit";

type Props = {}
export const DashboardUnitCreatePage: FC<Props> = ({}) => {
    const {createUnit, createUnitState, onCreateUnitStateReceived} = useUnitViewModel()

    useEffect(() => {
        if (!!createUnitState && !createUnitState.loading) {
            if (createUnitState.hasError) {
                toast.error(createUnitState.error?.message)
            } else {
                toast.success("Unidad registrada correctamente.")
            }
            onCreateUnitStateReceived()
        }
    }, [createUnitState])

    useAppLoader([createUnitState])

    return <DashboardSubpageContainer className={"w-full h-full overflow-hidden"}>
        <DashboardSubpageHeader title={"Nueva Unidad"}/>
        <div className={"w-full h-full overflow-y-auto flex flex-row justify-center items-start"}>
            <div className={"max-w-md w-full p-2"}>
                <UnitCreateForm onFinish={createUnit}/>
            </div>
        </div>
    </DashboardSubpageContainer>
}