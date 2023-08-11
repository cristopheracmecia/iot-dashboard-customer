import {FC, useState} from "react";
import {Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {FilterConfirmProps} from "antd/es/table/interface";
import {getColumnSearchProps} from "../../../components/TableColumnSearch";
import {GatewayListDataProps} from "./Data";
import {Gateway} from "../../../../types/Gateway";

export const GatewayListTable: FC<GatewayListDataProps> = ({data, onItemClicked}) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: keyof Gateway,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const columns: ColumnsType<Gateway> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Identificador',
            dataIndex: 'key',
            key: 'key',
            sorter: (a, b) => a.key.localeCompare(b.key),
            ...getColumnSearchProps<Gateway>(handleSearch, handleReset, searchText, searchedColumn)('key'),
        },
        {
            title: "Vehículo",
            key: "vehicle",
            sorter: (a, b) => a.Vehicle?.name.localeCompare(b.Vehicle?.name??"")??0,
            render: (text, record) => {
                return record.Vehicle?.name
            }
        }
    ];
    return <Table onRow={
        (record, _) => {
            return {
                onClick: () => onItemClicked(record)
            };
        }
    } size={"small"} columns={columns} dataSource={data!!} rowKey={"id"}/>;
}