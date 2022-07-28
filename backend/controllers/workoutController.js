// This is the controller part of the workout workspace. Model was the first part, but now we're in controller part AKA Part 2.

const Workout = require('../models/workoutModel') // Grab the model so that the post knows the format.
const mongoose = require('mongoose') // require mongodb

// get all workouts. make it async so we can await!
const getWorkouts = async (req, res) => {
  const user_id = req.user_id // grab the userid of the workout

  const workouts = await Workout.find({user_id}).sort({createdAt: -1}) // using find to sort by when the object was created with specific id tied to the workout

  res.status(200).json(workouts) // return as json
}

// get a single workout. make it async so we can await!
const getWorkout = async (req, res) => {
  const {id} = req.params // grab the id of the url. 

  if (!mongoose.Types.ObjectId.isValid(id)) { // Checking if the type is invalid.
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findById(id) // find the id that we want

  if (!workout) {
    return res.status(404).json({error: 'No such workout'}) // if there is no workout, return error
  }

  res.status(200).json(workout) // send json over to frontend
}


// create a new workout
const createWorkout = async (req, res) => {
  const {title, load, reps} = req.body // grab the body of the request

  // This array will check if the fields are empty.
  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!load) {
    emptyFields.push('load')
  }
  if(!reps) {
    emptyFields.push('reps')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields!', emptyFields}) // Error if it needs more fields and return empty fields too.
  }

  // add doc to db
  try {
    const user_id = req.user._id // request the id so that it can be added to the workout
    const workout = await Workout.create({title, load, reps, user_id}) // Create the workout object with the info and id
    res.status(200).json(workout) // Send the new object
  } catch (error) {
    res.status(400).json({error: error.message}) // error if something goes wrong
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const {id} = req.params // grab the id

  if (!mongoose.Types.ObjectId.isValid(id)) { // Checking if the type is invalid.
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndDelete({_id: id}) // delete the workout

  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(workout) // send the json over

}

// update a workout
const updateWorkout = async (req, res) => {
  const {id} = req.params // grab the id

  if (!mongoose.Types.ObjectId.isValid(id)) { // Checking if the type is invalid.
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body // Spread the properties of the object instead of typing them all out so it knows what to update.
  })

  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(workout) // send the json over
}

// export all of the functions that were created
module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}