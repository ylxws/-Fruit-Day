import React, { Component } from 'react';


import './header.less';

class Header extends Component {
  render() {
    return (
      <header>
        <span>天天农场后台管理系统</span>
        <small>欢迎，admin<a>退出</a></small>
      </header>
    );
  }
}

export default Header;
