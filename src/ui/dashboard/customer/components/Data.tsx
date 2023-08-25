import { FC, useMemo, useState } from "react";
import { Tabs, TabsProps } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserGroup,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { useBreakpoints } from "../../../hooks/Breakpoint";
import { isSm, isXs, screenIsAnyOf } from "../../../../utils/tailwind.screens";
import { CustomerMainTab } from "./TabMain";
import { CustomerVehiclesTab } from "./TabVehicles";
import { Customer } from "../../../../types/Customer";
import { CustomerUsersTab } from "./TabUsers";

type Props = {
  customer: Customer;
};

const items: TabsProps["items"] = [
  {
    key: "main",
    label: (
      <span>
        <FontAwesomeIcon icon={faHome} /> Principal
      </span>
    ),
  },
  {
    key: "vehicles",
    label: (
      <span>
        <FontAwesomeIcon icon={faTruck} /> Vehículos
      </span>
    ),
  },
  {
    key: "users",
    label: (
      <span>
        <FontAwesomeIcon icon={faUserGroup} /> Usuarios
      </span>
    ),
  },
];

export const CustomerDataComponent: FC<Props> = ({ customer }) => {
  const [selectedKey, setSelectedKey] = useState<string>("main");
  const { breakpoint } = useBreakpoints();
  const isMobile = screenIsAnyOf(breakpoint, isXs, isSm);

  const Element = useMemo(() => {
    switch (selectedKey) {
      case "main":
        return <CustomerMainTab customer={customer} />;
      case "vehicles":
        return <CustomerVehiclesTab customer={customer} />;
      case "users":
        return <CustomerUsersTab customer={customer} />;
      default:
        return null;
    }
  }, [selectedKey]);

  return (
    <div className={"w-full h-full overflow-hidden flex flex-col md:flex-row"}>
      <Tabs
        tabPosition={isMobile ? "top" : "left"}
        defaultActiveKey={"main"}
        items={items}
        rootClassName={"h-fit w-full md:h-full md:w-fit"}
        onChange={(key) => {
          setSelectedKey(key);
        }}
      />
      {Element}
    </div>
  );
};
