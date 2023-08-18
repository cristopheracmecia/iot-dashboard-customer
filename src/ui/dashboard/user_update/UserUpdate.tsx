import { FC, useEffect, useState } from "react";
import { DashboardSubpageHeader } from "../../components/DashboardHeader";
import { UserUpdateForm } from "./components/Form";
import { useUserViewModel } from "../../../viewmodel/User";
import { DashboardStateContainer } from "../../components/DashboardStateContainer";
import { AppLoader } from "../../components/AppLoader";
import { EmptyData } from "../../components/Empty";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, notification } from "antd";
import { useFormValidation } from "../../hooks/Validation";
import Yup from "yup";
import { User } from "../../../types/User";
export const DashboardUserUpdatePage: FC = () => {
  const navigate = useNavigate();
  const {
    user,
    updateUser,
    updateState,
    onUpdateUserStateReceived,
    onFetchUserStateReceived,
    fetchUser,
    fetchUserState,
  } = useUserViewModel();
  const { id } = useParams();
  const [reasonVisible, setReasonVisible] = useState<boolean>(false);
  const [toUpdateData, setToUpdateData] = useState<Partial<User>>();
  const { updateData, formData, errors, valid } = useFormValidation<{
    reason: string;
  }>(
    Yup.object({
      reason: Yup.string()
        .required("Se req información sobre el reciente cambio realizado en la plataforma.")
        .min(16, "Se requieren al menos 16 caracteres."),
    }),
    { reason: "" },
  );
  useEffect(() => {
    void fetchUser(Number(id));
  }, []);

  useEffect(() => {}, [updateState]);

  useEffect(() => {
    if (!!fetchUserState && !fetchUserState.loading) {
      if (fetchUserState.hasError) {
        notification.error({
          message:
            fetchUserState.error?.message || "Error al obtener el usuario",
        });
      }
      onFetchUserStateReceived();
    }
  }, [fetchUserState]);

  useEffect(() => {
    if (!!updateState && !updateState.loading) {
      if (updateState.hasError) {
        notification.error({
          message:
            updateState.error?.message || "Error al actualizar el usuario",
        });
      } else {
        notification.success({
          message: "Usuario actualizado con éxito",
        });
        navigate(-1);
      }
      onUpdateUserStateReceived();
    }
  }, [updateState]);

  return (
    <DashboardStateContainer
      state={fetchUserState}
      className={"w-full h-full overflow-hidden"}
    >
      <AppLoader
        loading={
          (!!fetchUserState && fetchUserState.loading) ||
          (!!updateState && updateState.loading)
        }
      />
      <DashboardSubpageHeader title={"Actualizar Usuario"} />
      <div
        className={
          "w-full h-full overflow-y-auto flex flex-row justify-center items-start"
        }
      >
        <div className={"max-w-full w-full p-2"}>
          {user ? (
            <UserUpdateForm
              user={user}
              onFinish={(data) => {
                if (valid) void updateUser({ ...data, ...formData });
                else setReasonVisible(true);
              }}
            />
          ) : (
            <EmptyData description={"Usuario no encontrado"} title={"Error"} />
          )}
        </div>
      </div>
      {reasonVisible && (
        <Modal onCancel={() => setReasonVisible(false)} title={""}></Modal>
      )}
    </DashboardStateContainer>
  );
};
