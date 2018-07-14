var mongoose = require("mongoose"); //连接数据库
var CartSchema = mongoose.Schema({ //创建Schema数据库模型骨架
	userName: String, // key: 数据类型
	id: String,
	product_name: String,
	volume: String,
	middle_photo: String,
	product_desc: String,
	price: Number,
	number: Number,
	createTime: {
		type: Date,
		default: Date.now,
	},
});
// 创建model
var Cart = mongoose.model("carts", CartSchema);
module.exports = Cart; // 暴露接口

/*
	Cart=[
		{
			ProductId: '',
			number: 3,
			}
	]
	product = [{
		ProductId,
		number,
		product_name,
		volume,
		middle_photo,
	price

	}]
*/