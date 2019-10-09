import React from 'react';
import { Input, Modal, message } from 'antd';
import { callAdd } from './api'
const { TextArea } = Input;
class Pop extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            content: ''
        }
    }
    componentWillReceiveProps(props) {
        this.setState({
            visible: props.visible,
        })
    }
    handleOk = (e) => {
        if (!this.state.content) {
            return message.warning('评论内容不能为空');
        }
        callAdd({
            content: this.state.content
        }).then(() => {
            message.success('评论成功！');
            this.setState({
                visible: false,
            });
            this.props.callListApi()
        })
      }
    handleCancel = (e) => {
        this.setState({
          visible: false,
        });
    }
    changeContent = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    render() {
        return (
            <Modal
                title="留言"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确定"
                cancelText="取消"
                >
                <TextArea placeholder="请填写内容" autosize={{ minRows: 4, maxRows: 6 }} onChange={this.changeContent} type="textarea"/>
            </Modal>
        )
    }
}
export default Pop

