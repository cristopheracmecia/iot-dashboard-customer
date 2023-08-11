import {FC, MouseEventHandler} from "react";
import {DeviceListDataProps} from "./Data";
import {AutoSizeGrid, AutoSizeGridItem} from "../../../components/AutoSizeGrid";
import {GridChildComponentProps} from "react-window"
import {Card, Typography} from "antd";
import {Device} from "../../../../types/Device";

export const DeviceListGrid: FC<DeviceListDataProps> = ({data, onItemClicked}) => {
    const onDivClicked : MouseEventHandler<HTMLDivElement> = (e) => {
        const index = Number.parseInt(e.currentTarget.dataset.index!!)
        onItemClicked(data!![index])
    }
    return <AutoSizeGrid columnBaseWidth={400} rowHeight={110} data={data!!} itemData={{onDivClicked}}>
        {DeviceListGridRow}
    </AutoSizeGrid>
}

const DeviceListGridRow: FC<GridChildComponentProps<Device>> = (props) => {
    return <AutoSizeGridItem {...props}>
        {
            ({item, index, data}) => {
                return <div className={"p-2"} style={props.style} data-index={index} onClick={data.onDivClicked}>
                    <Card>
                        <div className={"flex flex-col"}>
                            <Typography.Text strong>
                                {item.key}
                            </Typography.Text>
                            <Typography.Text>
                                ID: {" " + item.id}
                            </Typography.Text>
                            <Typography.Text>
                                Unidad: {" " + item.Unit.name}
                            </Typography.Text>
                        </div>
                    </Card>
                </div>
            }
        }
    </AutoSizeGridItem>
}