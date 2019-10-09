import React from 'react';
import style from './output.module.scss'
import {Editor} from 'react-draft-wysiwyg'
import draftjs from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Form, Icon, Input, Button, Select, message } from 'antd';
import { articleAdd } from './api'
const FormItem = Form.Item;
const { Option, OptGroup } = Select;

class Output extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showRichText: false,
            editorContent: '',
            editorState: ''
        }
    }
    handleClearContent = () => {  //清空文本
        this.setState({
            editorState: ''
        })
    }
    handleGetText = () => {    //获取文本内容
        this.setState({
            showRichText: true
        })
    }
    onEditorStateChange = (editorState) => {   //编辑器的状态
        this.setState({
            editorState
        })
    }
    onEditorChange = (editorContent) => {   //编辑器内容的状态
        this.setState({
            editorContent
        })
    }
    output = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            articleAdd({
                title: values.title,
                type: values.type,
                content: draftjs(this.state.editorContent)
            }).then(() => {
                message.success('创建成功！')
            })
          }
        });
      }
    render() {
        const { editorState, editorContent, html } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={ style.output }>
                {/* <div dangerouslySetInnerHTML={{__html: html}}></div> */}
               <header className={style.header}>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <FormItem
                        >
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请填写文章标题' }],
                        })(
                            <Input placeholder="请填写标题" />
                        )}
                        </FormItem>
                        <FormItem
                        >
                        {getFieldDecorator('type', {
                            rules: [{ required: true, message: '请选择type值' }],
                        })(
                            <Select placeholder="请填写分类" style={{ width: 160 }}>
                                <Option value="Css">Css</Option>
                                <Option value="Html">Html</Option>
                                <Option value="JavaScript">JavaScript</Option>
                                <Option value="react">react</Option>
                                <Option value="VUE">VUE</Option>
                            </Select>
                        )}
                        </FormItem>
                        <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={ this.output.bind(this) }
                        >
                            发布
                        </Button>
                        </FormItem>
                    </Form>
               </header>
               <div>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={this.onEditorStateChange}
                        onContentStateChange={this.onEditorChange}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                    />
               </div>
            </div>
        )
    }
}
const WrappedHorizontalLoginForm = Form.create()(Output);
export default WrappedHorizontalLoginForm