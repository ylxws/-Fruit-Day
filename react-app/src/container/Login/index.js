import React, {
  Component
} from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  message,
  Avatar
} from 'antd';
import axios from 'axios';

import './login.less';

const FormItem = Form.Item;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      role: '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return message.error('登录失误，请重新操作！');
      }
      axios.post(`/api/login/user`, values).then(param => {
        if (param.error) {
          return message.error(param.error);
        }
        sessionStorage.setItem('user', JSON.stringify(values));
        // console.log(JSON.parse(sessionStorage.getItem('user')));
        location.href = `/home?userName=${values.userName}`;
      })
    });
  }

  render() {
    const {
      getFieldDecorator
    } = this.props.form;
    return (
      <div className="login">
        <header>
          <nav>
          <div className="back">
            <a href="/" className="iconfont icon-morehome">
              <Icon type="right" />
            </a>
          </div>
          <div className="text">账户密码登陆</div>
            <a href="javascript:void(0);" className="next">
            <i className="iconfont icon-searchpage"></i>
          </a>
          </nav>
        </header>
        <Form onSubmit={this.handleSubmit} className="loginForm">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名！' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入您的密码！' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住密码</Checkbox>
            )}
            <Button type="primary" htmlType="submit" className="loginFormButton">
              登录
            </Button>
            Or <a href="/register">注册</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedLogin = Form.create()(Login);
export default WrappedLogin;