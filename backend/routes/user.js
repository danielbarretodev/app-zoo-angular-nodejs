'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middelware/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'});

//una vez que se ejecute ensureAuth, ejecutaremos el meotod pruebas
//gracias al metodo next() que se ejecuta en md_auth
api.get('/pruebas', UserController.pruebas);
api.post('/register',UserController.saveUser);
api.post('/login',UserController.login);
api.put('/update_user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload_image_user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get_image/:imageFile',  UserController.getImageFile);
api.get('/get_keepers', UserController.getKeepers);



module.exports = api;
