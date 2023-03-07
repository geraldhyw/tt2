import React, { useEffect }  from 'react'
import ClaimCard from '../components/ClaimCard'
import '../css/DashboardPage.css'
import { useClaimContext } from '../hooks/useClaimContext'

const DashboardPage = () => {
  const {claims, dispatch} = useClaimContext()
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const fetchClaims = async () => {
      const response = await fetch('/api/claims/' + user.EmployeeID, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'GET_CLAIMS', payload: json.claims })
      }
    }

    if (user) {
      fetchClaims()
    }
  }, [claims, user])

  return (
    <div className="dashboard-container">
      {claims.map((claim) => (
        <div className="dashboard-card-container" key={claim.ClaimID}>
          <ClaimCard claim={claim} key={claim.ClaimID}/>
        </div>
      ))}
    </div>
  )
}

export default DashboardPage