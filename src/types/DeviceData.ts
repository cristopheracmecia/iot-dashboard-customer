import { Device } from "./Device";

export type DeviceData = {
  id: number;
  deviceKey: string;
  gatewayKey: string;
  value: object;
  updatedAt: string;
  createdAt: string;
};

export type VehicleDeviceData = {
  device: Device;
  data: DeviceData[];
};
