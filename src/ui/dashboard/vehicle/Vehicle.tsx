import {FC, Fragment, useCallback, useEffect} from "react";
import {DashboardSubpageHeader} from "../../components/DashboardHeader";
import {useVehicleViewModel} from "../../../viewmodel/Vehicle";
import {useParams} from "react-router-dom"
import {AppLoader} from "../../components/AppLoader";
import {Button, notification} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRefresh} from "@fortawesome/free-solid-svg-icons";
import {toNumber} from "lodash";
import {VehicleDataComponent} from "./components/Data";
import {DashboardStateContainer} from "../../components/DashboardStateContainer";

type Props = {}
export const DashboardVehiclePage: FC<Props> = () => {
    const {id} = useParams()
    const {
        vehicle,
        fetchVehicleState,
        fetchVehicle,
        onFetchVehicleStateReceived
    } = useVehicleViewModel()

    const fetchVehicleData = useCallback(() => {
        void fetchVehicle(toNumber(id))
    }, [vehicle])

    useEffect(() => {
        void fetchVehicleData()
    }, [])

    useEffect(() => {
        if (!!fetchVehicleState && !fetchVehicleState.loading) {
            if (fetchVehicleState.hasError) {
                notification.error({
                    message: "Error al obtener el vehículo",
                })
            }
            onFetchVehicleStateReceived()
        }
    }, [fetchVehicleState])

    return <Fragment>
        <AppLoader loading={!!fetchVehicleState?.loading}/>
        <DashboardStateContainer state={fetchVehicleState} className={"w-full h-full overflow-hidden"}>
            <DashboardSubpageHeader title={"Vehículo"}
                                    extra={<Button.Group>
                                        <Button type={"primary"}
                                                icon={<FontAwesomeIcon icon={faRefresh}/>}
                                                onClick={fetchVehicleData}>Actualizar</Button>
                                    </Button.Group>}
            />
            <div className={"w-full h-full overflow-hidden"}>
                {vehicle ? <VehicleDataComponent vehicle={vehicle}/> : null}
            </div>
        </DashboardStateContainer>
    </Fragment>
}