import { FC, Fragment } from "react";
import AcmeIcon from "../../../assets/AICON.png";
import LogoAcmeWhite from "../../../assets/Logo-ACME-white.png";
import { Layout } from "antd";
import { DashboardSiderMenu } from "./Menu";

type Props = {
  collapsed: boolean;
  isMobile: boolean;
};
export const DashboardLayoutSiderContent: FC<Props> = ({
  collapsed,
  isMobile,
}) => {
  return (
    <Fragment>
      {collapsed || isMobile ? (
        <Layout.Header
          className={
            "flex bg-transparent justify-center items-center w-full overflow-hidden p-0 py-3 m-0"
          }
        >
          <img
            alt={"icon"}
            src={AcmeIcon}
            className={"h-fit w-fit object-contain max-h-full max-w-full"}
          />
        </Layout.Header>
      ) : (
        <Layout.Header
          className={
            "flex bg-transparent justify-center items-center w-full overflow-hidden p-0 py-4 m-0"
          }
        >
          <img
            alt={"icon"}
            src={LogoAcmeWhite}
            className={"h-fit w-fit object-contain max-h-full max-w-full"}
          />
        </Layout.Header>
      )}
      <DashboardSiderMenu />
    </Fragment>
  );
};
