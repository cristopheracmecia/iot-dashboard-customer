import { FC, useCallback, useEffect } from "react";
import { DashboardSubpageHeader } from "../../components/DashboardHeader";
import { useUserViewModel } from "../../../viewmodel/User";
import { useNavigate, useParams } from "react-router-dom";
import { Button, notification } from "antd";
import { AppLoader } from "../../components/AppLoader";
import { DashboardStateContainer } from "../../components/DashboardStateContainer";
import { ProDescriptions } from "@ant-design/pro-components";
import dayjs, { Dayjs } from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRefresh } from "@fortawesome/free-solid-svg-icons";

export const DashboardUserPage: FC = () => {
  const { id } = useParams();
  const { user, fetchUserState, fetchUser, onFetchUserStateReceived } =
    useUserViewModel();
  const navigate = useNavigate();

  const onEditClicked = useCallback(() => {
    navigate("/dashboard/users/edit/" + id);
  }, [navigate]);
  const fetchUserData = () => {
    void fetchUser(Number(id));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (!!fetchUserState && !fetchUserState.loading) {
      if (fetchUserState.hasError) {
        notification.error({
          message: "Error al obtener el usuario",
        });
      }
      onFetchUserStateReceived();
    }
  }, [fetchUserState]);
  return (
    <DashboardStateContainer
      state={fetchUserState}
      className={"w-full h-full overflow-hidden"}
    >
      <AppLoader loading={!!fetchUserState && fetchUserState.loading} />
      <DashboardSubpageHeader
        title={"Usuario"}
        subtitle={`@${user?.username}`}
        extra={[
          <Button.Group>
            <Button
              type={"primary"}
              icon={<FontAwesomeIcon icon={faRefresh} />}
              onClick={fetchUserData}
            >
              Actualizar
            </Button>
            <Button
              type={"primary"}
              onClick={onEditClicked}
              icon={<FontAwesomeIcon icon={faEdit} />}
            >
              Editar
            </Button>
          </Button.Group>,
        ]}
      />
      <ProDescriptions className={"md:m-4"}>
        <ProDescriptions.Item label={"ID"}>{user?.id}</ProDescriptions.Item>
        <ProDescriptions.Item label={"Nombre de usuario"}>
          {user?.username}
        </ProDescriptions.Item>
        <ProDescriptions.Item label={"Nombre(s)"}>
          {user?.name}
        </ProDescriptions.Item>
        <ProDescriptions.Item label={"Apellido(s)"}>
          {user?.lastname}
        </ProDescriptions.Item>
        <ProDescriptions.Item label={"Email Principal"}>
          {user?.corporateEmail}
        </ProDescriptions.Item>
        <ProDescriptions.Item label={"Email Secundario"}>
          {user?.email || "No registrado."}
        </ProDescriptions.Item>
        <ProDescriptions.Item label={"Cumpleaños"}>
          {!!user?.birthDate
            ? dayjs(user?.createdAt!!).format("DD/MM/YYYY")
            : "No registrado."}
        </ProDescriptions.Item>
        <ProDescriptions.Item label={"Creación"}>
          {!!user?.createdAt
            ? dayjs(user?.createdAt!!).format("DD/MM/YYYY HH:mm:ss")
            : "No registrado."}
        </ProDescriptions.Item>
        <ProDescriptions.Item label={"DNI"}>{user?.dni}</ProDescriptions.Item>
        <ProDescriptions.Item label={"Cargo"}>
          {user?.Role?.label || "No registrado."}
        </ProDescriptions.Item>
        <ProDescriptions.Item label={"Estado"}>
          {user?.enabled ? "Usuario habilitado" : "Usuario deshabilitado"}
        </ProDescriptions.Item>
      </ProDescriptions>
    </DashboardStateContainer>
  );
};
