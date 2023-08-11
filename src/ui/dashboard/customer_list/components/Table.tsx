import {FC, useState} from "react";
import {Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {useNavigate} from "react-router-dom";
import {FilterConfirmProps} from "antd/es/table/interface";
import {getColumnSearchProps} from "../../../components/TableColumnSearch";
import {CustomerListDataProps} from "./Data";
import {Customer} from "../../../../types/Customer";

export const CustomerListTable: FC<CustomerListDataProps> = ({data, onItemClicked}) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const navigate = useNavigate();
    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: keyof Customer,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const columns: ColumnsType<Customer> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nombre',
            dataIndex: 'businessName',
            key: 'businessName',
            sorter: (a, b) => a.businessName.localeCompare(b.businessName),
            ...getColumnSearchProps<Customer>(handleSearch, handleReset, searchText, searchedColumn)('businessName'),
        },
        {
            title: 'RUC',
            dataIndex: 'ruc',
            key: 'ruc',
            sorter: (a, b) => a.ruc.localeCompare(b.ruc),
            ...getColumnSearchProps<Customer>(handleSearch, handleReset, searchText, searchedColumn)('ruc'),
        },
        {
            title: "Subdominio",
            dataIndex: "subdomain",
            key: "subdomain",
            sorter: (a, b) => a.subdomain.localeCompare(b.subdomain),
            ...getColumnSearchProps<Customer>(handleSearch, handleReset, searchText, searchedColumn)('subdomain'),
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