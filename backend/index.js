'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;



mongoose.connect('mongodb://localhost:27017/zoo',  {
useUnifiedTopology: true,
useNewUrlParser: true,
}).then(() => {

  console.log('DB Connected!');
  app.listen(port, () => {
      console.log("El servidor local con Node y Express esta corriendo");
  });


})
.catch(err => {
console.log( err.message);
});
