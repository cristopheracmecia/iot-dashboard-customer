import {FC, MouseEventHandler} from "react";
import {CustomerListDataProps} from "./Data";
import {AutoSizeGrid, AutoSizeGridItem} from "../../../components/AutoSizeGrid";
import {GridChildComponentProps} from "react-window"
import {Card, Typography} from "antd";
import {Customer} from "../../../../types/Customer";

export const CustomerListGrid: FC<CustomerListDataProps> = ({data, onItemClicked}) => {
    const onDivClicked: MouseEventHandler<HTMLDivElement> = (e) => {
        const index = Number.parseInt(e.currentTarget.dataset.index!!)
        onItemClicked(data!![index])
    }
    return <AutoSizeGrid columnBaseWidth={400} rowHeight={130} data={data!!} itemData={{onDivClicked}}>
        {UserListGridRow}
    </AutoSizeGrid>
}

const UserListGridRow: FC<GridChildComponentProps<Customer>> = (props) => {
    return <AutoSizeGridItem {...props}>
        {
            ({item, index, data}) => {
                return <div className={"p-2"} style={props.style} data-index={index} onClick={data.onDivClicked}>
                    <Card>
                        <div className={"flex flex-col"}>
                            <Typography.Text strong>
                                {item.businessName}
                            </Typography.Text>
                            <Typography.Text>
                                ID: {" " + item.id}
                            </Typography.Text>
                            <Typography.Text>
                                RUC: {" " + item.ruc}
                            </Typography.Text>
                            <Typography.Text>
                                Subdominio: {" " + item.subdomain}
                            </Typography.Text>
                        </div>
                    </Card>
                </div>
            }
        }
    </AutoSizeGridItem>
}