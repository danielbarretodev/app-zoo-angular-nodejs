'use strict'

var express = require('express');
var AnimalController = require('../controllers/animal');

var api = express.Router();
var md_auth = require('../middelware/authenticated');
var md_admin = require('../middelware/is_admin');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/animals'});

//una vez que se ejecute ensureAuth, ejecutaremos el meotod pruebas
//gracias al metodo next() que se ejecuta en md_auth
api.get('/pruebas_a', md_auth.ensureAuth, AnimalController.pruebas);
api.post('/save_animal', [md_auth.ensureAuth, md_admin.isAdmin], AnimalController.saveAnimal);
api.get('/get_animals',  AnimalController.getAnimals);
api.get('/get_animal/:id', AnimalController.getAnimal);
api.put('/update_animal/:id',[md_auth.ensureAuth, md_admin.isAdmin], AnimalController.updateAnimal);
api.get('/get_image_animal/:imageFile',  AnimalController.getImageFile);
api.post('/upload_image_animal/:id', [md_auth.ensureAuth, md_admin.isAdmin, md_upload], AnimalController.uploadImage);
api.delete('/remove_animal/:id', [md_auth.ensureAuth, md_admin.isAdmin], AnimalController.deleteAnimal);

module.exports = api;
