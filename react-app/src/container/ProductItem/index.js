import React, {
  Component
} from 'react';
import {
  message,
  Checkbox,
  Button,
  Popconfirm
} from 'antd';

import axios from 'axios';

import './productItem.less';
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      select: true,
      selectAll: this.props.selectAll,
    };
  }

  componentDidMount() {
    this.setState({
      data: this.props.data,
    });
  }

  componentWillReceiveProps(prop) {
    const {
      selectAll
    } = this.state;
    const {
      data,
    } = prop;
    this.setState({
      data,
      stop: false,
      selectAll: prop.selectAll
    })
    if (selectAll !== prop.selectAll) {
      this.setState({
        select: prop.selectAll
      })
    }
  }
  // 数量加减
  addCart(id, less) {
    const {
      data,
      select,
    } = this.state;
    let number = 1;
    if (less) {
      number = -1;
      if (data.number === 1) {
        return;
      }
    }
    const user = sessionStorage.getItem("user");
    if (!user) {
      return location.href = "/login";
    }
    const userName = user.split(',')[0].split(":")[1].slice(1, -1);
    const values = {
      userName,
      id,
      number: data.number + number,
    };
    axios.post('/api/cartNumber', values).then(param => {
      if (param.data.error) {
        return message.error(param.data.error);
      }
      if (param.data.success) {
        return message.success(param.data.success);
      }
    });
    data.number = data.number + number;
    this.setState({
      data,
    })
    this.props.getTotal(number * this.state.data.price);
  }

  inputCart = (Price, Id) => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      return location.href = "/login";
    }
    const userName = user.split(',')[0].split(":")[1].slice(1, -1);
    const {
      price,
      product_name,
      volume,
      middle_photo,
      id,
      product_desc,
    } = this.state.data;
    axios.post('/api/InputCart', {
      userName,
      id,
      price,
      product_name,
      volume,
      middle_photo,
      product_desc,
    }).then(param => {
      if (param.data.error) {
        return message.error(param.data.error.msg);
      }
      if (param.data.success) {
        return message.success(param.data.success);
      }
    });
  }

  handleDelete = () => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      return location.href = "/login";
    }
    const userName = user.split(',')[0].split(":")[1].slice(1, -1);
    const {
      id,
    } = this.state.data;
    axios.post('/api/cartDelete', {
      id,
      userName,
    }).then(param => {
      if (param.data.error) {
        return message.error(param.data.error);
      }
      this.props.getDelete(id);
      if (param.data.success) {
        return message.success(param.data.success);
      }
    });
  }

  render() {
    const {
      select,
      data,
    } = this.state;
    const {
      cart,
    } = this.props; //购物车页面
    const href = `/detail?ProductId=${data.id}`;
    return (
      <a className="item">
        <a href={href}>
          <img className="good-img" src={data.middle_photo} alt=""/>
          <dl className="">
            <dt>{data.product_name}</dt>
            <dd>{data.product_desc}</dd>
            <dd>{data.volume}</dd> 
            <div className="price">
              <small>￥</small>
              <big>{data.price}</big>
              <small></small>
            </div>
          </dl>
        </a> {
        cart ? (
          <div className="count">
            <Popconfirm
            title="确认删除"
            okText="是"
            cancelText="否"
            placement="leftTop"
            onConfirm={this.handleDelete}
            >
              <Button>删除</Button>
            </Popconfirm>
              <span
                className="plus"
                onClick={() => {this.addCart(data.id, {less: true})}}
              >
                <i className="iconfont icon-searchplus">-</i>
              </span>
              <span className="plus">{data.number}</span>
              <span
                className="plus"
                onClick={() => {this.addCart(data.id)}}
              >
                <i className="iconfont icon-searchplus">+</i>
              </span>
            </div>
        ) : (
          <div className="count">
            <span
              className="plus"
              onClick={() => {this.inputCart(Number(data.price), data.id)}}
            >
              <i className="iconfont icon-searchplus">+</i>
            </span>
          </div>
        )
      } 
      </a>
    );
  }
}

export default Product;