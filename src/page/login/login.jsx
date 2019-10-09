import React from 'react';
import style from './login.module.scss'
import WrappedNormalLoginForm from './cmt/from/WrappedNormalLoginForm'

class Login extends React.Component {
    componentDidMount() {
        console.log('组件创建完毕')
    }
    render() {
        return (
            <div className={ style.login }>
                <div className={ style.content }>
                    <WrappedNormalLoginForm />
                </div>
            </div>
        )
    }
}
export default Login