import {
  LoginData,
  PasswordRecoveryProceedData,
  PasswordRecoveryRequestData,
  PasswordRecoveryValidationData,
  PostLoginData,
  User,
} from "../../types/User";
import { RemoteAuthSource } from "../source/auth/Remote";
import { clearTokens } from "../../utils/Token";

export class AuthRepository {
  private static user?: User;

  static async login(data: LoginData) {
    return await RemoteAuthSource.login(data);
  }

  static async postLogin(data: PostLoginData) {
    await RemoteAuthSource.postLogin(data);
  }

  static async sendPasswordRecoveryRequest(data: PasswordRecoveryRequestData) {
    return await RemoteAuthSource.sendPasswordRecoveryRequest(data);
  }

  static async validatePasswordRecoveryToken(
    data: PasswordRecoveryValidationData,
  ) {
    return await RemoteAuthSource.validatePasswordRecoveryToken(data);
  }

  static async proceedPasswordRecovery(data: PasswordRecoveryProceedData) {
    return await RemoteAuthSource.proceedPasswordRecovery(data);
  }

  static async getSession() {
    const remoteResult = await RemoteAuthSource.getSession();
    if (remoteResult?.data) this.user = remoteResult.data;
    return remoteResult;
  }

  static getCurrentUser() {
    return this.user;
  }

  static async logout() {
    await RemoteAuthSource.logout();
    clearTokens();
    window.location.reload();
  }
}
