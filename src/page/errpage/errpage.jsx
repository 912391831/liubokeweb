import React from 'react';
import style from './errpage.module.scss';

class ErrPage extends React.Component {
    componentDidMount() {
        console.log('组件创建完毕')
    }
    render() {
        return (
            <div className={ style.errpage }>
               
            </div>
        )
    }
}
export default ErrPage