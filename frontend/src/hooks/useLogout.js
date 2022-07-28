import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

export const useLogout = () => {

  // we need the dispatch to log out
  const {dispatch} = useAuthContext() // get auth context
  const {dispatch: workoutsDispatch} = useWorkoutsContext() // change name to not be confusing

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({type: 'LOGOUT'})
    workoutsDispatch({type: 'SET_WORKOUTS', payload: null}) // clear the workout state data
  }

  return {logout} // return the function
}