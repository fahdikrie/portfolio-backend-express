const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const keys = require("../../config/keys")

const validateRegisterInput = require("../../validation/register")
const validateLoginInput = require("../../validation/login")
const User = require("../../models/User")

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ name: req.body.name }).then(user => {

    if (user) {
      return res.status(300).json({
        name: "User already exists"
      })
    } else {
      const newUser = new User({
        name: req.body.name.toLowerCase(),
        birthday: req.body.birthday
      })

      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err))
    }
  })
})

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  if (!isValid) {
    return res.status(300).json(errors)
  }

  const name = req.body.name.toLowerCase()
  const birthday = req.body.birthday

  User.findOne({ name }).then(user => {

    if (!user) {
      return res.status(300).json(
        {
          name: "Aw shoot! apparently you are not (yet) my special friend :("
        }
      )
    }

    if (birthday ===  user.birthday) {
      const payload = {
        id: user.id,
        name: user.name
      }

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
    } else {
      return res.status(300).json(
        {
          birthday: "Either that isn't your birthday or you typed it on a wrong format (format is dd/mm/yyyy) :/"
        }
      )
    }
  })
})

module.exports = router
