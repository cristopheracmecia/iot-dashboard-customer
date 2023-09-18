import {FC, useCallback, useEffect} from "react";
import {DashboardSubpageContainer} from "../../components/DashboardContainer";
import {DashboardSubpageHeader} from "../../components/DashboardHeader";
import {Button} from "antd";
import {faPlus, faRefresh} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {VehicleListData} from "./components/Data";
import {useVehicleViewModel} from "../../../viewmodel/Vehicle";
import {Vehicle} from "../../../types/Vehicle";
import {AppLoader} from "../../components/AppLoader";

export const DashboardVehicleListPage: FC = () => {
    const {
        fetchList, vehicleList, fetchListState, onFetchListStateReceived
    } = useVehicleViewModel()

    const fetchVehicleList = useCallback(() => {
        void fetchList()
    }, [fetchList])

    const navigate = useNavigate()

    const onItemClicked = useCallback((record: Vehicle) => {

        navigate("/dashboard/vehicles/" + record.id)

    }, [navigate, vehicleList])

    useEffect(() => {
        void fetchVehicleList()
    }, [])

    useEffect(() => {
        if (!fetchListState?.loading) {
            if (fetchListState?.hasError) {
                toast.error(fetchListState?.error?.message)
            }
            onFetchListStateReceived()
        }
    }, [fetchListState])

    return <DashboardSubpageContainer className={"w-full h-full overflow-hidden"}>
        <AppLoader loading={!!fetchListState && fetchListState.loading}/>
        <DashboardSubpageHeader title={"Vehículos"} subtitle={`${vehicleList?.length} vehículos`} extra={<Button.Group>
            <Button type={"primary"} icon={<FontAwesomeIcon icon={faRefresh}/>}
                    onClick={fetchVehicleList}>Actualizar</Button>
        </Button.Group>}/>
        <div className={"w-full h-full"}>
            <VehicleListData data={vehicleList} onItemClicked={onItemClicked}/>
        </div>
    </DashboardSubpageContainer>
}