const express = require('express')
const { loginUser } = require('../controllers/userController') // controller functions

const router = express.Router()

// login route
router.post('/login', loginUser)

module.exports = router