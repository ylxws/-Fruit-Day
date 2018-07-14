import React, {
  Component
} from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  message
} from 'antd';

import axios from 'axios';
import './login.less';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (!values.agreement) {
          message.error("请先确定用户协议");
        }
        axios.post('/api/login/register', values).then(param => {
          if (param.data.error) {
            return message.error(param.data.error);
          }
          if (param.data.warning) {
            return message.error(param.data.warning);
          }
          message.success('注册成功请登录', 2, () => {
            location.href = "/login";
          });
        })
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('请输入密码！');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {
        force: true
      });
    }
    callback();
  }

  render() {
    const {
      getFieldDecorator
    } = this.props.form;
    const {
      autoCompleteResult
    } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 8
        },
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 16
        },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div className="login">
        <header>
          <nav>
          <div className="back">
            <a href="/kind" className="iconfont icon-morehome">
              <Icon type="right" />
            </a>
          </div>
          <div className="text">账户密码登陆</div>
            <a href="javascript:void(0);" className="next">
            <i className="iconfont icon-searchpage"></i>
          </a>
          </nav>
        </header>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="用户名"
          >
            {getFieldDecorator('userName', {
              rules: [{
                required: true, message: '请输入用户名!',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="输入密码"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入密码',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认密码"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>同意用户协议</Checkbox>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">注册</Button>
          </FormItem>
        </Form>
      </div>

    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm;