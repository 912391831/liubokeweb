import React from 'react';
import style from './lists.module.scss'
import { withRouter } from 'react-router-dom'
import { articleList } from './api'

class Lists extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        articleList({
            type: this.props.match.params.type
        }).then(({ data }) => {
            this.setState({
                list: data.reverse()
            })
        })
    }
    urlDateil(id) {
        this.props.history.push('/item/detail?id=' + id)
    }
    componentWillReceiveProps(props) {
        articleList({
            type: props.match.params.type
        }).then(({ data }) => {
            this.setState({
                list: data.reverse()
            })
        })
    }
    render() {
        const { list } = this.state
        return (
            <ul className={ style.lists }>
                {
                    list.map((item, index) => {
                        return (<li key={ index } onClick={ this.urlDateil.bind(this, item.id) }>
                                    <p>{ item.title }</p>
                                    <div>
                                        <i>更新日期: </i>
                                        <b>{ item.update_time }</b>
                                    </div>
                                </li>)
                    })
                }
              
            </ul>
        )
    }
}

export default withRouter(Lists)