import {FC, useState} from "react";
import {Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {FilterConfirmProps} from "antd/es/table/interface";
import {getColumnSearchProps} from "../../../components/TableColumnSearch";
import {VehicleListDataProps} from "./Data";
import {Vehicle} from "../../../../types/Vehicle";

export const VehicleListTable: FC<VehicleListDataProps> = ({data, onItemClicked}) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: keyof Vehicle,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const columns: ColumnsType<Vehicle> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            ...getColumnSearchProps<Vehicle>(handleSearch, handleReset, searchText, searchedColumn)('name'),
        },
        {
            title: 'Placa',
            dataIndex: 'plate',
            key: 'plate',
            sorter: (a, b) => a.plate.localeCompare(b.plate),
            ...getColumnSearchProps<Vehicle>(handleSearch, handleReset, searchText, searchedColumn)('plate'),
        },
        {
            title: "Cliente",
            key: "customer",
            sorter: (a, b) => a.Customer.businessName.localeCompare(b.Customer.businessName),
            render: (text, record) => {
                return record.Customer?.businessName
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