import {
  NewCustomerFormData,
  UpdateCustomerFormData,
} from "../../types/Customer";
import { RemoteCustomerSource } from "../source/customer/Remote";
import { omit } from "lodash";

export class CustomerRepository {
  static async createCustomer(data: NewCustomerFormData) {
    const activity = {
      reason: data.reason,
    };
    return RemoteCustomerSource.createCustomer({
      data: omit(data, ["reason"]),
      activity,
    });
  }

  static async getCustomer(id: number) {
    return RemoteCustomerSource.getCustomer(id);
  }

  static async getCustomerList() {
    return RemoteCustomerSource.getCustomerList();
  }

  static async updateCustomer(id: number, data: UpdateCustomerFormData) {
    const activity = {
      reason: data.reason,
    };
    return RemoteCustomerSource.updateCustomer({
      data: omit(data, ["reason"]),
      activity,
      id,
    });
  }
}
