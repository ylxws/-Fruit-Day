import React, {
  Component
} from 'react';
import {
  message,
  Icon
} from 'antd';
import axios from 'axios';

import './order.less';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    const id = location.search.split("&&")[0].split("=")[1];
    axios.post('/api/product', {
      id,
    }).then(param => {
      if (param.data.error) {
        return message.error(param.data.error);
      }
      this.setState({
        data: param.data.arr,
      })
    })
  }

  handleInputCart = () => {
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

  render() {
    const {
      data
    } = this.state;
    return (
      <div className="detail">
       <header>
          <a href="javascript:history.go(-1)">
            <Icon type="left" />
          </a>
          <div className="title">
            {data.product_name}
          </div>
        </header>
        <div className="container">
          <a className="pro">
            <img className="good-img" src={data.middle_photo} alt=""/>
            <dl>
              <dt>{data.product_name}</dt>
              <dd>{data.product_desc}</dd>
              <div className="price">
                <small>￥</small>
                <big>{data.price}</big>
                <small></small>
              </div>
            </dl>
          </a>
          <div className="pic">
            商品详情图
            <img src="https://imgjd2.fruitday.com/up_images/20170502/14936931525542.jpg" _src="https://imgjd2.fruitday.com/up_images/20170502/14936931525542.jpg" />
            <img src="https://imgjd2.fruitday.com/up_images/20170502/14936931531970.jpg" _src="https://imgjd2.fruitday.com/up_images/20170502/14936931531970.jpg" />
            <img src="https://imgjd2.fruitday.com/up_images/20170502/14936931555730.jpg" _src="https://imgjd2.fruitday.com/up_images/20170502/14936931555730.jpg" />
            <img src="https://imgjd3.fruitday.com/up_images/20180504/15254198225006.jpg" _src="https://imgjd3.fruitday.com/up_images/20180504/15254198225006.jpg" />
         </div>
        </div>
        <footer className="main-nav" id="cart-nav">
          <a className="cart-btn" href="/cart">
            <Icon type="shopping-cart" />
          </a> 
          <a className="add-cart" href="javascript:;">
            <span onClick={this.handleInputCart}>加入购物车</span>
          </a>
        </footer>
      </div>
    );
  }
}

export default Order;