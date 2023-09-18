import { RemoteSourceResponse } from "../../../types/Source";
import { NewUserData, UpdateUserData, User } from "../../../types/User";
import { apiService } from "../../../services/RemoteClient";
import { BaseRemoteSource } from "../base/Remote";

export class RemoteUserSource extends BaseRemoteSource {
  static async getUser(
    id: number,
  ): Promise<RemoteSourceResponse<User> | undefined> {
    try {
      const user = await apiService.postWithAuth("/customer_user/get", { id });
      this.checkResponseCredentials(user);
      return user.data as RemoteSourceResponse<User>;
    } catch (e) {
      throw this.parseError(e);
    }
  }

  static async getUserList(customerId: number): Promise<
    RemoteSourceResponse<User[]> | undefined
  > {
    try {
      const userList = await apiService.postWithAuth("/customer_user/list", {customerId});
      this.checkResponseCredentials(userList);
      return userList.data as RemoteSourceResponse<User[]>;
    } catch (e) {
      throw this.parseError(e);
    }
  }

  static async createUser(
    data: NewUserData,
  ): Promise<RemoteSourceResponse | undefined> {
    try {
      const response = await apiService.postWithAuth("/customer_user/create", data);
      this.checkResponseCredentials(response);
      return response.data as RemoteSourceResponse;
    } catch (e) {
      throw this.parseError(e);
    }
  }

  static async updateUser(data: UpdateUserData) {
    try {
      const response = await apiService.putWithAuth("/customer_user/update", data);
      this.checkResponseCredentials(response);
      return response.data as RemoteSourceResponse;
    } catch (e) {
      throw this.parseError(e);
    }
  }
}
