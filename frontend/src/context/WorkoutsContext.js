import { createContext, useReducer } from 'react'
// This whole context file is used to keep track of the local state of the page! This will not interact with the database!

export const WorkoutsContext = createContext() // create the context object!

// the state is the previous state before we make the change to it
// action is the action we'll be taking in the dispatch
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { 
        workouts: action.payload // send all of the workouts by using payload
      }
    case 'CREATE_WORKOUT':
      return { 
        workouts: [action.payload, ...state.workouts]  // we'll grab the one workout and the data of the other objects
      }
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id) // filter and remove the chosen one.
      }
    default:
      return state
  }
}

export const WorkoutsContextProvider = ({ children }) => {
  // Use the reducer on the function.
  const [state, dispatch] = useReducer(workoutsReducer, { 
    workouts: null
  })

  // return the provider with the current state and dispatch commands
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  )
}