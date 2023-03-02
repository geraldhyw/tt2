const express = require('express')
const { getAllClaims, createClaim, updateClaim, deleteClaim } = require('../controllers/claimController') // controller functions

const router = express.Router()

// GET all claims
router.post('/', getAllClaims)

// POST single claim
router.post('/claims/:EmployeeID', createClaim)

// PATCH single claim
router.post('/claims/:EmployeeID', updateClaim)

// DELETE single claim
router.post('/claims/:EmployeeID', deleteClaim)

module.exports = router