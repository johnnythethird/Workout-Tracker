import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
// this hook will be used to handle the signup function

// we export so we can use in another file
export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true) // loading is true
    setError(null) // start error at null

    // fetch the database and add the user to the list
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    })
    const json = await response.json() // get the response in json format

    // if not good, return json error and make loading false. if good, then put user in the local storage and dispatch the login information
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))
      
      // update the auth context
      dispatch({type: 'LOGIN', payload: json})
      setIsLoading(false)
    }
  }

  return {signup, isLoading, error} // return all three values if they exist
}