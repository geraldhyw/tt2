require('dotenv').config()
const express = require('express')
const userRoutes = require('./routes/user')

const app = express()
app.listen(process.env.PORT, () => {
	console.log('listening on port', process.env.PORT)
})

// middleware
app.use(express.json())
app.use((req, res, next) => {
	console.log(req.path, req.method)
	next()
})

// routes
app.use('/api/user', userRoutes)