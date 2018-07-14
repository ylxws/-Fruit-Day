import React, {
  Component
} from 'react';
import {
  Icon,
  message
} from 'antd';
import axios from 'axios';
import Bottom from 'component/Bottom';
import Banner from 'component/Banner';
import './add.less';

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ok: false,
    };
  }

  getName = (e) => {
    this.setState({
      name: e.target.value,
    }, () => {
      const {
        name,
        tel,
        add
      } = this.state;
      if (name && tel && add) {
        this.setState({
          ok: true,
        })
      }
    })
  }
  getPhone = (e) => {
    this.setState({
      tel: e.target.value,
    }, () => {
      const {
        name,
        tel,
        add
      } = this.state;
      if (name && tel && add) {
        this.setState({
          ok: true,
        })
      }
    })
  }
  getAdd = (e) => {
    this.setState({
      add: e.target.value,
    }, () => {
      const {
        name,
        tel,
        add
      } = this.state;
      if (name && tel && add) {
        this.setState({
          ok: true,
        })
      }
    })
  }

  handleSave = () => {
    const {
      name,
      tel,
      add
    } = this.state;
    if (!(name && tel && add)) {
      return message.error('请输入完整地址信息');
    }

    const user = sessionStorage.getItem("user");
    if (!user) {
      return location.href = "/login";
    }
    const userName = user.split(',')[0].split(":")[1].slice(1, -1);

    // 村数据库 页面跳转
    axios.post("/api/user/address", {
      userName,
      name,
      tel,
      add,
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
    const name = this.state.ok ? "" : "disable";
    return (
      <div className="address">
        <header>
          <a href="javascript:history.back()"><Icon type="close" /></a>
          <div className="title">
            选择收货地址
          </div>
        </header>
        <div className="content">
          <section 
          class="container receipt-address m-address" 
          id="addrBox"
          >
            <div class="section address-infor"> 
              <div class="form-group"> 
                <label for="name">收货人</label> 
                <div class="input-box"> 
                  <input
                  type="text"
                  id="name"
                  placeholder="收货人姓名"
                  onChange={this.getName}
                  /> 
                </div> 
              </div> 
              <div class="form-group"> 
                <label for="tele">收货人手机</label> 
                <div class="input-box"> 
                  <input
                  type="tel"
                  maxlength="11"
                  id="tele"
                  placeholder="手机号码"
                  onChange={this.getPhone}
                  /> 
                </div> 
              </div> 
              <div class="form-group detail"> 
                <label for="addrName">收货地址</label>
                <div class="input-box"> 
                  <input
                  id="tele"
                  placeholder="详细地址"
                  onChange={this.getAdd}
                  />
                </div> 
              </div> 
              <div class="btnBox"> 
                <a
                href="javascript:;"
                class="orange-button medium-btn warning"
                onClick={this.handleSave}
                className={name}
                >保存并使用</a>  
              </div>
            </div>
          </section>         
        </div>
      </div>
    );
  }
}

export default Address;