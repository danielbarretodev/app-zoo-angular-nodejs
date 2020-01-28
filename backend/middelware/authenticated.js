
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_angular4';


exports.ensureAuth = function(req, res, next){
  if(!req.headers.authorization){
    return res.status(403).send({
      message: 'La peticion no tiene la cabecera de autentificación'});
  }

  //elimina las comillas simples y dobles
  var token = req.headers.authorization.replace(/['""]+/g,'');

  try {
    var payload = jwt.decode(token, secret);

    //comprobamos si el token ha caducado
    if(moment().unix() > payload.exp)
    {
      return res.status(401).send({
        message: 'El token ha expirado'
      });
    }
  }catch(ex){
    return res.status(404).send({
      message: 'El token no es valido'
    });
  }
    req.user = payload;
    next();
}
