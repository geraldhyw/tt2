import React, { useState } from 'react'
import '../css/CreateClaimPage.css'

const CreateClaimPage = () => {
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [ExpenseDate, setExpenseDate] = useState('')
  const [Amount, setAmount] = useState(0)
  const [Purpose, setPurpose] = useState('')
  const [FollowUp, setFollowUp] = useState(false)
  const [PreviousClaimID, setPreviousClaimID] = useState('')

  const [showPreviousClaimID, setShowPreviousClaimID] = useState(false)

  const handleCreateClaim = (e) => {
    e.preventDefault()
    console.log(FirstName)
    console.log(LastName)
    console.log(ExpenseDate)
    console.log(Amount)
    console.log(Purpose)
    console.log(FollowUp)
    console.log(PreviousClaimID)
  }

  return (
    <div>
      <form className="create-claim-container" onSubmit={(e) => handleCreateClaim(e)}>

        <div className="create-claim-input-row">
          <div className="create-claim-field">
            <label className="create-claim-label">First Name</label>
            <input 
              className="create-claim-input"
              type="text"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="create-claim-field">
            <label className="create-claim-label">Last Name</label>
            <input 
              className="create-claim-input"
              type="text"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="create-claim-input-row">
          <div className="create-claim-field">
            <label className="create-claim-label">Expense Date</label>
            <input 
              className="create-claim-input"
              type="date"
              value={ExpenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
            />
          </div>
          <div className="create-claim-field">
            <label className="create-claim-label">Amount</label>
            <input 
              className="create-claim-input"
              type="number"
              value={Amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="create-claim-input-row">
          <div className="create-claim-field">
            <label className="create-claim-label">Purpose</label>
            <input 
              className="create-claim-input"
              type="text"
              value={Purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
          <div className="create-claim-field-special">
            <div className="create-claim-field">
              <label className="create-claim-label">FollowUp</label>
              <input 
                className="create-claim-input-followup"
                type="checkbox"
                value={FollowUp}
                onChange={(e) => {
                  setFollowUp(!FollowUp)
                  setPreviousClaimID('')
                  setShowPreviousClaimID(!showPreviousClaimID)
                }}
              />
            </div>
            {showPreviousClaimID ? (
              <div className="create-claim-field">
                <label className="create-claim-label">Previous Claim ID</label>
                <input 
                  className="create-claim-input"
                  type="number"
                  value={PreviousClaimID}
                  onChange={(e) => setPreviousClaimID(e.target.value)}
                />
              </div>
            ) : (
              <div></div>
            )}
            
          </div>
        </div>
        
        <div className="create-claim-button-container">
          <button className="create-claim-button btn" type="submit">
            <h3>Create Claim</h3>
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateClaimPage