import { useState } from "react";
import { AppState, TaskState } from "../data/domain/State";
import { NewUserFormData, UpdateUserFormData, User } from "../types/User";
import { UserRepository } from "../data/repository/User";

export function useUserViewModel() {
  const [createState, setCreateState] = useState<AppState<boolean> | null>(
    null,
  );
  const [user, setUser] = useState<User | null>(null);
  const [fetchUserState, setFetchUserState] =
    useState<AppState<boolean> | null>(null);
  const [updateState, setUpdateState] = useState<AppState<boolean> | null>();
  async function fetchUser(id: number) {
    if (fetchUserState?.loading) return;
    setFetchUserState(TaskState.loading());
    try {
      const result = await UserRepository.getUser(id);
      if (result!!.ok) {
        setUser(result!!.data!!);
        setFetchUserState(TaskState.success(true));
      } else {
        setFetchUserState(TaskState.error(new Error(result!!.message)));
      }
    } catch (e: any) {
      setFetchUserState(TaskState.error(e));
    }
  }

  function onFetchUserStateReceived() {
    setFetchUserState(null);
  }
  async function createUser(data: NewUserFormData) {
    if (createState?.loading) return;
    setCreateState(TaskState.loading());
    try {
      const res = await UserRepository.createUser(data);
      if (res!!.ok) {
        setCreateState(TaskState.success(true));
      } else {
        setCreateState(TaskState.error(new Error(res!!.message)));
      }
    } catch (e: any) {
      setCreateState(TaskState.error(e));
    }
  }

  function onCreateStateReceived() {
    setCreateState(null);
  }

  async function updateUser(data: UpdateUserFormData) {
    if (updateState?.loading) return;
    setUpdateState(TaskState.loading());
    if (!user) {
      setUpdateState(TaskState.error(new Error("Usuario no encontrado.")));
      return;
    }
    try {
      const result = await UserRepository.updateUser(user.id, data);
      if (result.ok) {
        setUpdateState(TaskState.success(true));
      } else {
        setUpdateState(TaskState.error(new Error(result.message)));
      }
    } catch (e: any) {
      setUpdateState(TaskState.error(e));
    }
  }

  function onUpdateUserStateReceived() {
    setUpdateState(null);
  }

  return {
    createState,
    createUser,
    onCreateStateReceived,
    user,
    fetchUser,
    fetchUserState,
    onFetchUserStateReceived,
    updateUser,
    updateState,
    onUpdateUserStateReceived,
  };
}
