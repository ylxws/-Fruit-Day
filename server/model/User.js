var mongoose = require("mongoose");
var UserSchema = mongoose.Schema({
	userName: String,
	password: String,
	address: {
		name: String,
		tel: Number,
		add: String,
	},
});

var User = mongoose.model("Users", UserSchema);
module.exports = User;