var mongoose = require("mongoose");
var ClassSchema = mongoose.Schema({
	id: String,
	name: String,
});

var Class = mongoose.model("Classes", ClassSchema);
module.exports = Class;