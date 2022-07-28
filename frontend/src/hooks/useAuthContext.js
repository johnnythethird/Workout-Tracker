import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

// This is our hook for the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext) // useContext on our context file.

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}