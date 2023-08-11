import {FC, useCallback, useEffect} from "react";
import {DashboardSubpageContainer} from "../../components/DashboardContainer";
import {DashboardSubpageHeader} from "../../components/DashboardHeader";
import {Button} from "antd";
import {faPlus, faRefresh} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast} from "react-toastify";
import {useAppLoader} from "../../hooks/Loading";
import {useNavigate} from "react-router-dom";
import {useDeviceViewModel} from "../../../viewmodel/Device";
import {DeviceListData} from "./components/Data";
import {Device} from "../../../types/Device";

export const DashboardDeviceListPage: FC = () => {
    const {
        fetchList, deviceList, fetchListState, onFetchListStateReceived
    } = useDeviceViewModel()

    const navigate = useNavigate()

    const onNewDeviceClick = useCallback(() => {
        navigate("/dashboard/devices/create")
    }, [])

    const onItemClicked = useCallback((record: Device) => {
        navigate(`/dashboard/devices/${record.id}`)
    }, [deviceList, navigate])

    useAppLoader([fetchListState])

    useEffect(() => {
        void fetchList()
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
        <DashboardSubpageHeader title={"Dispositivos"} extra={<Button.Group>
            <Button type={"primary"} icon={<FontAwesomeIcon icon={faRefresh}/>}
                    onClick={fetchList}>Actualizar</Button>
            <Button type={"dashed"} icon={<FontAwesomeIcon icon={faPlus}/>} onClick={onNewDeviceClick}>Nuevo</Button>
        </Button.Group>}/>
        <div className={"w-full h-full"}>
            <DeviceListData data={deviceList} onItemClicked={onItemClicked}/>
        </div>
    </DashboardSubpageContainer>
}