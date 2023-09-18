import {RemoteSourceResponse} from "../../../types/Source";
import {apiService} from "../../../services/RemoteClient";
import {BaseRemoteSource} from "../base/Remote";
import {Customer} from "../../../types/Customer";

export class RemoteCustomerSource extends BaseRemoteSource {

    static async getCustomer(id: number): Promise<RemoteSourceResponse<Customer>> {
        try {
            const customer = await apiService.postWithAuth("/customer/get", {id});
            this.checkResponseCredentials(customer);
            return customer.data as RemoteSourceResponse<Customer>;
        } catch (e) {
            throw this.parseError(e)
        }
    }
}