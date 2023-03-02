const mongoose = require('mongoose')

const Schema = mongoose.Schema

const policySchema = new Schema({
  InsuranceID: {
    type: Number,
    required: true
  },
  EmployeeID: {
    type: Number,
    required: true
  },
  InsuranceType: {
    type: String,
    required: true
  },
  PolicyStartDate: {
    type: Date,
    required: true
  },
  PolicyTerm: {
    type: String,
    required: true
  },
  PolicyEndDate: {
    type: Date,
    required: true
  },
  ClaimLimit: {
    type: Number,
    required: true
  },
  RemainingClaimLimit: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Policy', policySchema)