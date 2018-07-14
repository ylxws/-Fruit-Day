var mongoose = require("mongoose"); //连接数据库
var SubmitSchema = mongoose.Schema({ //创建Schema数据库模型骨架
	userName: String, // key: 数据类型
	products: Array,
	price: Number,
	createTime: {
		type: Date,
		default: Date.now,
	},
	pay: Boolean,
});
// 创建model
var Submit = mongoose.model("submits", SubmitSchema);
module.exports = Submit; // 暴露接口

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