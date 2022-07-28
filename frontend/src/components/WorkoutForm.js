import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext() // use dispatch for creating on the local state
  const {user} = useAuthContext() // check if the user is logged in

  // Create all the states that we'll need.
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault() // prevent the page from refreshing on submit

    // if there's no user, return error
    if (!user) {
      setError('You must be logged in')
      return
    }

    const workout = {title, load, reps}
    
    // grab the response using the post request with content type and authorization
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json() // make the response json

    if (!response.ok) {
      setError(json.error) // set the error
      setEmptyFields(json.emptyFields) // set what the empty fields are
    }
    if (response.ok) {
      // reset the whole sets and dispatch the create workout
      setTitle('')
      setLoad('')
      setReps('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }

  }

  return (
    // form class that will handle all functions inside
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''} // If true, error, if not, empty
      />

      <label>Load (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => setLoad(e.target.value)} 
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''} // If true, error, if not, empty
      />

      <label>Number of Reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps} 
        className={emptyFields.includes('reps') ? 'error' : ''} // If true, error, if not, empty
      />

      <button>Add Workout</button>

      {/* If there is an error, display it */}
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm // return the workout form for the home screen