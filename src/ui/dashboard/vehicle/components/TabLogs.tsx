import { Vehicle } from "../../../../types/Vehicle";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { useVehicleDeviceViewModel } from "../../../../viewmodel/VehicleDevice";
import { Button, notification } from "antd";
import { useDeviceDataViewModel } from "../../../../viewmodel/DeviceData";
import { useGatewayViewModel } from "../../../../viewmodel/Gateway";
import { AppLoader } from "../../../components/AppLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { TabLogsFetchModal, TabLogsModalFormData } from "./TabLogsFetchModal";
import { EmptyData } from "../../../components/Empty";
import dayjs, { Dayjs } from "dayjs";
import { TabLogsDataViewer } from "./TabLogsDataViewer";

type Props = {
  vehicle: Vehicle;
};

export const VehicleLogsTab: FC<Props> = ({ vehicle }) => {
  const {
    fetchState,
    fetchDeviceData,
    deviceData,
    onFetchStateReceived,
    fetchDataEvent,
    requestFetchDataEvent,
    onFetchDataEventCompleted,
  } = useDeviceDataViewModel();
  const {
    fetchList,
    onFetchListStateReceived,
    vehicleDeviceList,
    fetchListState,
  } = useVehicleDeviceViewModel();
  const {
    fetchVehicleGateway,
    fetchGatewayState,
    onFetchGatewayStateReceived,
    vehicleGateway,
  } = useGatewayViewModel();

  const [fetchInputData, setFetchInputData] = useState<TabLogsModalFormData>({
    deviceKey: [],
    dateRange: [dayjs().startOf("day"), dayjs().endOf("day")],
  });

  useEffect(() => {
    void fetchList(vehicle.id);
    void fetchVehicleGateway(vehicle.id);
  }, []);

  useEffect(() => {
    if (!!fetchListState && !fetchListState.loading) {
      if (fetchListState.hasError) {
        notification.error({
          message: "Error al obtener los dispositivos.",
          description: fetchListState.error?.message,
        });
      }
      onFetchListStateReceived();
    }
  }, [fetchListState]);

  useEffect(() => {
    if (!!fetchGatewayState && !fetchGatewayState.loading) {
      if (fetchGatewayState.hasError) {
        notification.error({
          message: "Error al obtener el gateway.",
          description: fetchGatewayState.error?.message,
        });
      }
      onFetchGatewayStateReceived();
    }
  }, [fetchGatewayState]);

  useEffect(() => {
    if (!!fetchState && !fetchState.loading) {
      if (fetchState.hasError) {
        notification.error({
          message: "Error al obtener los datos.",
          description: fetchState.error?.message,
        });
      }
      onFetchStateReceived();
    }
  }, [fetchState]);

  const fetchData = useCallback(
    (formData: TabLogsModalFormData) => {
      setFetchInputData(formData);
      const { deviceKey, dateRange, gatewayKey } = formData;
      void fetchDeviceData(
        gatewayKey!!,
        deviceKey!!,
        dateRange!![0].toDate(),
        dateRange!![1].toDate(),
      );
    },
    [setFetchInputData],
  );

  return (
    <div
      className={
        "w-full h-full overflow-x-hidden overflow-y-auto flex flex-col justify-start items-start gap-2"
      }
    >
      <AppLoader
        loading={
          (!!fetchListState && fetchListState.loading) ||
          (!!fetchGatewayState && fetchGatewayState.loading) ||
          (!!fetchState && fetchState.loading)
        }
      />
      {!vehicleGateway || vehicleGateway.length === 0 ? (
        <EmptyData
          description={"El vehículo no está vinculado a ningún gateway."}
        />
      ) : (
        <Fragment>
          {!vehicleDeviceList || vehicleDeviceList.length === 0 ? (
            <EmptyData
              description={
                "No se han registrado dispositivos para este vehículo."
              }
            />
          ) : (
            <Fragment>
              <div className={"w-full flex flex-col gap-2"}>
                {fetchDataEvent ? (
                  <TabLogsFetchModal
                    initialData={fetchInputData}
                    onFinish={fetchData}
                    onCancel={onFetchDataEventCompleted}
                    gatewayList={vehicleGateway}
                    deviceList={vehicleDeviceList}
                  />
                ) : null}
                <Button
                  type={"primary"}
                  ghost
                  icon={<FontAwesomeIcon icon={faGear} />}
                  onClick={requestFetchDataEvent}
                >
                  Seleccionar datos
                </Button>
                <TabLogsDataViewer
                  devices={vehicleDeviceList}
                  deviceData={deviceData}
                />
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};
