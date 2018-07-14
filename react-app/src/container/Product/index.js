import React, {
  Component
} from 'react';
import {
  Icon
} from 'antd';

import axios from 'axios';
import ProductItem from 'container/ProductItem';

import './product.less';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const that = this;
    const class3Id = location.search.split("&&")[0].split("=")[1];
    axios.post('/api/class3', {
      class3Id,
    }).then((param) => {
      if (param.data.error) {
        return message.error(param.data.error);
      }
      that.setState({
        data: param.data.data,
      });
    });
  }

  handleDom = (param) => {
    return param.map((p) => {
      return <ProductItem data={p} />
    });
  }

  render() {
    const class3Name = decodeURI(location.search.split("&&")[1].split("=")[1]);
    const dom = this.handleDom(this.state.data);
    return (
      <div className="product">
        <header>
          <nav>
          <div className="back">
            <a href="/kind" className="iconfont icon-morehome">
              <Icon type="left" />
            </a>
          </div>
          <div className="text">{class3Name}</div>
          <a href="/cart" className="iconcart">
            <Icon type="shopping-cart" />
          </a>
          </nav>
        </header>
        <div className="list">
          {dom}
        </div>
      </div>
    );
  }
}

export default Product;