import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components for workouts
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext() // give us the context objects
  const {user} = useAuthContext() // grab the current user

  useEffect(() => { // use this immediately when the page loads
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        // this is our header for authorization, starting with bearer and then the user token
        headers: {
          'Authorization': `Bearer ${user.token}` 
        }
      }) // fetch the info from the workouts collection we made in the server and get authorization

      const json = await response.json() // grab the response as json

      if (response.ok) { // if the response is good, set the current state workouts.
        dispatch({type: 'SET_WORKOUTS', payload: json}) // SENDING DISPATCH to set workouts case!
      }
    }

    // if the current user exists
    if (user) {
      fetchWorkouts() // Call the function!
    }
  }, [dispatch, user]) // these values at the end of the useEffect are the dependencies

  // this is what we will return for the details of the workout
  // give every workout detail their own id and put the workout format inside the details.
  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home // export home so we can use it for routing in the app