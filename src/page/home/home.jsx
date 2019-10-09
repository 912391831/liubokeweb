import React from 'react';

class Home extends React.Component {
    componentDidMount() {
        console.log('组件创建完毕')
    }
    render() {
        return (
            <div>
               我是首页
            </div>
        )
    }
}
export default Home