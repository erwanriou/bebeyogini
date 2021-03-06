const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const gravatar = require("gravatar")
const passport = require("passport")

const User = require("../../models/User")
const keys = require("../../config/keys").keys
const validateRegisterInput = require("../../validation/register")
const validateLoginInput = require("../../validation/login")
const router = express.Router()

// @route  POST api/users
// @desc   Test route API
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findById(req.user.id)
    res.status(200).json(admin)
  }
)

// @route  POST api/users/login
// @desc   Login as user and generate token
// @access Public
router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)
  //Check Validation
  !isValid && res.status(400).json(errors)

  const email = req.body.email
  const password = req.body.password

  const user = await User.findOne({ email })
  const match = await bcrypt.compareSync(password, user.passwordHash)

  if (!user) {
    errors.email = "User not found"
    return res.status(400).json(errors)
  }
  if (match) {
    const payload = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      authorities: user.authorities
    }
    jwt.sign(payload, keys.jwt.secret, { expiresIn: 7000 }, (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token
      })
    })
  } else {
    errors.email = "Password incorrect"
    return res.status(400).json(errors)
  }
})

// @route  POST api/users/register
// @desc   Register a user
// @access Public
router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)
  //Check Validation
  !isValid && res.status(400).json(errors)
  const user = await User.findOne({ email: req.body.email })

  try {
    if (user) {
      errors.email = "Email already exists"
      return res.status(400).json(errors)
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      })
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        role: "user"
      })
      await newUser.save()
      return res.status(201).json(newUser)
    }
  } catch (e) {
    res.status(404).json(e)
  }
})

module.exports = router
