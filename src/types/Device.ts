import { Unit } from "./Unit";

export type Device = {
  id: number;
  key: string;
  description: string;
  unitId: number;
  Unit: Unit;
  updatedAt: string;
  createdAt: string;
  schema: string;
  chart: string;
  defaultKey?: string;
};