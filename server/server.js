var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var User = require('./model/User.js');
var Class = require('./model/Class.js');
var Class2 = require('./model/Class2.js');
var Product = require('./model/Product.js');
var Cart = require('./model/Cart.js');
var Submit = require('./model/Submit.js');
var Admin = require('./model/Admin.js');


app.use(express.json());
app.use(express.urlencoded({
	extended: true
}))

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1/yl", {
	useMongoClient: true
}).then(function() {
	console.log("数据库连接成功")
})



// 保存信息
// var p = [];
// p.forEach(function(post, index) {
// 	var _user = new Product(post)
// 	_user.save(function(err, doc) {
// 		if (err) {
// 			console.log(err);
// 			return
// 		}
// 		console.log("保存成功")
// 	})
// });
const _user = new Admin({
	userName: "admin",
	password: "admin",
})
_user.save();

// 获取分类
app.get("/api/class", function(req, res) {
	Class.find(function(err, doc) {
		if (err) {
			return res.json({
				error: "查询class失败",
			})
		}
		res.json({
			data: doc,
		})
	})
});

// 获取子分类
app.get("/api/class2", function(req, res) {
	Class2.find(function(err, doc) {
		if (err) {
			return res.json({
				error: "查询class2失败",
			})
		}
		res.json({
			data: doc,
		})
	})
});

// 获取子分类下的商品列表
app.post("/api/class3", function(req, res) {
	let {
		class3Id
	} = req.body;
	Product.find({
		class3Id
	}, function(err, doc) {
		if (err) {
			return res.json({
				error: "查询分类列表失败",
			})
		}
		res.json({
			data: doc,
		})
	})
});

//用户登录
app.post("/api/login/user", function(req, res) {
	let {
		userName,
		password
	} = req.body;
	User.find({
		userName
	}, function(err, doc) {
		if (err) {
			return res.json({
				error: "查询用户名失败",
			})
		}
		res.json({
			data: doc[0]
		})
	})
});

//用户注册
app.post("/api/login/register", function(req, res) {
	let {
		userName,
		password
	} = req.body;

	const _user = new User({
		userName,
		password,
	})
	/****用户名去重*****/
	User.find({
		userName
	}, function(err, doc) {
		if (err) {
			return res.json({
				error: "查询用户名失败",
			})
		}
		if (doc.length) {
			return res.json({
				warning: "用户名已存在"
			})
		}
		_user.save((err, doc) => {
			if (err) {
				return res.json({
					error: "注册新用户失败",
				})
			}
			res.json({
				data: doc
			})
		})
	})
});

//用户加入购物车
app.post("/api/InputCart", function(req, res) {
	let {
		userName,
		id,
		price,
		product_name,
		volume,
		middle_photo,
		product_desc,
	} = req.body;
	//查询是否已有购物信息，没有则新建，有则添加
	Cart.find({
		userName,
		id,
	}, function(err, doc) {
		if (err) {
			return res.json({
				error: "查询用户购物信息失败",
			})
		}
		// 没有找到用户此商品购物列表时
		if (doc.length === 0) {
			const _cart = new Cart({
				userName,
				id,
				price,
				product_name,
				volume,
				middle_photo,
				product_desc,
				number: 1,
			})
			return _cart.save((err, doc) => {
				if (err) {
					res.json({
						error: "加入购物车失败",
					})
					return;
				}
				res.json({
					success: "加入购物车成功",
					doc: doc,
				})
			})
		}
		// 存在该商品历史 增加数量
		const number = doc[0].number + 1;
		return Cart.update({
			userName,
			id
		}, {
			number
		}, (err, doc) => {
			if (err) {
				res.json({
					error: "加入购物车失败",
				})
				return;
			}
			res.json({
				success: "加入购物车成功",
				doc: doc,
			})
		})
	})
});

// 查询购物车列表
app.post("/api/cart", function(req, res) {
	let {
		userName,
	} = req.body;
	Cart.find({
		userName,
	}, function(err, doc) {
		if (err) {
			return res.json({
				error: "查询购物车失败",
			})
		}
		res.json({
			data: doc,
		})
	})
});

// 查询商品
app.post("/api/product", function(req, res) {
	let {
		id
	} = req.body;
	Product.find({
		id
	}, function(err, doc) {
		if (err) {
			return res.json({
				error: "查询分类列表失败",
			})
		}
		res.json({
			arr: doc[0],
		})
	})
});

// 购物车增加商品
app.post("/api/cartNumber", function(req, res) {
	let {
		userName,
		id,
		number
	} = req.body;
	Cart.update({
		userName,
		id,
	}, {
		number
	}, function(err, doc) {
		if (err) {
			return res.json({
				error: "查询购物车失败",
			})
		}
		res.json({
			success: "操作成功",
			data: doc,
		})
	})
});

// 购物车结算
app.post("/api/cartSubmit", function(req, res) {
	let {
		userName,
		price,
	} = req.body;
	// 加入订单
	Cart.find({
		userName
	}, (err, doc) => {
		if (err) {
			return res.json({
				error: "结算失败",
			})
		}
		const products = [];
		doc.forEach((pro) => {
			products.push(pro);
		})
		const _submit = new Submit({
			userName,
			products,
			price,
			pay: false,
		})
		_submit.save((err, doc) => {
			if (err) {
				return res.json({
					error: "结算失败",
				})
			}
			res.json({
				success: "操作成功",
				data: doc
			})
		});
		// 删除购物车
		Cart.remove({
			userName,
		}, function(err, doc) {
			if (err) {
				return res.json({
					error: "结算失败",
				})
			}
		})
	})
});

