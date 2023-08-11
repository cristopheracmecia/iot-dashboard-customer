import {FC, MouseEventHandler} from "react";
import {UserListDataProps} from "./Data";
import {AutoSizeGrid, AutoSizeGridItem} from "../../../components/AutoSizeGrid";
import {GridChildComponentProps} from "react-window"
import {Card, Typography} from "antd";
import {User} from "../../../../types/User";

export const UserListGrid: FC<UserListDataProps> = ({data, onItemClicked}) => {

    const onDivClicked : MouseEventHandler<HTMLDivElement> = (e) => {
        const index = Number.parseInt(e.currentTarget.dataset.index!!)
        onItemClicked(data!![index])
    }
    return <AutoSizeGrid columnBaseWidth={400} rowHeight={170} data={data!!} itemData={{onDivClicked}}>
        {UserListGridRow}
    </AutoSizeGrid>
}

const UserListGridRow: FC<GridChildComponentProps<User>> = (props) => {
    return <AutoSizeGridItem {...props}>
        {
            ({item, index, data}) => {
                return <div className={"p-2"} style={props.style} data-index={index} onClick={data.onDivClicked}>
                    <Card>
                        <div className={"flex flex-col"}>
                            <Typography.Text strong>
                                {item.name + " " + item.lastname}
                            </Typography.Text>
                            <Typography.Text>
                                ID: {" " + item.id}
                            </Typography.Text>
                            <Typography.Text>
                                Nombre: {" " + item.name}
                            </Typography.Text>
                            <Typography.Text>
                                Apellido: {" " + item.lastname}
                            </Typography.Text>
                            <Typography.Text>
                                Email: {" " + item.corporateEmail}
                            </Typography.Text>
                            <Typography.Text>
                                Cargo: {" " + item.Role?.label}
                            </Typography.Text>
                        </div>
                    </Card>
                </div>
            }
        }
    </AutoSizeGridItem>
}