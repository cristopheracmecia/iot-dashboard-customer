import {FC} from "react";
import {GatewayListDataProps} from "./Data";
import {AutoSizeGrid, AutoSizeGridItem} from "../../../components/AutoSizeGrid";
import {GridChildComponentProps} from "react-window"
import {Card, Typography} from "antd";
import {Gateway} from "../../../../types/Gateway";

export const GatewayListGrid: FC<GatewayListDataProps> = ({data, onItemClicked}) => {
    const onDivClicked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const index = parseInt(event.currentTarget.getAttribute("data-index")!!)
        onItemClicked(data!![index])
    }
    return <AutoSizeGrid columnBaseWidth={400} rowHeight={130} data={data!!} itemData={{onDivClicked}}>
        {GatewayListGridRow}
    </AutoSizeGrid>
}

const GatewayListGridRow: FC<GridChildComponentProps<Gateway>> = (props) => {
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
                                Vehículo: {" " + item.Vehicle?.name}
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