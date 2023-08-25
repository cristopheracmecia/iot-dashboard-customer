import {FC, useEffect, useState} from "react";
import {Modal, Typography} from "antd";
import {User} from "../../../types/User";
import {AuthRepository} from "../../../data/repository/Auth";
import {ProDescriptions} from "@ant-design/pro-components";
import {faEnvelope, faUser, faAt, faPersonThroughWindow} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Props = {
    onClose: () => void
}
export const UserModal: FC<Props> = ({onClose}) => {
    const [user, setUser] = useState<User | undefined>()
    useEffect(() => {
        setUser(AuthRepository.getCurrentUser())
    }, [])
    return <Modal open={true} onCancel={onClose} okText={"Cerrar Sesión"} okButtonProps={{
        icon: <FontAwesomeIcon icon={faPersonThroughWindow}/>,
        onClick: () => AuthRepository.logout()
    }}>
        <div className={"flex flex-col"}>
            <div className={"flex flex-col"}>
                <Typography.Title className={"p-0 m-0"} level={5}>{user?.name + " " + user?.lastname}</Typography.Title>
            </div>
            <ProDescriptions size={"small"} colon={false} layout={"vertical"} column={{
                xs: 1, lg: 1, md: 1, xxl: 1, sm: 1, xl: 1
            }}>
                <ProDescriptions.Item span={2} label={<span><FontAwesomeIcon icon={faAt}/> Nombre de Usuario</span>}>
                    {user?.username}
                </ProDescriptions.Item>
                <ProDescriptions.Item span={2} label={<span><FontAwesomeIcon icon={faUser}/> ID</span>}>
                    {user?.id}
                </ProDescriptions.Item>
                <ProDescriptions.Item span={2} label={<span><FontAwesomeIcon icon={faUser}/> Nombre(s)</span>}>
                    {user?.name}
                </ProDescriptions.Item>
                <ProDescriptions.Item span={2} label={<span><FontAwesomeIcon icon={faUser}/> Apellidos</span>}>
                    {user?.lastname}
                </ProDescriptions.Item>
                <ProDescriptions.Item span={2} label={<span><FontAwesomeIcon icon={faEnvelope}/> Correo Electrónico Principal</span>}>
                    {user?.corporateEmail}
                </ProDescriptions.Item>
                <ProDescriptions.Item
                    label={<span><FontAwesomeIcon icon={faEnvelope}/> Correo Electrónico Secundario</span>}>
                    {user?.email || "No registrado"}
                </ProDescriptions.Item>
            </ProDescriptions>
        </div>

    </Modal>
}