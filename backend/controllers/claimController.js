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

  // // retrieve values from body
  // const { InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp } = req.body

  // // set values individually
  // const PreviousClaimID = 0
  // const Status = 'Pending'
  // const LastEditedClaimDate = new Date().toJSON();

  // // create unique ClaimID
  // const claims = await Claim.find().sort({createdAt: -1})
  // console.log(claims)

  // const claim = { InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID, Status, LastEditedClaimDate }
  // console.log(claim)

  // res.status(200)

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