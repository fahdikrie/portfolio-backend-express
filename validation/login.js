const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function validateLoginInput(data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ""

  if (Validator.isEmpty(data.name)) {
    errors.name = "Enter your name here and see if you're my special friend <3"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
