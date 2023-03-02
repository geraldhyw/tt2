const User = require('../models/userModel')

// login user
const loginUser = async (req, res) => {
	res.json({msg: 'login user'})
}

// signup user
const signupUser = async (req, res) => {
	const { EmployeeID, Password } = req.body

	try {
		const user = await User.signup(EmployeeID, Password)

		res.status(200).json({user})
	} catch (error) {
		res.status(400).json({error: error.message})
	}
}

module.exports = { loginUser, signupUser }