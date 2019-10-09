import { Menu, Dropdown, Icon } from 'antd';
import { NavLink } from 'react-router-dom'
import React from 'react';


class HomeMenu extends React.Component {
    render() {
      const { linkArr } = this.props
      const menu = (
        <Menu>
          {
            linkArr.map((item, index) => (
              <Menu.Item key={ index }>
                <NavLink to={ item.url } activeClassName=''><li>{ item.name }</li></NavLink>
              </Menu.Item>
            ))
          }
        </Menu>
      );
        return (
            <Dropdown overlay={menu} trigger={['click']}>
                <Icon style={{ fontSize: 25 }} type="down-square-o" />
            </Dropdown> 
        )
    }
}

export default HomeMenu
