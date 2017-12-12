var mongoose = require('mongoose');
var Schema = require('./schema.js')
var bcrypt = require('bcrypt-nodejs');
var Usuarios = mongoose.model('Usuarios', Schema);


var bd = [];
bd.insert = function(user, pass, email, rol) {

  Usuarios.findOne({'local.name': user}, function (err, result) {
    var rols = 0;
    if (err) {
      console.log(err);
    } else {
      if (result != null) {
          console.log("El usuario "+ user + " ya existente.");
        }
       else {
          console.log("Inserting user: "+user);
          console.log("With pass: "+pass);
          console.log("Email: "+ email);
          console.log("Rol: "+ rol)
          if(rol = 'Profesor') rols = 1;
          usuario1 = new Usuarios({'local.name': user, 'local.password': bcrypt.hashSync(pass), 'local.email': email, 'local.rol': rols}, function (err, result) {
            if (err) return handleError(err);
          })

          usuario1.save (function (err) {
            if (err) console.log(err);;
          })
        }
      }
    })
};

bd.delete = function(user) {

  console.log(user);
  Usuarios.findOne({'local.name' : user}, function (err, result) {
    if (err) {
      console.log(err);
      res.send("ERROR");
    } else {

      if (result != null) {
        console.log(result.username)
        if (result.username == user) {
          console.log("Se ha eliminado al usuario: "+ result.username)
          Usuarios.remove({usuario: user}, function (err, result) {
            if(err) console.log(err);
          });
        }

      } else {
        console.log('No se ha encontrado el elemento que desea borrar');
      }
    }
  })
};

bd.isInUser = function(user, pass, req) {
  Usuarios.findOne({'local.name': user}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      if (result != null) {
        if (result.local.username = user && bcrypt.compareSync(pass, result.local.password)) {
          console.log("Usuario Correcto.");

          req.session.user = req.body.form_username;
          req.session.admin = true;
          console.log("correcto");
        }
      } else {
          req.session.admin = false;
        console.log('Usuario inexistente.');

        //res.sendFile('/client/index.html');
      }
    }
  })
};

module.exports = bd;
