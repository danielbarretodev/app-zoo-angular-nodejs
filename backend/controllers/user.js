'use strict'
// modulos
var bcrypt = require('bcrypt-nodejs');
var fs  = require('fs');//libreria para trabajar con sistema de ficheros
var path = require('path');


const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

//modelos
var User = require('../models/user');

//servicio jwt
var jwt = require('../services/jwt');


function pruebas(req,res){
  res.status(200).send({
    message: 'Probando el controlador de usuarios y la acción pruebas'
    //user: req.user
  });
}

function saveUser(req,res){
  var user = new User();

//Obtener parametros de la peticion
  var params = req.body;

//Asignar valores al objeto usuraio


  if(params.password && params.name){

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE USER';
    user.image = null;



    User.findOne({email: user.email.toLowerCase()}, (err,bd_user) => {
        if(err)
        {
          res.status(500).send({
            message: 'Error al comprobar el usuario'
          });

        } if (!bd_user){
          bcrypt.hash(params.password,null,null, function(err,hash){

            user.password = hash;


            user.save((err,userStored) => {
                if(err){
                  res.status(500).send({message: 'Error al guardar el usuario'});
                }else {
                  if(!userStored){
                    res.status(404).send({message: 'No se ha registrado el usuario'})
                  } else {
                            res.status(200).send({user:userStored});
                  }
                }
            });


          });

        } else {
          res.status(200).send({
            message: 'El usuario no puede registrarse porque ya existe'
          });
        }
    });


  } else {
    res.status(200).send({
      message: 'Introduce los datos correctamente para poder registrar al usuario',
      user: params,
      json: params.json.password
    });
  }


}

function login(req,res){

  var params = req.body;
  var password = params.password;
  var email = params.email;


  User.findOne({email: email.toLowerCase()}, (err,user) => {
    if(err)
    {
        res.status(500).send({message: 'Error al comprobar el usuario'});
    } else {

          if(user){
                bcrypt.compare(password, user.password, (err,check) =>{
                  if(check){
                    //comprobar y generar el token
                    if(params.gettoken){
                      //devolver el token jwt
                      res.status(200).send({
                        token: jwt.createToken(user)
                      });
                    }else {
                      res.status(200).send({user});
                    }
                  }else {
                    res.status(404).send({
                      message: 'Error usuario no ha podido loguearse correctamente',
                      password: params.gettoken
                    });
                  }
                });

          }else{
            res.status(404).send({
              message: 'El usuario no existe en la bd'

            });
          }
    }
  });
}


function updateUser(req,res){

  var userId = req.params.id;
  var update = req.body;

  if(userId !=req.user.sub){
    return rest.status(500).send(
      {message: 'No tienes permiso para actualizar el usuario'});
  }

  User.findByIdAndUpdate(userId, update,{new: true}, (err, userUpdated) =>{
    if(err){
      res.status(500).send({
        message: 'Error al actualizar usuario'
      });
    }else{
      if(!userUpdated){
        res.status(404).send({message: 'No se ha podido actualizar el usuario'});
      }else {
        res.status(200).send({user: userUpdated});
      }
    }
  });
}


function uploadImage(req, res){
  var userId = req.params.id;
  var file_name = 'No subido...';

  if(req.files){
    var file_path = req.files.image.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[2];


    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];

    if(file_ext == 'png' || file_ext == 'jpg'
        || file_ext == 'jpeg' || file_ext == 'gif' ){

          if(userId !=req.user.sub){
            return rest.status(500).send(
              {message: 'No tienes permiso para actualizar el usuario'});
          }

          User.findByIdAndUpdate(userId, {image: file_name},{new: true}, (err, userUpdated) =>{
            if(err){
              res.status(500).send({
                message: 'Error al actualizar usuario'
              });
            }else{
              if(!userUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el usuario'});
              }else {
                res.status(200).send({user: userUpdated});
              }
            }
          });

    } else {

      fs.unlink(file_path, (err)=>{
        if(err){
          res.status(200).send({message: 'Extension no valida y fichero no borrado'});
        }else{
          res.status(200).send({message: 'Extension no valida'});
        }
      });
    }

  } else {
    res.status(200).send({
      message: 'No se han subido archivos'
    });
  }
}


function getImageFile(req, res){

  var imageFile = req.params.imageFile;
  var path_file = './uploads/users/'+imageFile;

  fs.exists(path_file, function(exists){
    if(exists){
      res.sendFile(path.resolve(path_file));
    }else {

        res.status(404).send({
          pathFile: path_file,
          message: 'La imagen no existe'});
    }
  });
}

function getKeepers(req,res){

  User.find({role: 'ROLE ADMIN'}).exec((err, users) =>{
    if(err){
      res.status(500).send({
        message: 'Error en la peticion'});
    } else {
      if(!users){
        res.status(404).send({
          message: 'No hay cuidadores'});
      } else {
        res.status(200).send({
          users});
      }
    }
  });
}


module.exports = {
  pruebas,
  saveUser,
  login,
  updateUser,
  uploadImage,
  getImageFile,
  getKeepers
};
