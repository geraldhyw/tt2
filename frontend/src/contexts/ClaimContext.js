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
    default:
      return state.claims
  }
}

export const ClaimContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(claimReducer, {
    claims: [
      {
       "ClaimID": 2010,
       "InsuranceID": 1009,
       "FirstName": "Martin",
       "LastName": "Ong",
       "ExpenseDate": "2022-07-14T08:00:00+08:00",
       "Amount": 100.00,
       "Purpose": "Dentist",
       "FollowUp": 0,
       "PreviousClaimID": null,
       "Status": "Approved",
       "LastEditedClaimDate": "2022-07-15T12:22:45+08:00"
      },
      {
       "ClaimID": 2011,
       "InsuranceID": 1008,
       "FirstName": "John",
       "LastName": "Tan",
       "ExpenseDate": "2022-08-15T08:00:00+08:00",
       "Amount": 100.00,
       "Purpose": "Outpatient Claim",
       "FollowUp": 0,
       "PreviousClaimID": null,
       "Status": "Rejected",
       "LastEditedClaimDate": "2022-08-16T19:35:53+08:00"
      },
      {
       "ClaimID": 2012,
       "InsuranceID": 1005,
       "FirstName": "Mary",
       "LastName": "Lee",
       "ExpenseDate": "2022-08-16T08:00:00+08:00",
       "Amount": 200.00,
       "Purpose": "Specialist Visit",
       "FollowUp": 0,
       "PreviousClaimID": null,
       "Status": "Pending",
       "LastEditedClaimDate": "2022-08-17T12:28:46+08:00"
      }
    ]
  })

  return (
    <ClaimContext.Provider value={{...state, dispatch}}>
      { children }
    </ClaimContext.Provider>
  )
}