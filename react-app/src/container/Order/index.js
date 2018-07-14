import React, {
  Component
} from 'react';
import {
  message,
  Icon,
  Carousel
} from 'antd';
import axios from 'axios';

import './submit.less';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.getNew();
  }

  getNew = () => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      return location.href = "/login";
    }
    const userName = user.split(',')[0].split(":")[1].slice(1, -1);

    axios.post('/api/admin/submit/user', {
      userName
    }).then(param => {
      if (param.data.error) {
        return message.error(param.data.error);
      }
      const {
        data
      } = param.data;
      this.setState({
        list: data,
      })
    })
  }

  handleDel = (_id) => {
    axios.post("/api/admin/submit/delete", {
      _id,
    }).then(param => {
      if (param.data.error) {
        return message.error(param.data.error);
      }
      if (param.data.success) {
        this.getNew();
        return message.success(param.data.success);
      }
    })
  }

  handleDom = (param) => {
    if (param.length === 0) {
      return null;
    }
    return param.map((pro) => {
      return (
        <div class="order"> 
          <dl class="_id">
            <em>P18052808193123</em>
            <dd class="status">{pro.pay ? "已支付" : "未支付"}</dd> 
          </dl>  
          {/*
          <Carousel autoplay>
            {
              !pro.products ? null : (
                pro.products.map((p) => {
                  return <img className="pic" src={p.middle_photo}/>
                })
              )
            }
            </Carousel>
          */}
          <div className="picBox">
          {
              !pro.products ? null : (
                pro.products.map((p) => {
                  return <img className="pic" src={p.middle_photo}/>
                })
              )
            }
          </div>
          <div class="price">共3件商品 合计: 
            <strong>￥244.00</strong>(含运费￥0.00)
          </div> 
          <div class="btn">   
            <a href="javascript:;" class="del" onClick={() => {this.handleDel(pro._id)}}>删除订单</a>
          </div> 
        </div>
      );
    })
  }

  render() {
    const {
      list
    } = this.state;
    const dom = this.handleDom(list);
    return (
      <div className="submit">
       <header>
          <a href="javascript:history.go(-1)">
            <Icon type="left" />
          </a>
          <div className="title">
            全部订单
          </div>
        </header>
        <div className="container">
          {dom}
        </div>
      </div>
    );
  }
}

export default Order;