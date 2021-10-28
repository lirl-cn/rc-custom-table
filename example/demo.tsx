import React from 'react';
import ReactDOM from 'react-dom';
import Table from '../src';


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
            columns={3}
         />
    }
}


ReactDOM.render(<Demo/>, document.getElementById('root'));