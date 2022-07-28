const User = require('../models/userModel')
const jwt = require('jsonwebtoken') // used to create a json token

// Create user json local token for 3 days
// Secret is in our env file and we made that random.
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}

// login user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password) // use on the login function

    // create a token if no error
    const token = createToken(user._id)

    res.status(200).json({email, token}) // send email and token to front
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup user
const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.signup(email, password) // use on the signup function

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token}) // send email and token to front
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser } // export the functions

// JSON Web Tokens
// Header: Contains the algorithm used for the JWT
// Payload: Contains non-sensitive user data (ex. a user id)
// Signature: Used to verify the token by the server