import { RemoteSourceResponse } from "../../../types/Source";
import {
  LoginData,
  PasswordRecoveryProceedData,
  PasswordRecoveryRequestData,
  PasswordRecoveryValidationData,
  PostLoginData,
  User,
} from "../../../types/User";
import { apiService } from "../../../services/RemoteClient";
import { BaseRemoteSource } from "../base/Remote";

export class RemoteAuthSource extends BaseRemoteSource {
  static async login(
    data: LoginData,
  ): Promise<RemoteSourceResponse | undefined> {
    try {
      const loginResult = await apiService.post<LoginData>(
        "/auth/customer_user/login",
        data,
      );
      return loginResult.data as RemoteSourceResponse;
    } catch (e) {
      this.parseError(e);
    }
  }

  static async logout(): Promise<RemoteSourceResponse | undefined> {
    try {
      const logoutResult = await apiService.postWithAuth(
        "/auth/customer_user/logout",
      );
      return logoutResult.data as RemoteSourceResponse;
    } catch (e) {
      this.parseError(e);
    }
  }

  static async postLogin(
    data: PostLoginData,
  ): Promise<RemoteSourceResponse | undefined> {
    try {
      const postLoginResult = await apiService.post<PostLoginData>(
        "/auth/customer_user/postlogin",
        data,
      );
      this.checkResponseCredentials(postLoginResult);
      return postLoginResult.data as RemoteSourceResponse;
    } catch (e) {
      this.parseError(e);
    }
  }

  static async sendPasswordRecoveryRequest(
    data: PasswordRecoveryRequestData,
  ): Promise<RemoteSourceResponse | undefined> {
    try {
      const passwordRequestResult =
        await apiService.post<PasswordRecoveryRequestData>(
          "/auth/customer_user/password-recovery-request",
          data,
        );
      return passwordRequestResult.data as RemoteSourceResponse;
    } catch (e) {
      this.parseError(e);
    }
  }

  static async validatePasswordRecoveryToken(
    data: PasswordRecoveryValidationData,
  ): Promise<RemoteSourceResponse | undefined> {
    try {
      const validationResult =
        await apiService.post<PasswordRecoveryValidationData>(
          "/auth/customer_user/password-recovery-validation",
          data,
        );
      return validationResult.data as RemoteSourceResponse;
    } catch (e) {
      this.parseError(e);
    }
  }

  static async proceedPasswordRecovery(
    data: PasswordRecoveryProceedData,
  ): Promise<RemoteSourceResponse | undefined> {
    try {
      const resetResult = await apiService.post<PasswordRecoveryProceedData>(
        "/auth/customer_user/password-recovery-proceed",
        data,
      );
      return resetResult.data as RemoteSourceResponse;
    } catch (e) {
      this.parseError(e);
    }
  }

  static async getSession(): Promise<RemoteSourceResponse<User> | undefined> {
    try {
      const sessionResult = await apiService.postWithAuth(
        "/auth/customer_user/get-session",
      );
      this.checkResponseCredentials(sessionResult);
      return sessionResult.data as RemoteSourceResponse<User>;
    } catch (e) {
      this.parseError(e);
    }
  }
}
