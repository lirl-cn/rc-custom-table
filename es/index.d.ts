import React from 'react';
import './index.css';
interface TableColumns {
    label: string;
    value: any;
    required?: boolean;
    column?: number;
}
interface TableProps {
    dataSource: TableColumns[];
    columns?: number;
    className?: string;
    labelWidth?: number;
    [propsName: string]: any;
}
declare class CustomTable extends React.Component<TableProps, any> {
    constructor(props: TableProps);
    renderItem: (data: TableColumns & {
        key: string;
    }) => JSX.Element;
    resetColumn: (column: number | undefined, globalColumn: number) => number;
    /**
     * dataSource 数据源
     * column global列数
     */
    renderContent: (dataSource: TableColumns[], column: number) => any[];
    render(): JSX.Element;
}
export default CustomTable;
