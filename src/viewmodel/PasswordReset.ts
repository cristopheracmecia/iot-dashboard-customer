import { useState } from "react";
import { AppState, TaskState } from "../data/domain/State";
import {
  PasswordRecoveryProceedData,
  PasswordRecoveryValidationData,
} from "../types/User";
import { AuthRepository } from "../data/repository/Auth";

export function usePasswordResetViewModel() {
  const [validationState, setValidationState] =
    useState<AppState<boolean> | null>(null);

  const [proceedChangeState, setProceedChangeState] =
    useState<AppState<boolean> | null>(null);
  async function validateToken(data: PasswordRecoveryValidationData) {
    if(validationState?.loading) return
    setValidationState(TaskState.loading());
    try {
      await AuthRepository.validatePasswordRecoveryToken(data);
      setValidationState(TaskState.success(true));
    } catch (e: any) {
      setValidationState(TaskState.error(e));
    }
  }

  function onValidationStateReceived() {
    setValidationState(null);
  }

  async function proceedPasswordReset(data: PasswordRecoveryProceedData) {
    setProceedChangeState(TaskState.loading());
    try {
      await AuthRepository.proceedPasswordRecovery(data);
      setProceedChangeState(TaskState.success(true));
    } catch (e: any) {
      setProceedChangeState(TaskState.error(e));
    }
  }

  function onProceedChangeStateReceived() {
    setProceedChangeState(null);
  }

  return {
    validationState,
    proceedChangeState,
    validateToken,
    onValidationStateReceived,
    proceedPasswordReset,
    onProceedChangeStateReceived,
  };
}
