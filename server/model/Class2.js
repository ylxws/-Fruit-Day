var mongoose = require("mongoose");
var Class2Schema = mongoose.Schema({
	id: String,
	name: String,
	class2Id: String,
	cat_path: String,
	photo: String,
	class_photo: String,
});

var Class2 = mongoose.model("Class2s", Class2Schema);
module.exports = Class2;