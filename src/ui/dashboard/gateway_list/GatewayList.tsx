import {FC, useCallback, useEffect} from "react";
import {DashboardSubpageContainer} from "../../components/DashboardContainer";
import {DashboardSubpageHeader} from "../../components/DashboardHeader";
import {Button} from "antd";
import {faPlus, faRefresh} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {GatewayListData} from "./components/Data";
import {useGatewayViewModel} from "../../../viewmodel/Gateway";
import {Gateway} from "../../../types/Gateway";
import {AppLoader} from "../../components/AppLoader";

export const DashboardGatewayListPage: FC = () => {
    const params = useParams<Record<string, any>>()
    const {
        fetchList, gatewayList, fetchListState, onFetchListStateReceived
    } = useGatewayViewModel()

    const fetchGatewayList = useCallback(() => {
        void fetchList(params.id)
    }, [params.id, fetchList])

    const navigate = useNavigate()

    const onNewGatewayClick = useCallback(() => {
        navigate("/dashboard/gateways/create")
    }, [navigate])

    const onItemClicked = useCallback((record: Gateway) => {

        navigate("/dashboard/gateways/" + record.id)

    }, [navigate, gatewayList])

    useEffect(() => {
        void fetchGatewayList()
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
        <DashboardSubpageHeader title={"Gateways"} subtitle={`${gatewayList?.length} gateways`} extra={<Button.Group>
            <Button type={"primary"} icon={<FontAwesomeIcon icon={faRefresh}/>}
                    onClick={fetchGatewayList}>Actualizar</Button>
            <Button type={"dashed"} icon={<FontAwesomeIcon icon={faPlus}/>} onClick={onNewGatewayClick}>Nuevo</Button>
        </Button.Group>}/>
        <div className={"w-full h-full"}>
            <GatewayListData data={gatewayList} onItemClicked={onItemClicked}/>
        </div>
    </DashboardSubpageContainer>
}