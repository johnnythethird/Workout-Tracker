const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// function takes in three variables
const requireAuth = async (req, res, next) => {

  // verify authentication
  const { authorization } = req.headers

  // check if they have a value
  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  // get the token and split the header so that we get the token half (Bearer 109234u-0ji.jnkirn2oroif2f.jf23f2f23f23ffgdfgh)
  const token = authorization.split(' ')[1]

  // try to grab the id from the token
  try {
    const {_id} = jwt.verify(token, process.env.SECRET) // verify the token with the payload. return us id if succesful

    req.user = await User.findOne({ _id }).select('_id') // find the user in the database and select the id property
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }

}
 
module.exports = requireAuth // send back the function