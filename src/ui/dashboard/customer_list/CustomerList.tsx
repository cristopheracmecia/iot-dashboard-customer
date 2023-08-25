import { FC, useCallback, useEffect } from "react";
import { DashboardSubpageContainer } from "../../components/DashboardContainer";
import { DashboardSubpageHeader } from "../../components/DashboardHeader";
import { Button } from "antd";
import { faPlus, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { useAppLoader } from "../../hooks/Loading";
import { useNavigate } from "react-router-dom";
import { useCustomerViewModel } from "../../../viewmodel/Customer";
import { CustomerListData } from "./components/Data";
import { Customer } from "../../../types/Customer";

export const DashboardCustomerListPage: FC = () => {
  const { fetchList, customerList, fetchListState, onFetchListStateReceived } =
    useCustomerViewModel();
  const navigate = useNavigate();

  const onNewCustomerClick = useCallback(() => {
    navigate("/dashboard/customers/create");
  }, [navigate]);

  const onItemClicked = useCallback(
    (item: Customer) => {
      navigate(`/dashboard/customers/all/${item.id}`);
    },
    [navigate, customerList],
  );
  useAppLoader([fetchListState]);

  useEffect(() => {
    void fetchList();
  }, []);

  useEffect(() => {
    if (!fetchListState?.loading) {
      if (fetchListState?.hasError) {
        toast.error(fetchListState?.error?.message);
      } else {
        console.log(customerList);
      }
      onFetchListStateReceived();
    }
  }, [fetchListState]);

  return (
    <DashboardSubpageContainer className={"w-full h-full overflow-hidden"}>
      <DashboardSubpageHeader
        title={"Clientes"}
        subtitle={`${customerList?.length} clientes`}
        extra={
          <Button.Group>
            <Button
              type={"primary"}
              icon={<FontAwesomeIcon icon={faRefresh} />}
              onClick={fetchList}
            >
              Actualizar
            </Button>
            <Button
              type={"dashed"}
              icon={<FontAwesomeIcon icon={faPlus} />}
              onClick={onNewCustomerClick}
            >
              Nuevo
            </Button>
          </Button.Group>
        }
      />
      <div className={"w-full h-full"}>
        <CustomerListData data={customerList} onItemClicked={onItemClicked} />
      </div>
    </DashboardSubpageContainer>
  );
};
