require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')

const app = express()


mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log('connected to DB & listening on port', process.env.PORT)
		})
	})
	.catch((err) => {
		console.log(err)
	})

// middleware
app.use(express.json())
app.use((req, res, next) => {
	console.log(req.path, req.method)
	next()
})

// routes
app.use('/api/user', userRoutes)