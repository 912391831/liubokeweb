import React from 'react';
import style from './topAndBottom.module.scss';
import { Input } from 'antd';
import { NavLink } from 'react-router-dom'
import HomeMenu from './menu/menu.jsx'
import { getLocalStore, remLocalStore } from 'utils/localStore'
import { removeToken } from 'utils/auth'
const Search = Input.Search;

class TopAndBottom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logoColor: 'yellow',
            timeInt: null,
            info: {
                username: ''
            },
            linkArr: [
                { url: '/item/lists/Css', name: 'Css'},
                { url: '/item/lists/Html', name: 'Html'},
                { url: '/item/lists/JavaScript', name: 'JavaScript'},
                { url: '/item/lists/react', name: 'react'},
                { url: '/item/lists/VUE', name: 'VUE'},
                { url: '/item/call', name: '留言板'},
                { url: '/item/output', name: '发布文章'}
            ]
        }
    }
    componentDidMount() {
        this.setState({
            info: {
                username: getLocalStore('info') && getLocalStore('info').username
            }
        })
        // let idx = 0
        // const Arr = [ 'red', 'yellow', 'blue', 'green', 'orange', 'purple' ]
        // this.setState({
        //     timeInt: setInterval(() => {
        //         idx += 1
        //         this.setState({
        //             logoColor: Arr[idx % 6]
        //         })
        //     }, 200)
        // })
    }
    outLogin() {
        removeToken()
        remLocalStore('info')
        window.location.reload()
    }
    componentWillUnmount() {
        // clearInterval(this.state.timeInt)
    }
    selectItem(type) {
        this.props.history.push('/item/lists/' + type)
    }
    render() {
        const { logoColor, info, linkArr } = this.state;
        return (
            <div className={style.topAndBottom} >
                <header className={ style.header }>
                    <div className="content">
                        <div className={ style.content }>
                            <div className={ style.logo }>
                                <i className={ style.iconcaidan }>
                                    <HomeMenu  linkArr={ linkArr }/>
                                </i>
                                <i className= {`iconfont iconhouzi ${ style.iconhouzi }`} ></i>
                            </div>
                            <div className={style.right}>
                                <div className={style.search}>
                                    <Search
                                        placeholder="请输入搜索内容"
                                        style={{ width: 200 }}
                                        onSearch={value => console.log(value)}
                                    />
                                </div>
                                <div className={style.info}>
                                    欢迎您！<b>{ info.username }</b>
                                </div>
                                <div className={style.out} title="退出登录" onClick={ this.outLogin }>
                                    <i className="iconfont icon084tuichu"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className={style.banner}>
                    <div className="content">
                        <div className={ style['banner-content'] }>
                            <h3>刘博的博客</h3>
                            <div className={ style.bottom }>
                                <ul  className={ style['banner-list'] }>
                                    {
                                        linkArr.map((item, index) => (
                                            <NavLink to={ item.url } key={  index} activeClassName={style.current}><li>{ item.name }</li></NavLink>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.lists} style={ {
                    paddingTop: "20px"
                } }>
                    <div className="content">
                        { this.props.children } 
                    </div>
                </div>
            </div>
        )
    }
}

export default TopAndBottom