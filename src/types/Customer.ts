import { ActivityData } from "./App";

export type Customer = {
  id: number;
  businessName: string;
  ruc: string;
  subdomain: string;
  createdAt: string;
  updatedAt: string;
  address: string;
  postalCode: string;
  enabled: boolean;
  endAt: string;
};

export type NewCustomerFormData = {
  businessName: string;
  ruc: string;
  address?: string;
  postalCode?: string;
  subdomain: string;
  reason: string;
};

export type NewCustomer = ActivityData<Omit<NewCustomerFormData, "reason">>;

export type UpdateCustomerFormData = {
  address?: string;
  postalCode?: string;
  enabled?: boolean;
  endAt?: string;
  reason: string;
};

export type UpdateCustomer = ActivityData<
  Omit<UpdateCustomerFormData, "reason">,
  {
    id: number;
  }
>;
