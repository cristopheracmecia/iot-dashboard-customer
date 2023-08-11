import {RemoteUserSource} from "../source/user/Remote";
import {NewUserData} from "../../types/User";

export class UserRepository {
    static async getUserList() {
        return await RemoteUserSource.getUserList()
    }

    static async createUser(data: NewUserData) {
        return await RemoteUserSource.createUser(data)
    }
}