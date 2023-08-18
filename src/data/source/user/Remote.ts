import { RemoteSourceResponse } from "../../../types/Source";
import { NewUserData, UpdateUserData, User } from "../../../types/User";
import { apiService } from "../../../services/RemoteClient";
import { BaseRemoteSource } from "../base/Remote";

export class RemoteUserSource extends BaseRemoteSource {
  static async getUser(
    id: number,
  ): Promise<RemoteSourceResponse<User> | undefined> {
    try {
      const user = await apiService.postWithAuth("/user/get", { id });
      this.checkResponseCredentials(user);
      return user.data as RemoteSourceResponse<User>;
    } catch (e) {
      throw this.parseError(e);
    }
  }

  static async getUserList(): Promise<
    RemoteSourceResponse<User[]> | undefined
  > {
    try {
      const userList = await apiService.getWithAuth("/user/list");
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
      const response = await apiService.postWithAuth("/user/create", data);
      this.checkResponseCredentials(response);
      return response.data as RemoteSourceResponse;
    } catch (e) {
      throw this.parseError(e);
    }
  }

  static async updateUser(data: UpdateUserData) {
    try {
      const response = await apiService.putWithAuth("/user/update", data);
      this.checkResponseCredentials(response);
      return response.data as RemoteSourceResponse;
    } catch (e) {
      throw this.parseError(e);
    }
  }
}
