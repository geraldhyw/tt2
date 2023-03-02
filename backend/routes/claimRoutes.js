const express = require('express')
const { getAllClaims, createClaim, updateClaim, deleteClaim } = require('../controllers/claimController') // controller functions

const router = express.Router()

// GET all claims
router.get('/:EmployeeID', getAllClaims)

// POST single claim
router.post('/:EmployeeID', createClaim)

// PATCH single claim
router.patch('/:EmployeeID', updateClaim)

// DELETE single claim
router.delete('/:EmployeeID', deleteClaim)

module.exports = router