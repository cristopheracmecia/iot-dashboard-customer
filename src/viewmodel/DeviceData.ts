import { useState } from "react";
import { AppState, TaskState } from "../data/domain/State";
import { DeviceDataRepository } from "../data/repository/DeviceData";
import { VehicleDeviceData } from "../types/DeviceData";

export function useDeviceDataViewModel() {
  const [fetchState, setFetchState] = useState<AppState<boolean> | null>(null);
  const [deviceData, setDeviceData] = useState<Array<VehicleDeviceData> | null>(
    null,
  );
  const [fetchDataEvent, setFetchDataEvent] = useState<boolean | null>(null);

  async function fetchDeviceData(
    gatewayKey: string,
    deviceKey: string[],
    dateStart: Date,
    dateEnd: Date,
  ) {
    if (fetchState?.loading) return;
    setFetchState(TaskState.loading());
    try {
      const list = await DeviceDataRepository.getDeviceDataList(
        gatewayKey,
        deviceKey,
        dateStart,
        dateEnd,
      );
      if (list.ok) {
        setDeviceData(list.data!!);
        setFetchState(TaskState.success(true));
      } else setFetchState(TaskState.error(new Error(list.message!!)));
    } catch (error: any) {
      setFetchState(TaskState.error(error));
    }
  }

  function requestFetchDataEvent() {
    setFetchDataEvent(true);
  }

  function onFetchDataEventCompleted() {
    setFetchDataEvent(null);
  }

  function onFetchStateReceived() {
    setFetchState(null);
  }

  return {
    fetchState,
    deviceData,
    fetchDeviceData,
    onFetchStateReceived,
    requestFetchDataEvent,
    fetchDataEvent,
    onFetchDataEventCompleted,
  };
}
