import { Vehicle } from "../../../../types/Vehicle";
import { FC, Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useVehicleDeviceViewModel } from "../../../../viewmodel/VehicleDevice";
import { Button, notification, Typography } from "antd";
import { useDeviceDataViewModel } from "../../../../viewmodel/DeviceData";
import { useGatewayViewModel } from "../../../../viewmodel/Gateway";
import { AppLoader } from "../../../components/AppLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { TabLogsFetchModal, TabLogsModalFormData } from "./TabLogsFetchModal";
import { EmptyData } from "../../../components/Empty";
import dayjs, { Dayjs } from "dayjs";
import { TabLogsDataViewer } from "./TabLogsDataViewer";
import { FullscreenToggle } from "../../../components/Fullscreen";

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

  const divRef = useRef<HTMLDivElement>(null);

  const [fetchInputData, setFetchInputData] = useState<
    TabLogsModalFormData | undefined
  >();

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
    <div className={"w-full h-full overflow-x-hidden overflow-y-auto"}>
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
            <div
              className={
                "w-full h-full relative overflow-x-hidden overflow-y-auto"
              }
            >
              {fetchDataEvent ? (
                <TabLogsFetchModal
                  initialData={fetchInputData}
                  onFinish={fetchData}
                  onCancel={onFetchDataEventCompleted}
                  gatewayList={vehicleGateway}
                  deviceList={vehicleDeviceList}
                />
              ) : null}
              <div
                className={"flex flex-row justify-between items-center mb-4"}
              >
                <Button
                  type={"primary"}
                  ghost
                  icon={<FontAwesomeIcon icon={faGear} />}
                  onClick={requestFetchDataEvent}
                >
                  Seleccionar datos
                </Button>
              </div>
              {fetchInputData ? (
                <div ref={divRef} className={"w-full overflow-x-hidden"}>
                  <div
                    className={"absolute top-0 right-0 p-3"}
                    style={{ zIndex: 999 }}
                  >
                    <FullscreenToggle containerRef={divRef} />
                  </div>
                  <TabLogsDataViewer deviceData={deviceData} />
                </div>
              ) : (
                <Typography.Text type={"secondary"}>
                  Seleccione los datos a visualizar.
                </Typography.Text>
              )}
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};
