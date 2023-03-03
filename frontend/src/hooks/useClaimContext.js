import { ClaimContext } from "../contexts/ClaimContext"
import { useContext } from 'react'

export const useClaimContext = () => {
  const context = useContext(ClaimContext)

  if (!context) {
    throw Error('useClaimContext must be used inside a ClaimContextProvider!')
  }

  return context
}