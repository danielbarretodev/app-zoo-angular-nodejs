let mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = mongoose.model('User');

let AnimalSchema = new mongoose.Schema({
  name: String,
  description: String,
  year: String,
  image: String,
  user: {type: Schema.ObjectId, ref: 'User'}
});


module.exports= mongoose.model('Animal', AnimalSchema);
