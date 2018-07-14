import React, {
	Component
} from 'react';
import {
	Icon
} from 'antd';

import Bottom from 'component/Bottom';
import './user.less';

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
		};
	}

	componentDidMount() {
		const user = sessionStorage.getItem("user");
		if (!user) {
			return location.href = "/login";
		}
		const userName = user.split(',')[0].split(":")[1].slice(1, -1);
		this.setState({
			userName,
		});
	}

	render() {
		const {
			userName
		} = this.state;
		const href = `/order?userName=${userName}`;
		return (
			<div className="user">
				<header>
          <div className="title">
            我的农场
          </div>
        </header>
				<div className="top">
					<Icon type="user" />
					<span>{userName}</span>
				</div>
        <div className="content">
        	<div className="order">
        		<Icon type="file-text" />
        		<span>我的订单</span>
        		<a href={href}>全部订单</a>
        	</div>
        	<div className="order">
        		<Icon type="file-text" />
        		<span>收货地址</span>
        		<a href="/address">设置地址</a>
        	</div>
        	<div className="detail">
        		<Icon type="pay-circle-o"><span>待付款</span></Icon>
        		<Icon type="medicine-box"><span>待发货</span></Icon>
        		<Icon type="car"><span>待收货</span></Icon>
        		<Icon type="message"><span>待评价</span></Icon>
        		<Icon type="retweet"><span>退换货</span></Icon>
        	</div>
        </div>
        <Bottom />
      </div>
		);
	}
}

export default User;