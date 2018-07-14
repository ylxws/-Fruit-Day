import React, {
  Component
} from 'react';
import {
  Icon,
  Checkbox,
  Button,
  message
} from 'antd';
import axios from 'axios';
import ProductItem from 'container/ProductItem';
import cart_empty from 'public/image/cart_empty.png';

import Bottom from 'component/Bottom';
import './cart.less';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      totalPrice: 0,
    };
  }

  componentWillMount() {
    this.getNew();
  }

  getNew = () => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      return location.href = "/login";
    }
    const userName = user.split(',')[0].split(":")[1].slice(1, -1);

    axios.post('/api/cart', {
      userName,
    }).then((param) => {
      if (param.data.error) {
        return message.error(param.data.error);
      }
      let totalPrice = 0;
      param.data.data.forEach((item) => {
        totalPrice += item.price * item.number;
        this.setState({
          totalPrice,
          cart: param.data.data,
        });
      });
    });
  }

  handleDom = (param) => {
    if (param.length === 0) {
      return;
    }
    return param.map((p) => {
      if (!p) {
        return null;
      }
      return (
        <ProductItem
          data={p}
          cart={true}
          getTotal={this.handlePrice}
          key={p._id}
          getDelete={this.handleDelete}
        />
      )
    });
  }

  handlePrice = (price) => {
    let {
      totalPrice,
    } = this.state;
    totalPrice += price;
    this.setState({
      totalPrice,
    })
  }


  handleDelete = () => {
    this.getNew();
  }

  handleCart() {
    const dom = this.handleDom(this.state.cart);
    if (this.state.cart.length === 0) {
      return (
        <div className="empty">
          <header>
            购物车
          </header>
          <div className="content">
            <img className="nopro" src="https://wap.fruitday.com/content/images/main/cart_empty-172251d77c.png" alt=""/>
            <p className="notext">购物车还是空的哟</p>
          </div>
        </div>
      );
    }
    return (
      <div className="noempty">
        <header>
          购物车
        </header>
        <div className="content">
          <a className="address" href="/address">
            <span>
              <Icon type="environment" />
              添加地址
            </span>
            <Icon type="right" />
          </a>
          {dom}
        </div>
      </div>
    );
  }

  handleSubmit = () => {
    const {
      totalPrice
    } = this.state;

    const user = sessionStorage.getItem("user");
    if (!user) {
      return location.href = "/login";
    }
    const userName = user.split(',')[0].split(":")[1].slice(1, -1);

    if (totalPrice === 0) {
      return message.error("请选择结算的商品！");
    }

    axios.post("/api/cartSubmit", {
      userName,
      price: totalPrice
    }).then(param => {
      if (param.data.error) {
        return message.error("结算失败，请重试！");
      }
      location.href = `/orderdetail?_id=${param.data.data._id}`;
    })

  }

  render() {
    const {
      cart,
    } = this.state;
    let {
      totalPrice
    } = this.state;
    totalPrice = totalPrice.toFixed(2);
    const address = this.handleCart();
    let account = (
      <div className="account">
        <Button onClick={this.handleSubmit}>结算</Button>
        <span className="count">合计: <b>￥{totalPrice}</b></span>
      </div>
    );
    this.state.cart.length === 0 ? account = null : null;
    return (
      <div className="cart">
        {address}
        {account}
        <Bottom />
      </div>
    );
  }
}

export default Cart;