import { RemoteCustomerSource } from "../source/customer/Remote";

export class CustomerRepository {

  static async getCustomer(id: number) {
    return RemoteCustomerSource.getCustomer(id);
  }

}
