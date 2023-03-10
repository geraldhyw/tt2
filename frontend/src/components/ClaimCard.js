import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/ClaimCard.css'
import { useClaimContext } from '../hooks/useClaimContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ClaimCard = ({claim}) => {
  const { ClaimID, InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID, Status, LastEditedClaimDate } = claim

  const user = JSON.parse(localStorage.getItem('user'))

  const {claims, dispatch} = useClaimContext()
  const navigate = useNavigate()

  const handleEdit = (e) => {
    claim.FollowUp = true
    navigate('/create-claim', { state: claim })
  }

  const handleDelete = (e) => {
    if (!user) {
      return 
    }

    const deleteClaim = async () => {
      console.log(ClaimID, InsuranceID)
      const response = await fetch('/api/claims/' + user.EmployeeID, {
        method: 'DELETE',
        body: JSON.stringify({ ClaimID, InsuranceID }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'DELETE_CLAIM', payload: { json }})
        console.log('claim deleted')
      }
    }

    deleteClaim()
  }

  return (
    <div className="card-container">
      {/* top */}
      <div className="card-top">
        <h2>ClaimID: {ClaimID}</h2>
        <div>
          { (Status !== "Approved") &&
            <span className="material-symbols-outlined icon-button" onClick={(e) => handleEdit(e)}>edit</span>
          }
          <span className="material-symbols-outlined icon-button" onClick={(e) => handleDelete(e)}>delete</span>
        </div>
      </div>

      {/* middle */}
      <div className="card-mid">
        <h3>InsuranceID: {InsuranceID}</h3>
        <h3>Amount: {Amount}</h3>
        <h3>Purpose: {Purpose}</h3>
      </div>

      {/* bottom */}
      <div className="card-bot">
      
        <h3>Last edited: {LastEditedClaimDate}</h3>
        {/* <h3>Last edited: {formatDistanceToNow(new Date(LastEditedClaimDate), { addSuffix: true })}</h3> */}
        <h3 className={'status ' + Status}>{Status}</h3>
      </div>
    </div>
  )
}

export default ClaimCard