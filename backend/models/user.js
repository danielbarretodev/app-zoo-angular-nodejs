
let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  image: String,
  role: String
})


module.exports= mongoose.model('User', UserSchema);
