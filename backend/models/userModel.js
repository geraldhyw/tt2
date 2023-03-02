const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
	EmployeeID: {
		type: Number,
		required: true,
		unique: true
	},
	Password: {
		type: String,
		required: true
	}
})

// static signup method
userSchema.statics.signup = async function (EmployeeID, Password) {
	
	// check if EmployeeID exists
	const idExists = await this.findOne({ EmployeeID })
	if (idExists) {
		throw Error('Account with specified EmployeeID already created!')
	}

	// hash password
	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(Password, salt)

	// create user in database
	const user = await this.create({ EmployeeID, Password: hash })

	return user


}

module.exports = mongoose.model('User', userSchema)