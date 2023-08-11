import {RemoteSourceResponse} from "../../../types/Source";
import {
    NewUserData,
    User
} from "../../../types/User";
import {apiService} from "../../../services/RemoteClient";
import {BaseRemoteSource} from "../base/Remote";

export class RemoteUserSource extends BaseRemoteSource {
    static async getUser(id: number): Promise<RemoteSourceResponse<User> | undefined> {
        try {
            const user = await apiService.postWithAuth("/user/get");
            this.checkResponseCredentials(user);
            return user.data as RemoteSourceResponse<User>;
        } catch (e) {
            this.parseError(e)
        }
    }

    static async getUserList(): Promise<RemoteSourceResponse<User[]> | undefined> {
        try {
            const userList = await apiService.getWithAuth("/user/list");
            this.checkResponseCredentials(userList);
            return userList.data as RemoteSourceResponse<User[]>;
        } catch (e) {
            this.parseError(e)
        }
    }

    static async createUser(data: NewUserData) : Promise<RemoteSourceResponse | undefined> {
        try {
            const response = await apiService.postWithAuth("/user/create", data)
            this.checkResponseCredentials(response)
            return response.data as RemoteSourceResponse
        } catch (e) {
            this.parseError(e)
        }
    }
}