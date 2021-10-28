# rc-antd-table 
### 描述：
>TableProps

参数|说明|类型|默认值
--|--|--|--
dataSource|数据源|TableColumns[]|无，必填
column|全局列数显示|number|1
labelWidth|label列宽|number|120
labelAlias|label别称|string|label
valueAlias|value别称|string|value
border|是否显示边框|boolean|true
valueEmptyText|值为空时显示的文案|string| '-'
className|表格类名|string|无
style|表格样式|React.CSSProperties|无

----

>TableColumns

参数|说明|类型|默认值
--|--|--|--
label|key|string ReactNode|无，必填
value|value|string ReactNode|无，必填
column|当前元素占几列，若大于 global column 则会自动设置为 global column|number|1
required|key前是否显示*|boolean|false
hasLabel|是否显示label|boolean|true
show|是否显示|boolean|true
isEmpty|是否为占位，若为true，则会忽略内容生成空的内容|boolean|false
className|表格类名|string|无
style|表格样式|React.CSSProperties|无

----
## example

![示例](https://s2.ax1x.com/2019/03/05/kXvHfO.png "示例")

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Table from 'rc-custom-table';
class Demo extends React.Component<any,any>{
    constructor(props) {
        super(props);
    }
    render(){
        return <Table
            labelWidth={145}
            dataSource={[
                {
                    label: 'label',
                    value: '张学友',
                    column: 2,
                },
                {
                    label: 'address',
                    value: '杭州'
                },
                {
                    label: 'type',
                    value: '演唱会'
                },
                {
                    label: 'type',
                    value: '演唱会',
                    isEmpty: true,
                },
                {
                    label: 'label',
                    value: '张学友',
                    column: 2,
                },
                {
                    label: 'address',
                    value: '杭州',
                    column: 2,
                },
                {
                    label: 'type',
                    value: '演唱会',
                    column: 3,
                },
                {
                    label: 'type',
                    value: '演唱会'
                },
            ]}
            column={3}
         />
    }
}


ReactDOM.render(<Demo/>, document.getElementById('root'));

```