import React from 'react'
import '../css/ClaimCard.css'

const ClaimCard = ({claim}) => {
  // const Status = 'Pending'
  const { ClaimID, InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID, Status, LastEditedClaimDate } = claim

  console.log(claim)

  const handleEdit = (e) => {

  }

  const handleDelete = (e) => {
    
  }

  return (
    <div className="card-container">
      {/* top */}
      <div className="card-top">
        <h2>InsuranceType</h2>
        <div>
          <span className="material-symbols-outlined icon-button" onClick={(e) => handleEdit(e)}>edit</span>
          <span className="material-symbols-outlined icon-button" onClick={(e) => handleDelete(e)}>delete</span>
        </div>
      </div>

      {/* middle */}
      <div className="card-mid">
        <h3>InsuranceID: {InsuranceID}</h3>
        <h3>ClaimID: {ClaimID}</h3>
        <h3>Amount: {Amount}</h3>
        <h3>Purpose: {Purpose}</h3>
      </div>

      {/* bottom */}
      <div className="card-bot">
        <h3>Last edited: {LastEditedClaimDate}</h3>
        <h3 className={'status ' + Status.toLowerCase()}>{Status}</h3>
      </div>
    </div>
  )
}

export default ClaimCard