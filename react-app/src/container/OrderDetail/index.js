import React, {
  Component
} from 'react';
import {
  Icon,
  Button,
  message
} from 'antd';
import axios from 'axios';
import ProductItem from 'container/ProductItem';
import cart_empty from 'public/image/cart_empty.png';

import Bottom from 'component/Bottom';
import './cart.less';

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {
        products: [],
      },
      address: '',
    };
  }

  componentWillMount() {
    const user = sessionStorage.getItem("user");
    if (!user) {
      return location.href = "/login";
    }
    const userName = user.split(',')[0].split(":")[1].slice(1, -1);
    const _id = location.search.split("=")[1];
    this.setState({
      userName,
      _id
    })
    axios.post('/api/user', {
      userName
    }).then(param => {
      this.setState({
        address: param.data.data.address,
      })
    })
    // 获取数据
    axios.post('/api/submit', {
      _id,
    }).then((param) => {
      if (param.data.error) {
        return message.error(param.data.error);
      }
      this.setState({
        order: param.data.data,
      })
    });
  }

  hanldePay = () => {
    const {
      order,
      address,
    } = this.state;
    if (!address) {
      message.error("请添加收货地址");
    }
    axios.post("/api/pay", {
      _id: order._id
    }).then(param => {
      if (param.data.error) {
        return message.error(param.data.error);
      }
      if (param.data.success) {
        return message.success(param.data.success);
      }
    })
  }

  render() {
    const {
      order,
      address
    } = this.state;
    return (
      <div className="orderdetail">
        <header>
          <a href="/cart"><Icon type="left" /></a>
          订单详情
        </header>
        <div className="content">
          <section className="container order-detail" id="orderDetail">
            <div className="section flex states">  
              <i className="iconfont icon-centerwaitpay"></i> 
              <div className="info"> 
                <span>待付款</span>  
              </div>  
            </div>
            <div className="section"> 
              <div className="has-btn delivery flex"> 
              <p>订单编号：
                <input className="order-no" id="orderNo" value={order._id}/>
              </p> 
            </div> 
            <div className="my-address flex"> 
              <p className="left">收货地址：</p> 
              <div className="contentadd">
                <p className="address-info">{address ? address.add : ""}</p> 
                <a href="/user">请到我的页面设置收货地址</a>
              </div> 
            </div> 
          </div> 
          <div className="section goods-list">  
            <div className="once">{order.products.length}件商品</div> 
              {
                order.products.map((pro) => {
                  return (
                    <a className="goods" href="../main/good-detail.html?product_id=24505"> 
                      <div className="img"> 
                        <img src={pro.middle_photo} alt={pro.product_name}/> 
                      </div> 
                      <div className="volume"> 
                        <strong>{pro.product_name}</strong> 
                        <small>{pro.volume}&nbsp;&nbsp;&nbsp;</small> 
                      </div> 
                      <div className="amount">x{pro.number} 
                        <span>￥{pro.price}</span>
                      </div>
                    </a>
                  );
                })
              }  
            </div>
            <div className="postage"> 
              <dl className="title"> 
                <dt>商品总价</dt> 
                <dd>￥{order.price}</dd> 
              </dl> 
              <div className="sale"> 
                <dl> 
                  <dt>配送费</dt> 
                  <dd>￥0.00</dd> 
                </dl>      
              </div> 
              <div className="total flex">
                <p className="amount">实付金额: <span>￥{order.price}</span></p> 
              </div>
            </div> 
            <div className="section invoice">
              <p>支付状态：<span>还未付款</span></p> 
              <p>下单时间：<span>{order.createTime}</span></p> 
            </div>
          </section>
        </div>
        <Button className="paynow" onClick={this.hanldePay}>立即支付</Button>
      </div>
    );
  }
}

export default OrderDetail;