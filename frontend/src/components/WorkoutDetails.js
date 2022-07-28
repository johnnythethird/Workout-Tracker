import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext() // have the dispatch ready
  const {user} = useAuthContext() // check if there is a current user

  // handle click for the delete button. make it async to await. 
  const handleClick = async () => {
    if (!user) { // If there is no user, don't delete
      return
    }

    // use the response and delete the workout in the db, but grab the authorization
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    }) // delete from the database.
    const json = await response.json()

    // if the response is good
    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json}) // delete the workout locally
    }
  }

  // return the specific format
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>

      {/* Format the created date in a specific way */}
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>DELETE</span>
    </div>
  )
}

export default WorkoutDetails // export the details so home can use it