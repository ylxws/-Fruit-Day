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

import './product.less';
const {
  Search
} = Input;
const columns = [{
  title: '商品Id',
  dataIndex: 'id',
}, {
  title: '名称',
  dataIndex: 'product_nametext',
}, {
  title: '规格',
  dataIndex: 'volumetext',
}, {
  title: '价格',
  dataIndex: 'pricetext',
}, {
  title: '操作',
  dataIndex: 'operate',
}];

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    axois.get('/api/admin/productList').then(param => {
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
            title="确认操作该商品？"
            okText="是"
            cancelText="否"
            onConfirm={() => { this.handleDelete(col.id) }}
            >
              <a>删除</a>
            </Popconfirm>
            <a
            className="edit"
            onClick={() => { this.handleEditSatus(col.id) }}
            >编辑</a>
          </span>
        );
        col.product_nametext = col.product_name;
        col.volumetext = col.volume;
        col.pricetext = col.price;
        return col;
      });
      this.setState({
        list,
      })
    })
  }

  handleEditSatus = (id) => {
    let {
      list
    } = this.state;
    list = list.map((pro) => {
      if (pro.id === id) {
        pro.editStatus = true;
        // pro.editStatus = !pro.editStatus;
        if (pro.editStatus) {
          pro.product_nametext = (
            <Input
            defaultValue={pro.product_name}
            onChange={(e) => { this.handleEdit(e, "product_name") }}
            />
          );
          pro.volumetext = (
            <Input
            defaultValue={pro.volume}
            onChange={(e) => { this.handleEdit(e, "volume") }}
            />
          );
          pro.pricetext = (
            <Input
            defaultValue={pro.price}
            onChange={(e) => { this.handleEdit(e, "price") }}
            />
          );
          pro.operate = (
            <span>
            <Popconfirm
            title="确认删除该商品？"
            okText="是"
            cancelText="否"
            onConfirm={() => { this.handleDelete(pro.id) }}
            >
              <a>删除</a>
            </Popconfirm>
            <Popconfirm
            title="确认删除该商品？"
            okText="是"
            cancelText="否"
            onConfirm={() => { this.handleEditSave(pro.id) }}
            >
              <a className="edit">保存</a>
            </Popconfirm>
          </span>
          );
        } else {
          pro.product_nametext = pro.product_name;
          pro.volumetext = pro.volume;
          pro.pricetext = pro.price;
        }
      }
      return pro;
    });
    this.setState({
      list,
    })
  }

  handleEditSave = (id) => {
    const {
      product_name,
      price,
      volume
    } = this.state;
    let value = {
      id
    };
    if (product_name) {
      value.product_name = product_name;
    }
    if (price) {
      value.price = price;
    }
    if (volume) {
      value.volume = volume;
    }
    axois.post('/api/admin/productList/update', value).then(param => {
      if (param.data.error) {
        return message.error(param.data.error);
      }
      this.handleGetNew();
      if (param.data.success) {
        return message.success(param.data.success);
      }
    });
  }

  handleEdit = (e, name) => {
    if (name === "price") {
      this.setState({
        price: e.target.value,
      })
    } else if (name === "volume") {
      this.setState({
        volume: e.target.value,
      })
    } else {
      this.setState({
        product_name: e.target.value,
      })
    }
  }

  handleGetNew = () => {
    axois.get('/api/admin/productList').then(param => {
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
            title="确认删除该商品？"
            okText="是"
            cancelText="否"
            onConfirm={() => { this.handleDelete(col.id) }}
            >
              <a>删除</a>
            </Popconfirm>
            <a
            className="edit"
            onClick={() => { this.handleEditSatus(col.id) }}
            >编辑</a>
          </span>
        );
        col.product_nametext = col.product_name;
        col.volumetext = col.volume;
        col.pricetext = col.price;
        return col;
      });
      this.setState({
        list,
      })
    })
  }

  handleDelete = (id) => {
    axois.post('/api/admin/productList/delete', {
      id
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
    axois.post('/api/admin/productList', {
      value
    }).then(param => {
      if (param.data.error) {
        return message.error(param.data.error);
      }
      const {
        data
      } = param.data;
      console.log(data);
      const list = data.map((col) => {
        col.operate = (
          <span>
            <Popconfirm
            title="确认删除该商品？"
            okText="是"
            cancelText="否"
            onConfirm={() => { this.handleDelete(col.id) }}
            >
              <a>删除</a>
            </Popconfirm>
            <a
            className="edit"
            onClick={() => { this.handleEditSatus(col.id) }}
            >编辑</a>
          </span>
        );
        col.product_nametext = col.product_name;
        col.volumetext = col.volume;
        col.pricetext = col.price;
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
      <div className="product">
        <h1>商品管理</h1>
        <div className="container">
        <Search
          placeholder="商品名"
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

export default Product;