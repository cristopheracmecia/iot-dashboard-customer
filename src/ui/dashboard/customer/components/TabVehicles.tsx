import { FC, MouseEventHandler, useCallback, useEffect } from "react";
import { Button, Card, notification, Typography } from "antd";
import { EmptyData } from "../../../components/Empty";
import { AppLoader } from "../../../components/AppLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faRefresh, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Customer } from "../../../../types/Customer";
import { useVehicleViewModel } from "../../../../viewmodel/Vehicle";
import { useNavigate } from "react-router-dom";

type Props = {
  customer: Customer;
};

export const CustomerVehiclesTab: FC<Props> = ({ customer }) => {
  const navigate = useNavigate();

  const { vehicleList, onFetchListStateReceived, fetchListState, fetchList } =
    useVehicleViewModel();

  const fetchCustomerVehicleList = useCallback(() => {
    void fetchList(customer.id);
  }, [customer]);

  useEffect(() => {
    void fetchCustomerVehicleList();
  }, []);

  useEffect(() => {
    if (!!fetchListState && !fetchListState.loading) {
      if (fetchListState.hasError) {
        notification.error({
          message: "Ocurrió un error al obtener los vehículos.",
        });
      }
      onFetchListStateReceived();
    }
  }, [fetchListState]);

  const onAddClicked = useCallback(() => {
    navigate("/dashboard/vehicles/create/" + customer.id);
  }, [navigate]);

  const onCardClicked: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const index = Number(event.currentTarget.dataset.index);
      const vehicle = vehicleList!![index];
      navigate("/dashboard/vehicles/" + vehicle.id);
    },
    [navigate, vehicleList],
  );

  return (
    <div className={"w-full h-full overflow-x-hidden overflow-y-auto"}>
      <AppLoader loading={!!fetchListState?.loading} />
      <Typography.Title level={5}>Vehículos</Typography.Title>
      <Typography.Text>
        Vehículos disponibles para este cliente.
      </Typography.Text>
      <Button.Group className={"block my-2"}>
        <Button
          type={"primary"}
          onClick={fetchCustomerVehicleList}
          ghost
          icon={<FontAwesomeIcon icon={faRefresh} />}
        >
          Actualizar
        </Button>
        <Button
          onClick={onAddClicked}
          type={"primary"}
          ghost
          icon={<FontAwesomeIcon icon={faAdd} />}
        >
          Agregar
        </Button>
      </Button.Group>
      <div className={"overflow-y-auto"}>
        {!!vehicleList && vehicleList.length > 0 ? (
          vehicleList.map((vehicle, index) => (
            <Card
              onClick={onCardClicked}
              data-index={index}
              size={"small"}
              key={`device-${index}`}
              className={"my-2"}
            >
              <Card.Meta
                title={vehicle.name}
                avatar={
                  <Button
                    type={"primary"}
                    shape={"circle"}
                    ghost
                    icon={<FontAwesomeIcon icon={faTrash} />}
                  />
                }
                description={vehicle.description}
              />
            </Card>
          ))
        ) : (
          <EmptyData
            description={"No hay dispositivos agregados al vehículo."}
          />
        )}
      </div>
    </div>
  );
};
