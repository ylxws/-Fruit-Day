import React, {
  Component
} from 'react';
import {
  Icon
} from 'antd';

import './home.less';

class User extends Component {
  render() {
    return (
      <div className="home">
        <h1>Home</h1>
        <div className="container">
          Welcome
        </div>
      </div>
    );
  }
}

export default User;