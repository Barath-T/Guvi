const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
	      type: String,
	      required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	passwordHash: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	dob: {
		type: Date,
		required: true
	},
	mobile: {
		type: Number,
		required: true
	},
});

userSchema.set("toJSON", {
  transform: function (doc, retObj) {
    delete retObj.passwordHash;
  }
})

module.exports = mongoose.model("User", userSchema);
