import { useState } from "react";
import { AppState, TaskState } from "../data/domain/State";
import { PasswordRecoveryRequestData } from "../types/User";
import { AuthRepository } from "../data/repository/Auth";

export function useRecoveryRequestViewModel() {
  const [requestState, setRequestState] = useState<AppState<boolean> | null>(
    null
  );
  async function sendRequest(data: PasswordRecoveryRequestData) {
    setRequestState(TaskState.loading());
    try {
      await AuthRepository.sendPasswordRecoveryRequest(data);
      setRequestState(TaskState.success(true));
    } catch (e: any) {
      setRequestState(TaskState.error(e));
    }
  }

  function onRequestStateReceived() {
    setRequestState(null);
  }

  return {
    requestState,
    sendRequest,
    onRequestStateReceived,
  };
}
