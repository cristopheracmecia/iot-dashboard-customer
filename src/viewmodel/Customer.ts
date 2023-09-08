import { useState } from "react";
import { AppState, TaskState } from "../data/domain/State";
import { CustomerRepository } from "../data/repository/Customer";
import {
  Customer,
  NewCustomerFormData,
  UpdateCustomerFormData,
} from "../types/Customer";
import { useLoaderData } from "react-router-dom";

export function useCustomerViewModel() {
  const [fetchListState, setFetchListState] =
    useState<AppState<boolean> | null>(null);
  const [customerList, setCustomerList] = useState<Customer[] | null>(null);
  const [createCustomerState, setCreateCustomerState] =
    useState<AppState<boolean> | null>(null);
  const [updateCustomerState, setUpdateCustomerState] =
    useState<AppState<boolean> | null>(null);
  const [fetchCustomerState, setFetchCustomerState] =
    useState<AppState<boolean> | null>(null);
  const [customer, setCustomer] = useState<Customer | null>();
  async function fetchList() {
    if (fetchListState?.loading) return;
    setFetchListState(TaskState.loading());
    try {
      const list = await CustomerRepository.getCustomerList();
      if (list.ok) {
        setCustomerList(list.data!!);
        setFetchListState(TaskState.success(true));
      } else setFetchListState(TaskState.error(new Error(list.message!!)));
    } catch (error: any) {
      setFetchListState(TaskState.error(error));
    }
  }

  function onFetchListStateReceived() {
    setFetchListState(null);
  }

  async function createCustomer(customer: NewCustomerFormData) {
    if (createCustomerState?.loading) return;
    setCreateCustomerState(TaskState.loading());
    try {
      const newCustomer = await CustomerRepository.createCustomer(customer);
      if (newCustomer.ok) {
        setCreateCustomerState(TaskState.success(true));
        setCustomerList([...(customerList ?? []), newCustomer.data!!]);
      } else {
        setCreateCustomerState(
          TaskState.error(new Error(newCustomer.message!!)),
        );
      }
    } catch (error: any) {
      setCreateCustomerState(TaskState.error(error));
    }
  }

  function onCreateCustomerStateReceived() {
    setCreateCustomerState(null);
  }

  async function updateCustomer(data: UpdateCustomerFormData) {
    if (updateCustomerState?.loading) return;
    setUpdateCustomerState(TaskState.loading());
    if (!customer) {
      setUpdateCustomerState(
        TaskState.error(new Error("Cliente no encontrado.")),
      );
      return;
    }
    setUpdateCustomerState(TaskState.loading());
    try {
      const updatedCustomer = await CustomerRepository.updateCustomer(
        customer!!.id,
        data,
      );
      if (updatedCustomer.ok) {
        setUpdateCustomerState(TaskState.success(true));
        const newList =
          customerList?.filter((c) => c.id !== updatedCustomer.data!!.old.id) ??
          [];
        setCustomerList([...newList, updatedCustomer.data!!.data]);
      } else {
        setUpdateCustomerState(
          TaskState.error(new Error(updatedCustomer.message!!)),
        );
      }
    } catch (e: any) {
      setUpdateCustomerState(TaskState.error(e));
    }
  }

  function onUpdateCustomerStateReceived() {
    setUpdateCustomerState(null);
  }

  async function fetchCustomer(id: number) {
    if (fetchCustomerState?.loading) return;
    setFetchCustomerState(TaskState.loading());
    try {
      const customer = await CustomerRepository.getCustomer(id);
      if (customer.ok) {
        setFetchCustomerState(TaskState.success(true));
        setCustomer(customer.data!!);
      } else {
        setFetchCustomerState(TaskState.error(new Error(customer.message!!)));
      }
    } catch (e: any) {
      setFetchCustomerState(TaskState.error(e));
    }
  }

  function onFetchCustomerStateReceived() {
    setFetchCustomerState(null);
  }

  return {
    fetchListState,
    customerList,
    fetchList,
    onFetchListStateReceived,
    createCustomerState,
    createCustomer,
    onCreateCustomerStateReceived,
    updateCustomerState,
    updateCustomer,
    onUpdateCustomerStateReceived,
    fetchCustomerState,
    fetchCustomer,
    onFetchCustomerStateReceived,
    customer,
  };
}
