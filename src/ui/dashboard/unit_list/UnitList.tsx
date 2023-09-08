import {FC, useCallback, useEffect} from "react";
import {DashboardSubpageContainer} from "../../components/DashboardContainer";
import {DashboardSubpageHeader} from "../../components/DashboardHeader";
import {Button} from "antd";
import {faPlus, faRefresh} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {UnitListData} from "./components/Data";
import {useUnitViewModel} from "../../../viewmodel/Unit";
import {Unit} from "../../../types/Unit";
import {AppLoader} from "../../components/AppLoader";

export const DashboardUnitListPage: FC = () => {
    const {
        fetchList, unitList, fetchListState, onFetchListStateReceived
    } = useUnitViewModel()

    const navigate = useNavigate()

    const onNewUnitClick = useCallback(() => {
        navigate("/dashboard/units/create")
    }, [])

    useEffect(() => {
        void fetchList()
    }, [])

    const onItemClicked = useCallback((record: Unit) => {
        navigate("/dashboard/units/" + record.id)
    } , [unitList, navigate])

    useEffect(() => {
        if (!fetchListState?.loading) {
            if (fetchListState?.hasError) {
                toast.error(fetchListState?.error?.message)
            }
            onFetchListStateReceived()
        }
    }, [fetchListState])

    return <DashboardSubpageContainer className={"w-full h-full overflow-hidden"}>
        <AppLoader loading={(!!fetchListState && fetchListState.loading)}/>
        <DashboardSubpageHeader title={"Unidades"} extra={<Button.Group>
            <Button type={"primary"} icon={<FontAwesomeIcon icon={faRefresh}/>}
                    onClick={fetchList}>Actualizar</Button>
            <Button type={"dashed"} icon={<FontAwesomeIcon icon={faPlus}/>} onClick={onNewUnitClick}>Nuevo</Button>
        </Button.Group>}/>
        <div className={"w-full h-full"}>
            <UnitListData data={unitList} onItemClicked={onItemClicked}/>
        </div>
    </DashboardSubpageContainer>
}