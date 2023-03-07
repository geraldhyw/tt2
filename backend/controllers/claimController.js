const Claim = require('../models/claimModel')
const Policy = require('../models/policyModel')

// GET all claims
const getAllClaims = async (req, res) => {
  const { EmployeeID } = req.params
  console.log(EmployeeID)

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

  res.status(200).json({ claims, policies })
}

// POST single claim
const createClaim = async (req, res) => {

  // retrieve values from body
  const { InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID } = req.body

  // check if EmployeeID corresponds to existing InsurancePolicy
  const { EmployeeID } = req.params
  const policy = await Policy.find({ InsuranceID })
  if (!policy) {
    return res.status(400).json({error: "You do not own this insurance policy!"})
  }

  // const policy = await Policy.find({ InsuranceID }).select({'EmployeeID': 1})
  // const isCorrectEmployeeID = policy[0].EmployeeID === parseInt(EmployeeID)
  // if (!isCorrectEmployeeID) {
  //   return res.status(400).json({error: "You do not own this insurance policy!"})
  // }

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
    return res.status(400).json({error: error.message})
  }
}

// PATCH single claim
const updateClaim = async (req, res) => {

  // retrieve values from body
  const { ClaimID, InsuranceID } = req.body
  console.log(req.body)

  // check if EmployeeID corresponds to existing InsurancePolicy
  const { EmployeeID } = req.params
  const policy = await Policy.find({ InsuranceID })
  if (!policy) {
    return res.status(400).json({error: "You do not own this insurance policy!"})
  }

  // create claim
  try {
    const claim = await Claim.findOneAndUpdate({ ClaimID }, {
      ...req.body, 
      Status: "Pending",
      LastEditedClaimDate: new Date().toJSON()
    })
    res.status(200).json({claim})
  } catch (error) {
    return res.status(400).json({error: error.message})
  }

}

// DELETE single claim
const deleteClaim = async (req, res) => {

  // retrieve values from body
  const { ClaimID, InsuranceID } = req.body

  // check if EmployeeID corresponds to existing InsurancePolicy
  const policy = await Policy.find({ InsuranceID })
  if (!policy) {
    return res.status(400).json({error: "You do not own this insurance policy!"})
  }

  // delete claim
  const claim = await Claim.findOneAndDelete({ ClaimID })
  res.status(200).json({claim})
}

module.exports = {
  getAllClaims,
  createClaim,
  updateClaim,
  deleteClaim
}