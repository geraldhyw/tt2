import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
  const { state, dispatch } = useAuthContext()

  const logout = () => {
    // remove from localStorage
    localStorage.removeItem('user')

    // remove from authContext
    dispatch({type: 'LOGOUT'})
  }

  return { logout }
}