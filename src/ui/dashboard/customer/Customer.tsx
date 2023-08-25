import { FC, Fragment, useCallback, useEffect } from "react";
import { DashboardSubpageHeader } from "../../components/DashboardHeader";
import { useNavigate, useParams } from "react-router-dom";
import { Button, notification } from "antd";
import { AppLoader } from "../../components/AppLoader";
import { DashboardStateContainer } from "../../components/DashboardStateContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useCustomerViewModel } from "../../../viewmodel/Customer";
import { CustomerDataComponent } from "./components/Data";

export const DashboardCustomerPage: FC = () => {
  const { id } = useParams();
  const {
    customer,
    fetchCustomerState,
    fetchCustomer,
    onFetchCustomerStateReceived,
  } = useCustomerViewModel();
  const navigate = useNavigate();

  const onEditClicked = useCallback(() => {
    navigate("/dashboard/customers/edit/" + id);
  }, [navigate]);
  const fetchCustomerData = () => {
    void fetchCustomer(Number(id));
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  useEffect(() => {
    if (!!fetchCustomerState && !fetchCustomerState.loading) {
      if (fetchCustomerState.hasError) {
        notification.error({
          message: "Error al obtener el cliente.",
        });
      }
      onFetchCustomerStateReceived();
    }
  }, [fetchCustomerState]);

  return (
    <Fragment>
      <AppLoader loading={!!fetchCustomerState?.loading} />
      <DashboardStateContainer
        state={fetchCustomerState}
        className={"w-full h-full overflow-hidden"}
      >
        <DashboardSubpageHeader
          title={"Cliente"}
          extra={
            <Button.Group>
              <Button
                type={"primary"}
                icon={<FontAwesomeIcon icon={faRefresh} />}
                onClick={fetchCustomerData}
              >
                Actualizar
              </Button>
              <Button
                type={"primary"}
                icon={<FontAwesomeIcon icon={faEdit} />}
                onClick={onEditClicked}
              >
                Editar
              </Button>
            </Button.Group>
          }
        />
        <div className={"w-full h-full overflow-hidden"}>
          {customer ? <CustomerDataComponent customer={customer} /> : null}
        </div>
      </DashboardStateContainer>
    </Fragment>
  );
};
