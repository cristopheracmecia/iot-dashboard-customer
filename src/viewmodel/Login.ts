import { useState } from "react";
import { AppState, TaskState } from "../data/domain/State";
import { LoginData, PostLoginData } from "../types/User";
import { AuthRepository } from "../data/repository/Auth";

export function useLoginViewModel() {
  const [loginState, setLoginState] = useState<AppState<boolean> | null>(null);
  const [postLoginState, setPostLoginState] =
    useState<AppState<boolean> | null>(null);
  const [resendCodeState, setResendCodeState] =
    useState<AppState<boolean> | null>(null);
  const [loginDataSnapshot, setLoginDataSnapshot] = useState<LoginData | null>(
    null
  );

  async function login(data: LoginData) {
    setLoginDataSnapshot(data);
    setLoginState(TaskState.loading());
    try {
      await AuthRepository.login(data);
      setLoginState(TaskState.success(true));
    } catch (e: any) {
      setLoginState(TaskState.error(e));
    }
  }

  function onLoginStateReceived() {
    setLoginState(null);
  }

  async function verificateCode(data: PostLoginData) {
    setPostLoginState(TaskState.loading());
    try {
      await AuthRepository.postLogin(data);
      setPostLoginState(TaskState.success(true));
    } catch (e: any) {
      setPostLoginState(TaskState.error(e));
    }
  }

  function onPostLoginStateReceived() {
    setPostLoginState(null);
  }

  async function resendCode() {
    setResendCodeState(TaskState.loading());
    const data = loginDataSnapshot;
    if (data === null || !data) {
      setResendCodeState(
        TaskState.error(
          new Error("La sesión no es válida. Inicia sesión nuevamente.")
        )
      );
    } else {
      try {
        await AuthRepository.login(data);
        setResendCodeState(TaskState.success(true));
      } catch (e: any) {
        setResendCodeState(TaskState.error(e));
      }
    }
  }

  function onResendCodeStateReceived() {
    setResendCodeState(null);
  }

  return {
    loginState,
    postLoginState,
    login,
    onLoginStateReceived,
    verificateCode,
    onPostLoginStateReceived,
    onResendCodeStateReceived,
    resendCodeState,
    resendCode,
  };
}
