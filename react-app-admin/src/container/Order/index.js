import React, {
  Component
} from 'react';
import {
  message,
  Table,
  Popconfirm,
  Input
} from 'antd';
import axois from 'axios';

import './order.less';

const {
  Search
} = Input;

const columns = [{
  title: '订单号',
  dataIndex: '_id',
}, {
  title: '下单人',
  dataIndex: 'userName',
}, {
  title: '商品',
  dataIndex: 'products',
}, {
  title: '价格',
  dataIndex: 'price',
}, {
  title: '时间',
  dataIndex: 'createTime',
}, {
  title: '是否支付',
  dataIndex: 'paytext',
}, {
  title: '操作',
  dataIndex: 'operate',
}];

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.handleGetNew();
  }

  handleGetNew = () => {
    axois.get('/api/submit/all').then(param => {
      if (param.data.error) {
        return message.error(param.data.error);
      }
      const {
        data
      } = param.data;
      const list = data.map((col) => {
        col.operate = (
          <span>
            <Popconfirm
            title="确认删除该订单及？"
            okText="是"
            cancelText="否"
            onConfirm={() => { this.handleDelete(col._id) }}
            >
              <a>删除</a>
            </Popconfirm>
          </span>
        );
        if (col.pay) {
          col.paytext = "是";
        } else {
          col.paytext = "否";
        }
        col.price = col.price.toFixed(2);
        col.products = col.products.map(pro => {
          return <div>{pro.product_name}<span>X{pro.number}</span></div>
        })
        return col;
      });
      this.setState({
        list,
      })
    })
  }

  handleDelete = (_id) => {
    axois.post('/api/admin/submit/delete', {
      _id
    }).then(p => {
      if (p.data.error) {
        return message.error(p.data.error);
      }
      this.handleGetNew();
      return message.success(p.data.success);
    });
  }

  handleSearch = (value) => {
    // 根据关键词查找 用户名 
    axois.post('/api/admin/submit', {
      value
    }).then(param => {
      if (param.data.error) {
        return message.error(param.data.error);
      }
      const {
        data
      } = param.data;
      const list = data.map((col) => {
        col.operate = (
          <span>
            <Popconfirm
            title="确认删除该订单及该用户购物车记录？"
            okText="是"
            cancelText="否"
            onConfirm={() => { this.handleDelete(col._id) }}
            >
              <a>删除</a>
            </Popconfirm>
          </span>
        );
        if (col.pay) {
          col.paytext = "是";
        } else {
          col.paytext = "否";
        }
        col.price = col.price.toFixed(2);
        col.products = col.products.map(pro => {
          return <div>{pro.product_name}<span>X{pro.number}</span></div>
        })
        return col;
      });
      this.setState({
        list,
      })
    })
  }

  render() {
    const {
      list
    } = this.state;
    return (
      <div className="order">
        <h1>订单管理</h1>
        <div className="container">
        <Search
          placeholder="用户名"
          onSearch={this.handleSearch}
          enterButton
        />
          <Table
            columns={columns}
            dataSource={list}
            bordered
          />
        </div>
      </div>
    );
  }
}

export default Order;