# rc-antd-table 
### 描述：
>TableProps

参数|说明|类型|默认值
--|--|--|--
dataSource|数据源|TableColumns[]|无，必填
column|全局列数显示|number|1
labelWidth|label列宽|number|120
className|表格类名|string|无

----

>TableColumns

参数|说明|类型|默认值
--|--|--|--
label|key|string|无，必填
value|value|any|无，必填
column|当前元素占几列，若大于 global column 则会自动设置为 global column|number|1
required|key前是否显示*|boolean|false


----

## example
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