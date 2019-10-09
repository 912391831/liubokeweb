import React from 'react';
import style from './call.module.scss'
import Pop from './pop/pop.jsx'
import { callList } from './api'

class Call extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            list: []
        }
    }
    liuyan = () => {
        this.setState({
            visible: true
        })
    }
    callListApi() {
        callList({}).then(({ data }) => {
            this.setState({
                list: data.reverse(),
                visible: false
            })
         })
    }
    componentDidMount() {
        this.callListApi()
    }
    render() {
        const { list } = this.state
        return (
            <div className={ style.call }>
                <ul className={ style.list }>
                    {
                        list.map((item, index) => (
                            <li key={ index }>
                                <p className={ style.name }><i>{ item.username }说：</i></p>
                                <div className={ style.content }>{ item.content }</div>
                                <p className={ style.time }>{ item.create_time }</p>
                            </li>
                        ))
                    }
                </ul>
                <p className={ style.msg } title="给他留言" onClick={ this.liuyan }>
                    <i className="iconfont iconliuyan1"></i>
                </p>
                <Pop visible={ this.state.visible } callListApi={ this.callListApi.bind(this) }/>
            </div>
        )
    }
}
export default Call