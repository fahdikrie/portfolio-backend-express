const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const keys = require("../../config/keys")

const validateRegisterInput = require("../../validation/register")
const validateLoginInput = require("../../validation/login")
const User = require("../../models/User")

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {

  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ name: req.body.name }).then(user => {

    // Check if user exists
    if (user) {
      return res.status(400).json({ name: "Name already exists" })
    } else {
      const newUser = new User({
        name: req.body.name,
      })

      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err))
    }
  })

})

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {

  console.log(req)

  // Form validation
  const { errors, isValid } = validateLoginInput(req.body)

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const name = req.body.name

  // Find user by name
  User.findOne({ name }).then(user => {

    // Check if user exists
    if (!user) {
      return res.status(404).json(
        { namenotfound: "Aw shoot! apparently you're not (yet) my special friend :(" }
      )
    }

    // User matched
    // Create JWT Payload
    const payload = {
      id: user.id,
      name: user.name
    }

    // Sign token
    jwt.sign(
      payload,
      keys.secretOrKey,
      {
        expiresIn: 3600 // an hour in seconds
      },
      (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token
        })
      }
    )
  })

})

module.exports = router
