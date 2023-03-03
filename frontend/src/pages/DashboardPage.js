import React from 'react'
import ClaimCard from '../components/ClaimCard'
import '../css/DashboardPage.css'
import { useClaimContext } from '../hooks/useClaimContext'

const DashboardPage = () => {
  const {claims, dispatch} = useClaimContext()


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