import {FC, useState} from "react";
import {Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {FilterConfirmProps} from "antd/es/table/interface";
import {getColumnSearchProps} from "../../../components/TableColumnSearch";
import {UnitListDataProps} from "./Data";
import {Unit} from "../../../../types/Unit";

export const UnitListTable: FC<UnitListDataProps> = ({data, onItemClicked}) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: keyof Unit,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const columns: ColumnsType<Unit> = [
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
            ...getColumnSearchProps<Unit>(handleSearch, handleReset, searchText, searchedColumn)('name'),
        },
        {
            title: 'Identificador',
            dataIndex: 'key',
            key: 'key',
            sorter: (a, b) => a.key.localeCompare(b.key),
            ...getColumnSearchProps<Unit>(handleSearch, handleReset, searchText, searchedColumn)('key'),
        }
    ];
    return <Table onRow={
        (record, _) => {
            return {
                onClick: (_) => onItemClicked(record),
            };
        }
    } size={"small"} columns={columns} dataSource={data!!} rowKey={"id"}/>;
}