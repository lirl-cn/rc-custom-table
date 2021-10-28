/*
 * @Author: 李瑞鹿 
 * @Date: 2019-02-19 11:31:59 
 * @Last Modified by: 李瑞鹿
 * @Last Modified time: 2019-03-05 13:44:28
 */
import React, { useCallback } from 'react'
import classnames from 'classnames'
import { formatStringRender } from './utils'
import './index.less'

export type TableColumns = {
  label: any;
  value: any;
  required?: boolean; //是否显示 *
  column?: number;  //占几列，若大于 global column 则会自动设置为 global column
  hasLabel?: boolean; // 是否有label
  className?: string; //
  show?: boolean; // 是否显示默认为true
  isEmpty?: boolean;  //是否为占位
  style?: React.CSSProperties;
  [propsName: string]: any;
}

export interface CustomTableProps {
  dataSource: TableColumns[]
  className?: string
  style?: React.CSSProperties
  columns?: number
  labelWidth?: number
  labelAlias?: string
  valueAlias?: string
  border?: boolean
  valueEmptyText?: string
}

const CustomTable: React.FC<CustomTableProps> = (props) => {
  const { labelWidth, labelAlias = 'label', valueAlias = 'value', valueEmptyText = '-', border } = props;

  const renderItem = useCallback((data) => {
    const {
      hasLabel = true
    } = data;
    // console.log(data.key)
    return <div key={data.key} className={classnames('lirl-custom-table-item', {'lirl-custom-table-item-no-border': !border}, data.className)} style={{ flex: data.column || 1, ...data.style, }}>
      {hasLabel && <div className={classnames('lirl-custom-table-item-label', {'lirl-custom-table-item-label-required': !data.isEmpty && data.required, 'lirl-custom-table-item-label-none': !data[labelAlias]})} style={{ width: labelWidth }}>{ data.isEmpty ? '' : data[labelAlias]}</div>}
      <div className='lirl-custom-table-item-value' >{data.isEmpty ? '' : data[labelAlias] ? formatStringRender(data[valueAlias], '-') : valueEmptyText}</div>
    </div>
  }, [props])

  const resetColumn = useCallback((column = 1, globalColumn) => { //得到单个元素所占的列数，默认为1
    return column > globalColumn ? globalColumn : column;
  }, [])

  const renderContent = useCallback((dataSource, column) => { //渲染内容
    let content: any[] = []; //用于保存内容的数组
    for (let i = 0, len = dataSource.length; i < len;) { //遍历数据源，进行渲染
      const item = dataSource[i]; //每一行的第一个元素
      if(item.show === false){
        i++;
        continue
      }
      item.column = resetColumn(item.column, column);
      let columns = item.column;  //用于保存 column 之和
      let index: any[] = [i];  //用于保存改行可以显示的元素所有下标
      let isExceed = false; //该行元素总列数是否已经超出全局列数
      // let num = 0;
      for (let j = 1; j <= column; j++) { //遍历全局列数的数据
        // num ++;
        const nextItem = dataSource[i + j];
        if (!nextItem || isExceed || nextItem.show === false) {  //当元素不存在或已经超出全局列数 则退出
          continue;
        }
        nextItem.column = resetColumn(nextItem.column, column);
        columns += nextItem.column; //累加 列数
        index.push(i + j);
        if (columns > column) { //若该行元素总列数大于全局列数时，设置isExceed=true，减去该元素的列数，并将下标去除
          isExceed = true;
          columns -= nextItem.column;
          index.pop();
          continue;
        }
      }
      // console.log(num, index.length)
      i += index.length;  //循环跳过当前行所有元素
      if (index.length < column && columns < column) {  //若当前行元素列数之和小于全局列数时，进行补齐
        for (let ii = 0, len = column - columns; ii < len; ii++) {
          index.push(i + '' + ii + '999')
        }
      }
      content.push(<div className='lirl-custom-table-row' key={`${i}-${item.labelAlias || item.label}`}>{index.map(it => renderItem({ ...dataSource[it] || {}, key: `${i} - ${it}` }))}</div>); //遍历添加改行每个元素
    }
    return content; //返回所有的数据
  }, [])

  return <div className={classnames('lirl-custom-table-container',{'lirl-custom-table-container-no-border': !border}, props.className)} style={props.style}>{renderContent(props.dataSource, props.columns)}</div>
}

CustomTable.defaultProps={
  labelWidth: 136,
  labelAlias: 'label',
  valueAlias: 'value',
  border: true,
}

export default CustomTable