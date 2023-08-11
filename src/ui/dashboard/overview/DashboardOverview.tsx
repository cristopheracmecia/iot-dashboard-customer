import {DashboardSubpageHeader} from "../../components/DashboardHeader";

import {DashboardSubpageContainer} from "../../components/DashboardContainer";


export const DashboardOverviewPage = () => {
    return (
        <DashboardSubpageContainer className={"w-full h-full overflow-hidden"}>
            <DashboardSubpageHeader title={"Resúmen"}/>
            <div className={"w-full h-full"}>
            </div>
        </DashboardSubpageContainer>
    )
}