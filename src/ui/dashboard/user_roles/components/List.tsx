import {FC, MouseEventHandler} from "react";
import {GridChildComponentProps} from "react-window"
import {Role} from "../../../../types/Role";
import {AutoSizeGrid, AutoSizeGridItem} from "../../../components/AutoSizeGrid";
import {Button, Card} from "antd"
import {faAdd, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {EmptyData} from "../../../components/Empty";

type Props = {
    data?: Array<Role>
    onCreateClick: () => void
    onAction: (index: number, action: "edit" | "delete" | "open") => void
}

export const UserRoleList: FC<Props> = ({data, onCreateClick, onAction}) => {

    const onActionClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        const dataset = e.currentTarget.dataset
        const index = Number.parseInt(dataset["index"] as string)
        const action = dataset["action"] as "edit" | "delete" | "open"
        onAction(index, action)
    }

    return data && data.length > 0 ? <AutoSizeGrid columnBaseWidth={400} rowHeight={170} data={data} itemData={{
        onActionClick
    }}>
        {Row}
    </AutoSizeGrid> : <EmptyData title={"Sin roles"} description={"No se han registrado roles para los usuarios"}>
        <Button type={"primary"} icon={<FontAwesomeIcon icon={faAdd}/>} onClick={onCreateClick}>Nuevo</Button>
    </EmptyData>
}

const Row: FC<GridChildComponentProps> = (props) => {
    return <AutoSizeGridItem {...props}>
        {
            ({index, style, item, data}) => {
                const {onActionClick} = data
                return <div style={style} className={"p-2"} onClick={onActionClick} data-action={"open"}
                            data-index={index}>
                    <Card
                        className={"w-full h-fit"}
                        actions={[
                            <Button data-action={"edit"} data-index={index} type={"text"}
                                    icon={<FontAwesomeIcon icon={faEdit}/>} onClick={onActionClick}>
                                Editar
                            </Button>,
                            <Button data-action={"delete"} data-index={index} type={"text"}
                                    icon={<FontAwesomeIcon icon={faTrash}/>} onClick={onActionClick}>
                                Eliminar
                            </Button>
                        ]}
                    >
                        <Card.Meta
                            title={item.label}
                            description={item.description}
                        />
                    </Card>
                </div>
            }
        }
    </AutoSizeGridItem>
}