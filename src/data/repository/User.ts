import {RemoteUserSource} from "../source/user/Remote";

export class UserRepository {
    static async getUserList() {
        return await RemoteUserSource.getUserList()
    }
}