import {FC, useState} from "react";
import {Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {User} from "../../../../types/User";
import {UserListDataProps} from "./Data";
import {Link} from "react-router-dom";
import {FilterConfirmProps} from "antd/es/table/interface";
import {getColumnSearchProps} from "../../../components/TableColumnSearch";

type DataIndex = keyof User;

export const UserListTable: FC<UserListDataProps> = ({data, onItemClicked}) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

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
            sorter: (a, b) => a.name.localeCompare(b.name),
            ...getColumnSearchProps<User>(handleSearch, handleReset, searchText, searchedColumn)('name'),
        },
        {
            title: 'Apellidos',
            dataIndex: 'lastname',
            key: 'lastname',
            sorter: (a, b) => a.name.localeCompare(b.name),
            ...getColumnSearchProps<User>(handleSearch, handleReset, searchText, searchedColumn)('lastname'),
        },
        {
            title: "Usuario",
            dataIndex: "username",
            key: "username",
            sorter: (a, b) => a.name.localeCompare(b.name),
            ...getColumnSearchProps<User>(handleSearch, handleReset, searchText, searchedColumn)('username'),
        }, {
            title: "Cargo",
            render: (value, record, _) => {
                return <Link to={`/dashboard/users/permissions/${record.Role?.id}`}>
                    {record.Role?.label}
                </Link>
            },
            sorter: (a, b) => a.name.localeCompare(b.name),
        }
    ];
    return <Table onRow={
        (record, _) => {
            return {
                onClick: onItemClicked ? () => onItemClicked(record) : undefined
            };
        }
    } size={"small"} columns={columns} dataSource={data} rowKey={"id"}/>;
}