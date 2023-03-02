const Claim = require('../models/claimModel')
const Policy = require('../models/policyModel')

// GET all claims
const getAllClaims = async (req, res) => {
  const { EmployeeID } = req.params

  const policies = await Policy.find({ EmployeeID }).select({'InsuranceID': 1, 'InsuranceType': 1})

  // retrieve insuranceIDs and insuranceTypes
  let insuranceIDs = []
  let insuranceTypes = []

  policies.forEach((policy) => {
    if (!insuranceTypes.includes(policy.InsuranceType)) {
      insuranceTypes.push(policy.InsuranceType)
    }

    insuranceIDs.push(policy.InsuranceID)
  })

  const claims = await Claim.find({InsuranceID: { $in: insuranceIDs } })

  res.status(200).json({ claims })
}

// POST single claim
const createClaim = async (req, res) => {

  // retrieve values from body
  const { InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID } = req.body

  // set values individually
  const Status = "Pending"
  const LastEditedClaimDate = new Date().toJSON();

  // create unique ClaimID
  const highestIDClaim = await Claim.findOne().sort({ClaimID: -1}).select({'ClaimID': 1})
  const ClaimID = highestIDClaim.ClaimID + 1

  // create claim
  try {
    const claim = await Claim.create({ ClaimID, InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID, Status, LastEditedClaimDate })
    res.status(200).json({claim})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// PATCH single claim
const updateClaim = async (req, res) => {

}

// DELETE single claim
const deleteClaim = async (req, res) => {

}

module.exports = {
  getAllClaims,
  createClaim,
  updateClaim,
  deleteClaim
}