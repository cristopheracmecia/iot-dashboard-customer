import {RemoteSourceResponse} from "../../../types/Source";
import {
    User
} from "../../../types/User";
import {apiService} from "../../../services/RemoteClient";
import {BaseRemoteSource} from "../base/Remote";

export class RemoteUserSource extends BaseRemoteSource {
    static async getUser(id: number): Promise<RemoteSourceResponse<User>> {
        const user = await apiService.postWithAuth("/user/get");
        this.checkResponseCredentials(user);
        return user.data as RemoteSourceResponse<User>;
    }

    static async getUserList(): Promise<RemoteSourceResponse<User[]>> {
        const userList = await apiService.getWithAuth("/user/list");
        this.checkResponseCredentials(userList);
        return userList.data as RemoteSourceResponse<User[]>;
    }
}