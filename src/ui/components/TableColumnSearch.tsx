import {Input, Space, Button} from 'antd';
import type {ColumnType} from 'antd/es/table';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import Highlighter from 'react-highlight-words';
import {FilterConfirmProps} from "antd/es/table/interface";

export const getColumnSearchProps = <T = {}>(
    handleSearch: (selectedKeys: string[],
                   confirm: (param?: FilterConfirmProps) => void,
                   dataIndex: keyof T,) => void,
    handleReset: (clearFilters: () => void) => void,
    searchText: string, searchedColumn: string
) => (dataIndex: keyof T): ColumnType<T> => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
        <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
            <Input
                placeholder={`Buscar`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                style={{marginBottom: 8, display: 'block'}}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    icon={<FontAwesomeIcon icon={faSearch}/>
                    }
                    size="small"
                    style={{width: 90}}
                >
                    Buscar
                </Button>
                <Button
                    onClick={() => clearFilters && handleReset(clearFilters)}
                    size="small"
                    style={{width: 90}}
                >
                    Borrar
                </Button>
                <Button
                    type="link"
                    size="small"
                    onClick={() => {
                        close();
                    }}
                >
                    Cerrar
                </Button>
            </Space>
        </div>
    ),
    filterIcon: (filtered: boolean) => (
        <FontAwesomeIcon icon={faSearch} style={{color: filtered ? '#1677ff' : undefined}}/>
    ),
    onFilter: (value, record) =>
        record[dataIndex]!!
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()),
    render: (text) =>
        searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
            />
        ) : (
            text
        ),
});
