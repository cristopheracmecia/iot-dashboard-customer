import {Vehicle} from "../../../../types/Vehicle";
import {FC, useCallback, useEffect} from "react";
import {useGatewayViewModel} from "../../../../viewmodel/Gateway";
import {Button, Card, notification, Typography} from "antd";
import {AppLoader} from "../../../components/AppLoader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faRefresh, faTrash} from "@fortawesome/free-solid-svg-icons";
import {EmptyData} from "../../../components/Empty";

type Props = {
    vehicle: Vehicle
}

export const VehicleGatewayTab: FC<Props> = ({vehicle}) => {
    const {
        fetchGatewayState,
        fetchVehicleGateway,
        onFetchGatewayStateReceived,
        fetchList,
        fetchListState,
        gatewayList,
        vehicleGateway,
        onFetchListStateReceived,
    } = useGatewayViewModel()
    useEffect(() => {
        if (!!fetchGatewayState && !fetchGatewayState?.loading) {
            if (fetchGatewayState.hasError) {
                notification.error({
                    message: fetchGatewayState.error?.message
                })
            }
            onFetchGatewayStateReceived()
        }
    }, [fetchGatewayState])

    useEffect(() => {
        if (!!fetchListState && !fetchListState?.loading) {
            if (fetchListState.hasError) {
                notification.error({
                    message: fetchListState.error?.message
                })
            }
            onFetchListStateReceived()
        }
    }, [fetchListState])


    const fetchVehicleGatewayList = useCallback(() => {
        void fetchVehicleGateway(vehicle.id)
    }, [vehicle])

    useEffect(() => {
        void fetchVehicleGatewayList()
    }, [])

    return (
        <div className={"w-full h-full overflow-x-hidden overflow-y-auto"}>
            <AppLoader
                loading={!!fetchGatewayState?.loading || !!fetchListState?.loading }/>
            <Typography.Title level={5}>Gateway</Typography.Title>
            <Typography.Text>Verifique el gateway ubicado en este vehículo</Typography.Text>
            <Button.Group className={"block my-2"}>
                <Button type={"primary"} onClick={fetchVehicleGatewayList} ghost
                        icon={<FontAwesomeIcon icon={faRefresh}/>}>Actualizar</Button>
            </Button.Group>
            <div className={"overflow-y-auto"}>
                {
                    !!vehicleGateway && vehicleGateway.length > 0 ? vehicleGateway.map((gateway, index) => (
                        <Card size={"small"} key={index} className={"my-2"}>
                            <Card.Meta description={gateway.description} title={gateway.key}
                                       avatar={<Button type={"primary"} shape={"circle"} ghost
                                                       icon={<FontAwesomeIcon icon={faTrash}/>}/>}/>
                        </Card>
                    )) : <EmptyData description={"No hay gateways en el vehículo."}/>
                }
            </div>
        </div>
    )
}