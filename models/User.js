const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },
})

module.exports = User = mongoose.model("users", UserSchema)