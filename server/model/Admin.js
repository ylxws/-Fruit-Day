var mongoose = require("mongoose");
var AdminSchema = mongoose.Schema({
	userName: String,
	password: String,
});

var Admin = mongoose.model("admins", AdminSchema);
module.exports = Admin;