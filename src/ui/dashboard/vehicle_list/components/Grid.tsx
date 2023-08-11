import {FC} from "react";
import {VehicleListDataProps} from "./Data";
import {AutoSizeGrid, AutoSizeGridItem} from "../../../components/AutoSizeGrid";
import {GridChildComponentProps} from "react-window"
import {Card, Typography} from "antd";
import {Vehicle} from "../../../../types/Vehicle";

export const VehicleListGrid: FC<VehicleListDataProps> = ({data, onItemClicked}) => {
    const onDivClicked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const index = parseInt(event.currentTarget.getAttribute("data-index")!!)
        onItemClicked(data!![index])
    }
    return <AutoSizeGrid columnBaseWidth={400} rowHeight={130} data={data!!} itemData={{onDivClicked}}>
        {VehicleListGridRow}
    </AutoSizeGrid>
}

const VehicleListGridRow: FC<GridChildComponentProps<Vehicle>> = (props) => {
    return <AutoSizeGridItem {...props}>
        {
            ({item, index, data}) => {
                return <div className={"p-2"} style={props.style} data-index={index} onClick={data.onDivClicked}>
                    <Card>
                        <div className={"flex flex-col"}>
                            <Typography.Text strong>
                                {item.name}
                            </Typography.Text>
                            <Typography.Text>
                                ID: {" " + item.id}
                            </Typography.Text>
                            <Typography.Text>
                                Placa: {" " + item.plate}
                            </Typography.Text>
                            <Typography.Text>
                                Desde: {" " + Date.parse(item.createdAt)}
                            </Typography.Text>
                        </div>
                    </Card>
                </div>
            }
        }
    </AutoSizeGridItem>
}