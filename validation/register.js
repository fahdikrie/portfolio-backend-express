const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : ""
  data.birthday = !isEmpty(data.birthday) ? data.birthday : ""

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required"
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Birthday is required"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}