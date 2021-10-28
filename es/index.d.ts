import React from 'react';
import './index.less';
export declare type TableColumns = {
    label: any;
    value: any;
    required?: boolean;
    column?: number;
    hasLabel?: boolean;
    className?: string;
    show?: boolean;
    isEmpty?: boolean;
    style?: React.CSSProperties;
    [propsName: string]: any;
};
export interface CustomTableProps {
    dataSource: TableColumns[];
    className?: string;
    style?: React.CSSProperties;
    columns?: number;
    labelWidth?: number;
    labelAlias?: string;
    valueAlias?: string;
    border?: boolean;
    valueEmptyText?: string;
}
declare const CustomTable: React.FC<CustomTableProps>;
export default CustomTable;
