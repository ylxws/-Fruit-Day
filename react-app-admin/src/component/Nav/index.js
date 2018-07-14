import React, {
  Component
} from 'react';
import {
  Menu,
  Icon
} from 'antd';

import './nav.less';

const {
  SubMenu
} = Menu;

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1', 'sub2', 'sub3']}
          mode="inline"
        >
          <SubMenu
            key="sub1"
            title={<span><Icon type="home" /><span><a href="/home">Home</a></span></span>}
          />
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>商品</span></span>}>
            <Menu.Item key="5"><a href="/product">商品管理</a></Menu.Item>
            <Menu.Item key="6"><a href="/class">品类管理</a></Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="setting" /><span>订单</span></span>}>
            <Menu.Item key="9"><a href="/order">订单管理</a></Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default Nav;