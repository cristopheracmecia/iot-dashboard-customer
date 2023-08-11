import {FC} from "react";
import {DashboardSubpageContainer} from "../../components/DashboardContainer";
import {DashboardSubpageHeader} from "../../components/DashboardHeader";
import {useVehicleViewModel} from "../../../viewmodel/Vehicle";

type Props = {}
export const DashboardVehiclePage: FC<Props> = () => {

    const {createVehicle, createVehicleState, onCreateVehicleStateReceived, vehicle} = useVehicleViewModel()

    console.log(vehicle)

    return <DashboardSubpageContainer className={"w-full h-full overflow-hidden"}>
        <DashboardSubpageHeader title={"Vehículo"} />
        <div className={"w-full h-full overflow-y-auto flex flex-row justify-center items-start"}>
            <div className={"max-w-md w-full p-2"}>
            </div>
        </div>
    </DashboardSubpageContainer>
}