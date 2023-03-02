const mongoose = require('mongoose')

const Schema = mongoose.Schema

const claimSchema = new Schema({
  ClaimID: {
    type: Number,
    required: true,
    unique: true
  },
  InsuranceID: {
    type: Number,
    required: true
  },
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  ExpenseDate: {
    type: Date,
    required: true
  },
  Amount: {
    type: Number,
    required: true
  },
  Purpose: {
    type: String,
    required: true
  },
  FollowUp: {
    type: Boolean,
    required: true
  },
  PreviousClaimID: {
    type: Number,
    required: false
  },
  Status: {
    type: String,
    required: true
  },
  LastEditedClaimDate: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('Claim', claimSchema)