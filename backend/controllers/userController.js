const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// create token
const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
	const { EmployeeID, Password } = req.body

	try {
		const user = await User.login(EmployeeID, Password)

		// create token
		const token = createToken(user._id)

		res.status(200).json({EmployeeID, token})
	} catch (error) {
		res.status(400).json({error: error.message})
	}
}

// signup user
const signupUser = async (req, res) => {
	const { EmployeeID, Password, FirstName, LastName, Age } = req.body

	try {
		const user = await User.signup(EmployeeID, Password, FirstName, LastName, Age)

		// create token
		const token = createToken(user._id)

		res.status(200).json({EmployeeID, token})
	} catch (error) {
		res.status(400).json({error: error.message})
	}
}

module.exports = { loginUser, signupUser }