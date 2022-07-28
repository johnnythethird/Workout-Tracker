// Express routes that will be using the controller to perform all of the operations.

const express = require('express') // require express
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController') // controllers for the workout routes
const requireAuth = require('../middleware/requireAuth') // require the authentication


// Remember that we'll be using mongoose to send out these requests and they will correspond with each other.
// Without these, mongoose won't work.

const router = express.Router()

router.use(requireAuth) // This will ensure that the user is authenticated before they get to see the workouts.

// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
// We made the function async so that we can wait while creating a new document since that is also async.
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports = router // return the router as the export