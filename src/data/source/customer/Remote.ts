import {RemoteSourceResponse, UpdateResult} from "../../../types/Source";
import {apiService} from "../../../services/RemoteClient";
import {BaseRemoteSource} from "../base/Remote";
import {Customer, NewCustomer, UpdateCustomer} from "../../../types/Customer";

export class RemoteCustomerSource extends BaseRemoteSource {
    static async createCustomer(data: NewCustomer): Promise<RemoteSourceResponse<Customer>> {
        try {
            const response = await apiService.postWithAuth("/customer/create", data);
            this.checkResponseCredentials(response);
            return response.data as RemoteSourceResponse<Customer>;
        } catch (e) {
            throw this.parseError(e)
        }
    }

    static async getCustomer(id: number): Promise<RemoteSourceResponse<Customer>> {
        try {
            const customer = await apiService.postWithAuth("/customer/get", {id});
            this.checkResponseCredentials(customer);
            return customer.data as RemoteSourceResponse<Customer>;
        } catch (e) {
            throw this.parseError(e)
        }
    }

    static async getCustomerList(): Promise<RemoteSourceResponse<Array<Customer>>> {
        try {
            const customerList = await apiService.getWithAuth("/customer/list");
            this.checkResponseCredentials(customerList);
            return customerList.data as RemoteSourceResponse<Array<Customer>>;
        } catch (e) {
           throw this.parseError(e)
        }
    }

    static async updateCustomer(data: UpdateCustomer) {
        try {
            const response = await apiService.putWithAuth("/customer/update", data)
            this.checkResponseCredentials(response)
            return response.data as RemoteSourceResponse<UpdateResult<Customer>>
        } catch (e) {
            throw this.parseError(e)
        }
    }
}