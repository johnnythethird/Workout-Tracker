import { createContext,  useReducer, useEffect } from 'react'

export const AuthContext = createContext() // create the context object!

// the state is the previous state before we make the change to it
// action is the action we'll be taking in the dispatch
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload}
    case 'LOGOUT':
      return { user: null}
    default:
      return state
  }
}

// use the reducer and export it with the effect
export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  // use when this first loads
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) // We need to parse because the token is json if it exists. grab it from local storage

    if (user) {
      dispatch({type: 'LOGIN', payload: user}) // immediately use the dispatch to make the stats of the current user and put the site in that state
    }
  }, [])

  console.log('AuthContext state: ', state)

  // make the provider with the state properties and dispatch actions
  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}