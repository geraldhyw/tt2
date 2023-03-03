import React, { useEffect }  from 'react'
import ClaimCard from '../components/ClaimCard'
import '../css/DashboardPage.css'
import { useClaimContext } from '../hooks/useClaimContext'

const DashboardPage = () => {
  const {claims, dispatch} = useClaimContext()
  const EmployeeID = 58001005

  useEffect(() => {
    const fetchClaims = async () => {
      const response = await fetch('/api/claims/' + EmployeeID)
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'GET_CLAIMS', payload: json.claims })
      }
    }

    fetchClaims()
  }, [])

  return (
    <div className="dashboard-container">
      {claims.map((claim) => (
        <div className="dashboard-card-container">
          <ClaimCard claim={claim}/>
        </div>
      ))}
    </div>
  )
}

export default DashboardPage