/*
 * @Author: 李瑞鹿 
 * @Date: 2019-02-19 11:31:59 
 * @Last Modified by: 李瑞鹿
 * @Last Modified time: 2019-03-05 13:44:28
 */
import React from 'react';

import './index.css';

interface TableColumns {
  label: string;
  value: any;
  required?: boolean; //是否显示 *
  column?: number;  //占几列，若大于 global column 则会自动设置为 global column
}

interface TableProps {
  dataSource: TableColumns[]; //数据源
  columns?: number;  //几列
  className?: string; //类名
  labelWidth?: number;  //label宽度
  [propsName: string]: any;
}

class CustomTable extends React.Component<TableProps, any>{
  constructor(props:TableProps) {
    super(props);

  }

  renderItem = (data: TableColumns & {key:string}) => {  //渲染单个元素
    const { labelWidth } = this.props;  //默认120
    return <div key={data.key} className={`custom-table-item`} style={{ flex: data.column || 1 }}>{/** 设置该元素占几列， 默认1列 */}
      <div className='custom-table-item-label' style={{ width: labelWidth || 120 }}>{data.required && <span className='custom-table-item-label-required'>*</span>}{data.label}</div>
      <div className='custom-table-item-value'>{data.value}</div>
    </div>
  }

  resetColumn = (column:number = 1, globalColumn:number) => { //得到单个元素所占的列数，默认为1
    return column > globalColumn ? globalColumn : column;
  }
  /**
   * dataSource 数据源
   * column global列数
   */
  renderContent = (dataSource:TableColumns[], column:number) => { //渲染内容
    let content: any[] = []; //用于保存内容的数组
    for (let i = 0, len = dataSource.length; i < len;) { //遍历数据源，进行渲染
      const item = dataSource[i]; //每一行的第一个元素
      item.column = this.resetColumn(item.column, column);
      let columns = item.column;  //用于保存 column 之和
      let index: any[] = [i];  //用于保存改行可以显示的元素所有下标
      let isExceed = false; //该行元素总列数是否已经超出全局列数
      for (let j = 1; j <= column; j++) { //遍历全局列数的数据
        const nextItem = dataSource[i + j];
        if (!nextItem || isExceed) {  //当元素不存在或已经超出全局列数 则退出
          continue;
        }
        nextItem.column = this.resetColumn(nextItem.column, column);
        columns += nextItem.column; //累加 列数
        index.push(i + j);
        if (columns > column) { //若该行元素总列数大于全局列数时，设置isExceed=true，减去该元素的列数，并将下标去除
          isExceed = true;
          columns -= nextItem.column;
          index.pop();
          continue;
        }
      }
      i += index.length;  //循环跳过当前行所有元素
      if (index.length < column && columns < column) {  //若当前行元素列数之和小于全局列数时，进行补齐
        for (let ii = 0, len = column - columns; ii < len; ii++) {
          index.push(i + '' + ii + '999')
        }
      }
      content.push(<div className={`custom-table-row`} key={`${i}-${item.label}`}>{index.map(it => this.renderItem({ ...dataSource[it] || {}, key: it }))}</div>); //遍历添加改行每个元素
    }
    return content; //返回所有的数据
  }
  render() {
    const { className, dataSource, column = 2 } = this.props;
    return <div className={`custom-table-container ${className || ''}`}>{this.renderContent(dataSource, column)}</div>
  }
}

export default CustomTable