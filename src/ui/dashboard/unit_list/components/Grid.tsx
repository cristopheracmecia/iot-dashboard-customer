import {FC, MouseEventHandler} from "react";
import {UnitListDataProps} from "./Data";
import {AutoSizeGrid, AutoSizeGridItem} from "../../../components/AutoSizeGrid";
import {GridChildComponentProps} from "react-window"
import {Card, Typography} from "antd";
import {Unit} from "../../../../types/Unit";

export const UnitListGrid: FC<UnitListDataProps> = ({data, onItemClicked}) => {
    const onDivClicked: MouseEventHandler<HTMLDivElement> = (e) => {
        const index = parseInt(e.currentTarget.dataset.index!!);
        onItemClicked(data!![index])
    }

    return <AutoSizeGrid columnBaseWidth={400} rowHeight={110} data={data!!} itemData={{onDivClicked}}>
        {UnitListGridRow}
    </AutoSizeGrid>
}

const UnitListGridRow: FC<GridChildComponentProps<Unit>> = (props) => {
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
                                Identificador: {" " + item.key}
                            </Typography.Text>
                        </div>
                    </Card>
                </div>
            }
        }
    </AutoSizeGridItem>
}