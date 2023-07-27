import {FC, Fragment} from "react";
import AcmeIcon from "../../../assets/AICON.png";
import LogoAcmeWhite from "../../../assets/Logo-ACME-white.png";
import {Layout} from "antd"
import {DashboardSiderMenu} from "./Menu";

type Props = {
    collapsed: boolean
}
export const DashboardLayoutSiderContent: FC<Props> = ({collapsed}) => {
    return <Fragment>
        {collapsed ? (
                <Layout.Header className={"flex justify-center items-center w-full overflow-hidden p-0 py-3 m-0"}>
                    <img alt={"icon"} src={AcmeIcon} className={"h-fit w-fit object-contain max-h-full max-w-full"}/>
                </Layout.Header>
            ) :
            (<div className={"flex justify-center items-center"}>
                <img alt={"logo"} src={LogoAcmeWhite} className={"px-10 py-10 h-fit w-fit object-contain max-h-full max-w-full"}/>
            </div>)}
        <DashboardSiderMenu/>
    </Fragment>
}