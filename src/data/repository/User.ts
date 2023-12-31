import { RemoteUserSource } from "../source/user/Remote";
import { NewUserFormData, UpdateUserFormData } from "../../types/User";
import { omit } from "lodash";
import {AuthRepository} from "./Auth";

export class UserRepository {
  static async getUserList() {
    console.log(AuthRepository.getCurrentUser())
    return await RemoteUserSource.getUserList(AuthRepository.getCurrentUser()!!.Customer.id);
  }

  static async getUser(id: number) {
    return await RemoteUserSource.getUser(id);
  }

  static async updateUser(id: number, data: UpdateUserFormData) {
    const activity = {
      reason: data.reason,
    };
    return await RemoteUserSource.updateUser({
      activity,
      id,
      data: omit(data, ["reason"]),
    });
  }
  static async createUser(data: NewUserFormData) {
    return await RemoteUserSource.createUser({
      data: {
        name: data.name,
        birthDate: data.birthDate,
        dni: data.dni,
        email: data.email,
        corporateEmail: data.corporateEmail,
        lastname: data.lastname,
        password: data.password,
        roleId: data.roleId,
        username: data.username,
      },
      activity: {
        reason: data.reason,
      },
    });
  }
}
