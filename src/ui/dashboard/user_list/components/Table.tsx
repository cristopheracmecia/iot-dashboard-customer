import {FC} from "react";
import {Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {User} from "../../../../types/User";

type Props = {
    data?: User[]
}

const columns: ColumnsType<User> = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Nombres',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Apellidos',
        dataIndex: 'lastname',
        key: 'lastname',
        sorter: true,
    },
];
export const UserListTable: FC<Props> = ({data}) => <Table bordered columns={columns} dataSource={data}/>;