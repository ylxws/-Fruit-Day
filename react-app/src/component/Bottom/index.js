import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon} from 'antd';

import './bottom.less';

class Bottom extends Component {
  render() {
    return (
      <footer>
        <Link to="/">
          <Icon type="home" />
          <span>首页</span>
        </Link>
        <Link to="/kind">
          <Icon type="appstore-o" />
          <span>分类</span>
        </Link>
        <Link to="/cart">
          <Icon type="shopping-cart" />
          <span>购物车</span>
        </Link>
        <Link to="/user">
          <Icon type="user" />
          <span>我的</span>
        </Link>
      </footer>
    );
  }
}

export default Bottom;
