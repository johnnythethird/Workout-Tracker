const mongoose = require('mongoose') // require db
const bcrypt = require('bcrypt') // used for security and encryption
const validator = require('validator') // validate for email and passwords

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// static signup method from mongoose
// not an arrow function for this specific function
userSchema.statics.signup = async function (email, password) {

  // validation
  if (!email || !password) { // Check if fields are filled
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) { // Check if email is email
    throw Error('Email is not valid')
  }
  if (!validator.isStrongPassword(password)) { // Check if password is small
    throw Error('Password not strong enough')
  }
  
  const exists = await this.findOne({email}) // if it exists it will have a value, if not, then null. use this. since we're in the userModel trying to find a user

  if (exists) {
    throw Error('Email already in use')
  }

  // salt is useful because it will make passwords even harder to guess by adding hash
  const salt = await bcrypt.genSalt(10) // the higher, the harder to crack, but longer to login
  const hash = await bcrypt.hash(password, salt) // Hash the passowrd

  const user = await this.create({ email, password: hash}) // Create user

  return user // Send user
}

// static login method
userSchema.statics.login = async function(email, password) {
  // validation
  if (!email || !password) { // Check if fields are filled
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({email}) // if it exists it will have a value, if not, then null

  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password) // Compare the text and hash passwords

  if (!match) {
    throw Error('Incorrect password') // if incorrect, throw error
  }

  return user // return the user if successful
}

module.exports = mongoose.model('User', userSchema) // export the user to db