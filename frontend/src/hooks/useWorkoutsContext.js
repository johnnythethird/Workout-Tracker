import { WorkoutsContext } from "../context/WorkoutsContext"
import { useContext } from "react"

// This is our hook for the home page!
export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext) // useContext on our context file.

  // if the context has an error, throw the error
  if(!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}