import React from 'react';
import ReactDOM from 'react-dom';
// import { ConfigProvider, DatePicker, message } from 'antd';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './page/login/login.jsx'
import ErrPage from './page/errpage/errpage.jsx'
import routerArr from 'router/index.js'
import TopAndBottom from 'page/topAndBottom/topAndBottom.jsx'
import zhCN from 'antd/es/locale/zh_CN';
import { getToken } from 'utils/auth'
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import './index.css';

moment.locale('zh-cn');

class App extends React.Component {
  render() {
    const token = getToken()
    console.log(99999999999, token)
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/item" render={(props) => 
            <TopAndBottom>
              {
                routerArr.map((item, index) => <Route key={index} path={item.path} exact render={() => (
                  token ? <item.component {...props} /> : <Redirect to="/login" />
                )}></Route>)
              }
            </TopAndBottom>
          }/>
          <Route exact path="/404" component={ ErrPage } />
          <Redirect to="/item/lists/Css" />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
