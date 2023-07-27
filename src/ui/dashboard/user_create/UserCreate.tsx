import {FC} from "react";
import {DashboardSubpageContainer} from "../../components/DashboardContainer";
import {DashboardSubpageHeader} from "../../components/DashboardHeader";
import {UserCreateForm} from "./components/Form";

type Props = {}
export const DashboardUserCreatePage: FC<Props> = ({}) => {
    return <DashboardSubpageContainer>
        <DashboardSubpageHeader title={"Nuevo Usuario"}/>
        <UserCreateForm />
    </DashboardSubpageContainer>
}