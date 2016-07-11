import React, { Component } from 'react'
import { Link } from 'react-router'

import { Menu, Icon } from 'antd'
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

import './nav.less'

class Nav extends Component {
  render () {
    return (
      <Menu
        className="side-nav"
        mode="inline"
        theme="dark"
        defaultOpenKeys={['sub1']}
        defaultSelectedKeys={['play']}>
        <SubMenu
          key="sub1"
          title={<span><Icon type="appstore" /><span>子导航</span></span>}>
          <MenuItem key="play"><Link to="/">演示</Link></MenuItem>
        </SubMenu>
      </Menu>
    )
  }
}

export default Nav
