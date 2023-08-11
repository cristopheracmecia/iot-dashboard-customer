import {FC, MouseEventHandler} from "react";
import {GridChildComponentProps} from "react-window"
import {RolePermissions} from "../../../../../types/Role";
import {AutoSizeGrid, AutoSizeGridItem} from "../../../../components/AutoSizeGrid";
import {Button, Card} from "antd"
import {EmptyData} from "../../../../components/Empty";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd} from "@fortawesome/free-solid-svg-icons";

type Props = {
    data?: Array<RolePermissions>
    onClick: (index: number) => void
    onEmptyCreateClick: () => void
}

export const UserPermissionRoleList: FC<Props> = ({data, onClick, onEmptyCreateClick}) => {

    const onActionClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        const dataset = e.currentTarget.dataset
        const index = Number.parseInt(dataset["index"] as string)
        onClick(index)
    }

    return data && data.length > 0 ? <AutoSizeGrid columnBaseWidth={400} rowHeight={120} data={data} itemData={{
            onActionClick
        }}>
            {Row}
        </AutoSizeGrid> :
        <EmptyData title={"Sin roles"} description={"No se han registrado roles para los usuarios"}>
            <Button type={"primary"} icon={<FontAwesomeIcon icon={faAdd} />} onClick={onEmptyCreateClick}>Nuevo</Button>
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
                    >
                        <Card.Meta
                            title={item.label}
                            description={
                                (!item.permissions || item.permissions.length <= 0) ? "No se han asignado permisos."
                                    : `${item.permissions.length} permisos establecidos`
                            }
                        />
                    </Card>
                </div>
            }
        }
    </AutoSizeGridItem>
}