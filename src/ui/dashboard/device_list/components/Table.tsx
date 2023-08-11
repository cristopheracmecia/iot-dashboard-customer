import {FC, useState} from "react";
import {Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {FilterConfirmProps} from "antd/es/table/interface";
import {getColumnSearchProps} from "../../../components/TableColumnSearch";
import {DeviceListDataProps} from "./Data";
import {Device} from "../../../../types/Device";

export const DeviceListTable: FC<DeviceListDataProps> = ({data, onItemClicked}) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: keyof Device,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const columns: ColumnsType<Device> = [
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
            ...getColumnSearchProps<Device>(handleSearch, handleReset, searchText, searchedColumn)('key'),
        },
        {
            title: "Unidad",
            key: "unit",
            sorter: (a, b) => a.Unit?.name.localeCompare(b.Unit?.name),
            render: (text, record) => {
                return record.Unit?.name
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