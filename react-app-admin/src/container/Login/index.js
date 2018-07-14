import React, {
  Component
} from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
  message
} from 'antd';
import axios from 'axios';
import './home.less';

const FormItem = Form.Item;

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {
          userName,
          password
        } = values;
        axios.post('/api/admin/login', values).then(param => {
          if (param.data.error) {
            return message.error(param.data.error);;
          }
          sessionStorage.setItem("admin", JSON.stringify(values));
          location.href = '/product';
        })
      }
    });
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <div className="login">
        <h1>天天农场后台管理系统</h1>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
          >
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
const WrappedLogin = Form.create()(Login);
export default WrappedLogin;