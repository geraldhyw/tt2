import { createContext, useReducer } from 'react'

export const ClaimContext = createContext()

export const claimReducer = (state, action) => {
  switch (action.type) {
    case 'GET_CLAIMS':
      return {
        claims: action.payload
      }
    case 'CREATE_CLAIM':
      return {
        claims: [action.payload, ...state.claims]
      }
    case 'DELETE_CLAIM':
      return {
        claims: state.claims.filter(c => c.ClaimID !== action.payload.ClaimID)
      }
    case 'UPDATE_CLAIM':
      let claims = state.claims
      for (let i = 0; i < state.claims.length; i++) {
        if (claims.ClaimID === action.payload.ClaimID) {
          claims[i] = action.payload
          break
        }
      }
      return {
        claims
      }
    default:
      return state.claims
  }
}

export const ClaimContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(claimReducer, {
    claims: []
  })

  return (
    <ClaimContext.Provider value={{...state, dispatch}}>
      { children }
    </ClaimContext.Provider>
  )
}