// This is the important model which will be used as a basis for all the objects. 
// PART 1 techinically since this is needed for the controller.

const mongoose = require('mongoose') // First make mongoose required.

const Schema = mongoose.Schema // Connect to the schema for mongoose.

// We are now going to create the schema that we will use for out database.
// Timestamps will create time when we add a new document.
const workoutSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  load: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

// export the model
// Remember when exporting, make first argument singular as it will make a plural collection. Schema is the second argument.
// These will go to the MongoDB database you made.
module.exports = mongoose.model('Workout', workoutSchema)