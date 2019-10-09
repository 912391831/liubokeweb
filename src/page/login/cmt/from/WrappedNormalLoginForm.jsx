import { Form, Icon, Input, Button, message } from 'antd';
import React from 'react';
import style from './WrappedNormalLoginForm.module.scss'
import { register, login } from './api'
import { setToken } from 'utils/auth'
import { setLocalStore } from 'utils/localStore'
import { withRouter } from 'react-router-dom'

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 'login',
            password: '',
            username: '',
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.state.type === 'register') {
                    // 注册
                    register({
                       username: this.state.username,
                       password: this.state.password 
                    }).then((data) => {
                        message.success(data.msg)
                    })
                }
                if (this.state.type === 'login') {
                    // 登录
                    login({
                        username: this.state.username,
                        password: this.state.password 
                    }).then((data) => {
                        // 储存cookie
                        message.success(data.msg)
                        setToken(data.token)
                        // 个人信息存本地储存
                        setLocalStore('info', data.info)
                        window.location.href = '/item/home'
                    })
                }
            }
        });
    }
    componentDidMount() {
        console.log('组件创建完毕')
    }
    selType() {
        if (this.state.type === 'login') {
            this.setState({
                type: 'register'
            })
        } else {
            this.setState({
                type: 'login'
            })
        }
    }
    changePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    changeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { username, password  } = this.state
        return (
            <Form onSubmit={this.handleSubmit} className={ style['login-form'] }>
                <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: '用户名不能为空' }],
                    initialValue: ""
                })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                    onChange={ this.changeUsername.bind(this) }
                    />,
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '密码不能为空' }],
                    initialValue: ""
                })(
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                    onChange={ this.changePassword.bind(this) }
                    />,
                )}
                </Form.Item>
                <Form.Item>
                    <p className={style['login-form-register']} onClick={ this.selType.bind(this) }>{ this.state.type === 'login' ? '没有账号？点击注册' : '返回登录' }</p>
                    <Button type="primary" htmlType="submit" className={style['login-form-button']}>
                        { this.state.type === 'login' ? '登录' : '注册' }
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default withRouter(WrappedNormalLoginForm)