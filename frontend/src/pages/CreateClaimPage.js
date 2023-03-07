import React, { useEffect, useState } from 'react'
import '../css/CreateClaimPage.css'
import { useClaimContext } from '../hooks/useClaimContext'
import { useLocation, useNavigate } from 'react-router-dom'

const CreateClaimPage = () => {

  const user = JSON.parse(localStorage.getItem('user'))

  // set variables
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [ExpenseDate, setExpenseDate] = useState('')
  const [Amount, setAmount] = useState(0)
  const [Purpose, setPurpose] = useState('')
  const [FollowUp, setFollowUp] = useState(true)
  const [PreviousClaimID, setPreviousClaimID] = useState('')

  const [showPreviousClaimID, setShowPreviousClaimID] = useState(true)
  const [ClaimID, setClaimID] = useState(null)
  const [InsuranceID, setInsuranceID] = useState('')

  const navigate = useNavigate()
  const { state } = useLocation()

  // check if edit claim or create claim
  useEffect(() => {
    // if edit claim, overwrite variables
    if (state) {
      console.log('yes')
      setFirstName(state.FirstName)
      setLastName(state.LastName)
      setExpenseDate(state.ExpenseDate)
      setAmount(state.Amount)
      setPurpose(state.Purpose)
      setFollowUp(state.FollowUp)
      setPreviousClaimID(state.PreviousClaimID)
      setShowPreviousClaimID(true)
      setClaimID(state.ClaimID)
      setInsuranceID(state.InsuranceID)
    }
  }, [])
  
  const {claims, dispatch} = useClaimContext()

  const EmployeeID = localStorage.getItem('EmployeeID')

  const handleCreateClaim = async (e) => {
    e.preventDefault()

    if (!user) {
      return
    }

    if (FollowUp === false) {
      setPreviousClaimID(null)
    }


    if (!state) {
      // CREATE CLAIM
      const claim = { InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID}
      const response = await fetch('/api/claims/' + EmployeeID, {
        method: 'POST',
        body: JSON.stringify(claim),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
  
      if (!response.ok) {
        console.log(json.error)
      } else {
        console.log(json)
        dispatch({ type: 'CREATE_CLAIM', payload: json })
        console.log('claim created!')
        navigate('/dashboard', { replace: true })
      }
    } else {
      // EDIT CLAIM
      const claim = { ClaimID, InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID}
      const response = await fetch('/api/claims/' + EmployeeID, {
        method: 'PATCH',
        body: JSON.stringify(claim),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
  
      if (!response.ok) {
        console.log(json.error)
      } else {
        console.log(json)
        dispatch({ type: 'UPDATE_CLAIM', payload: json })
        console.log('claim updated!')
        navigate('/dashboard', { replace: true })
      }
    }
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
              value={ExpenseDate.substring(0,10)}
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
            <label className="create-claim-label">Insurance ID</label>
            <input 
              className="create-claim-input"
              type="number"
              value={InsuranceID}
              onChange={(e) => setInsuranceID(e.target.value)}
            />
          </div>
          <div className="create-claim-field">
            <label className="create-claim-label">Purpose</label>
            <input 
              className="create-claim-input"
              type="text"
              value={Purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
        </div>

        <div className="create-claim-input-row">
          <div className="create-claim-field-special">
            <div className="create-claim-field">
              <label className="create-claim-label">FollowUp</label>
              <input 
                className="create-claim-input-followup"
                type="checkbox"
                value={FollowUp}
                defaultChecked={FollowUp}
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
            <h3>{state ? 'Update Claim' : 'Create Claim'}</h3>
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateClaimPage