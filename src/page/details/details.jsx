import React from 'react';
import style from './detail.module.scss'
import { withRouter } from 'react-router-dom'
import { detail } from './api'

class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            update_time: '',
            title: '',
            content: ''
        }
    }
    componentDidMount() {
        const kvdui = this.props.location.search.replace(/\?/, '')
        const arr = kvdui.split('&')
        const query = {}
        arr.map(v => {
            const vrr = v.split('=')
            query[vrr[0]] = vrr[1]
        })
        detail({
            id: query.id
        }).then(({ data }) => {
            this.setState({
                update_time: data.update_time,
                title: data.title,
                content: data.content
            })
        })
    }
    render() {
        const { content, title, update_time } = this.state
        return (
            <div className={ style.detail }>
                <h4 className={ style.title }>
                    <p>{ title }</p>
                    <i>更新日期: { update_time }</i> 
                </h4>
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
        )
    }
}
export default withRouter(Detail)