// 购物车删除
app.post("/api/cartDelete", function(req, res) {
	let {
		userName,
		id,
	} = req.body;
	console.log(userName, id);
	Cart.remove({
		userName,
		id,
	}, function(err, doc) {
		if (err) {
			return res.json({
				error: "删除购物车失败",
			})
		}
		res.json({
			success: "操作成功",
		})
	})
});

/***********后台管理系统**************/
// 查询商品列表
app.get("/api/admin/productList", function(req, res) {
	Product.find(function(err, doc) {
		if (err) {
			return res.json({
				error: "查询商品列表失败",
			})
		}
		res.json({
			data: doc,
		})
	})
});

// 查询商品列表-删除
app.post("/api/admin/productList/delete", function(req, res) {
	const {
		id
	} = req.body;
	Product.remove({
		id
	}, function(err, doc) {
		if (err) {
			return res.json({
				error: "删除商品失败",
			})
		}
		res.json({
			success: "删除商品成功",
		})
	})
});

// 查询商品列表-编辑
app.post("/api/admin/productList/update", function(req, res) {
	const {
		id,
		product_name,
		price,
		volume
	} = req.body;
	let value = {};
	if (product_name) {
		value.product_name = product_name;
	}
	if (price) {
		value.price = price;
	}
	if (volume) {
		value.volume = volume;
	}

	Product.update({
		id
	}, value, function(err, doc) {
		if (err) {
			return res.json({
				error: "编辑商品失败",
			})
		}
		res.json({
			success: "编辑商品成功",
		})
	})
});

// 查询关键词商品列表
app.post("/api/admin/productList", function(req, res) {
	const {
		value
	} = req.body;
	/************正则查询***************************/
	var reg = new RegExp(value, 'ig');
	Product.find({
			product_name: reg
		},
		function(err, doc) {
			if (err) {
				return res.json({
					error: "查询订单列表失败",
				})
			}
			res.json({
				data: doc,
			})
		})
});

// 查询订单列表-删除
app.post("/api/admin/submit/delete", function(req, res) {
	const {
		_id
	} = req.body;
	Submit.remove({
		_id
	}, function(err, doc) {
		if (err) {
			return res.json({
				error: "删除订单失败",
			})
		}
		res.json({
			success: "删除订单成功",
		})
	})
});

// 查询用户订单列表
app.post("/api/admin/submit/user", function(req, res) {
	const {
		userName
	} = req.body;
	Submit.find({
			userName,
		},
		function(err, doc) {
			if (err) {
				return res.json({
					error: "查询订单列表失败",
				})
			}
			res.json({
				data: doc,
			})
		})
});

// 读取用户地址
app.post("/api/user", function(req, res) {
	let {
		userName
	} = req.body;
	User.find({
		userName
	}, function(err, doc) {
		if (err) {
			return res.json({
				error: "查询用户名失败",
			})
		}
		res.json({
			data: doc[0]
		})
	})
});
// 读订单
app.post("/api/submit", function(req, res) {
	let {
		_id,
	} = req.body;
	Submit.find({
		_id
	}, function(err, doc) {
		if (err) {
			return res.json({
				error: "查询失败",
			})
		}
		res.json({
			data: doc[0],
		})
	})
});

// 读订单 all
app.get("/api/submit/all", function(req, res) {
	Submit.find(function(err, doc) {
		if (err) {
			return res.json({
				error: "查询失败",
			})
		}
		res.json({
			data: doc,
		})
	})
});

// 查询关键词订单列表
app.post("/api/admin/submit", function(req, res) {
	const {
		value
	} = req.body;
	/************正则查询***************************/
	var reg = new RegExp(value, 'ig');
	Submit.find({
			userName: reg
		},
		function(err, doc) {
			if (err) {
				return res.json({
					error: "查询订单列表失败",
				})
			}
			res.json({
				data: doc,
			})
		})
});


// 支付
app.post("/api/pay", function(req, res) {
	let {
		_id
	} = req.body;
	Submit.update({
		_id
	}, {
		pay: true
	}, function(err, doc) {
		if (err) {
			return res.json({
				error: "支付失败",
			})
		}
		res.json({
			success: "支付成功"
		})
	})
});

//用户设置地址
app.post("/api/user/address", function(req, res) {
	let {
		userName,
		name,
		tel,
		add,
	} = req.body;
	const address = {
		name,
		tel,
		add,
	}
	User.findOneAndUpdate({
		userName
	}, {
		address
	}, function(err, doc) {
		if (err) {
			return res.json({
				error: "设置失败",
			})
		}
		res.json({
			success: "设置成功",
		})
	})
});

app.post("/api/admin/login", function(req, res) {
	let {
		userName,
		password
	} = req.body;
	Admin.find({
		userName
	}, (err, doc) => {
		if (err) {
			return res.json({
				error: "登录失败",
			})
		}
		if (!(doc && doc.length > 0)) {
			return res.json({
				error: "登录失败",
			})
		}
		if (doc[0].password === password) {
			res.json({
				success: "登录成功",
			})
		}
	})
});

app.listen(8090);