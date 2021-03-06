const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const bcrypt = require("bcryptjs")

const Schema = mongoose.Schema
const number = Math.random().toString()

// Create Schema
const UserSchema = new Schema({
  oauthId: {
    type: String,
    default: null
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: null
  },
  passwordHash: {
    type: String,
    default: bcrypt.hashSync(number, 12)
  },
  avatar: {
    type: String
  },
  authorities: {
    type: [String],
    default: "ROLE_USER"
  },
  date: {
    type: Date,
    default: Date.now
  }
})

UserSchema.plugin(uniqueValidator)

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash)
}

UserSchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 12)
})

module.exports = User = mongoose.model("users", UserSchema)
