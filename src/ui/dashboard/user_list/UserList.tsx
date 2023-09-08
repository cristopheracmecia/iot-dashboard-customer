import { FC, useCallback, useEffect } from "react";
import { DashboardSubpageContainer } from "../../components/DashboardContainer";
import { DashboardSubpageHeader } from "../../components/DashboardHeader";
import { Button } from "antd";
import { faPlus, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserListViewModel } from "../../../viewmodel/UserList";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserListData } from "./components/Data";
import { User } from "../../../types/User";
import { AppLoader } from "../../components/AppLoader";

export const DashboardUserListPage: FC = () => {
  const { fetchList, fetchState, userList, onFetchStateReceived } =
    useUserListViewModel();
  const navigate = useNavigate();

  const onNewUserClick = useCallback(() => {
    navigate("/dashboard/users/create");
  }, [navigate]);

  const onDataItemClick = useCallback(
    (item: User) => {
      navigate("/dashboard/users/all/" + item.id);
    },
    [navigate, userList],
  );

  useEffect(() => {
    void fetchList();
  }, []);

  useEffect(() => {
    if (!fetchState?.loading) {
      if (fetchState?.hasError) {
        toast.error(fetchState?.error?.message);
      } else {
        console.log(userList);
      }
      onFetchStateReceived();
    }
  }, [fetchState]);

  return (
    <DashboardSubpageContainer className={"w-full h-full overflow-hidden"}>
      <AppLoader loading={!!fetchState && fetchState.loading} />
      <DashboardSubpageHeader
        title={"Usuarios"}
        subtitle={userList?.length + " usuarios"}
        extra={
          <Button.Group>
            <Button
              type={"primary"}
              icon={<FontAwesomeIcon icon={faRefresh} />}
              onClick={fetchList}
            >
              Actualizar
            </Button>
            <Button
              type={"dashed"}
              icon={<FontAwesomeIcon icon={faPlus} />}
              onClick={onNewUserClick}
            >
              Nuevo
            </Button>
          </Button.Group>
        }
      />
      <div className={"w-full h-full overflow-y-auto"}>
        <UserListData onItemClicked={onDataItemClick} data={userList} />
      </div>
    </DashboardSubpageContainer>
  );
};
