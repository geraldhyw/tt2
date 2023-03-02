const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

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

	// validation
	if (!EmployeeID || !Password) {
		throw Error('All fields must be filled!')
	}
	if (!validator.isStrongPassword(Password)) {
		throw Error('Password is not strong enough!')
	}
	
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

// static login method
userSchema.statics.login = async function (EmployeeID, Password) {

	// validation
	if (!EmployeeID || !Password) {
		throw Error('All fields must be filled!')
	}

	// check if EmployeeID exists
	const user = await this.findOne({ EmployeeID })
	if (!user) {
		throw Error('Incorrect EmployeeID!')
	}

	// check if password matches
	const match = await bcrypt.compare(Password, user.Password)
	if (!match) {
		throw Error('Incorrect Password!')
	}

	return user
}

module.exports = mongoose.model('User', userSchema)