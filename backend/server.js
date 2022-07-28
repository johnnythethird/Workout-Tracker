

require('dotenv').config() // We need this to connect to the .env file which is a great global variable practice got GIT. We can use global variables without making it ugly.

const express = require('express') // Express is what is helping us with the routing and other functions.
const mongoose = require('mongoose') // Mongoose allows us to connect to the database.
const workoutRoutes = require('./routes/workouts') // Routes for the workout page.
const userRoutes = require('./routes/user') // Routes for the user page.

// express app so that we may initiate express functions
const app = express()

// middleware
app.use(express.json()) // takes only json files and looks at json requests that get sent.

// Remember that we need to use next for the middleware!
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes. we will put the routes in their own controller file
app.use('/api/workouts', workoutRoutes) // workout routes
app.use('/api/user', userRoutes) // user routes

// db connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    // listen: run here after we connect to the database.
    app.listen(process.env.PORT, () => {
    console.log('connected to db! listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
  

// return nothing since this is the main server