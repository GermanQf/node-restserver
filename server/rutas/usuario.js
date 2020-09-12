
const express = require('express');
const Usuario = require('../modelos/usuario');

const _ = require('underscore');

//encriptar la contraseña

const bcrypt = require('bcrypt');
const usuario = require('../modelos/usuario');
const { response } = require('express');

const app = express()

app.get('/usuario', function (req, res) {
    //res.json('getUsuariosss'); //se envia en json

    let desde = Number(req.query.desde) || 0; //supong que viene, sino voy desde la pag 0
    let limite = Number(req.query.limite) || 5;

    //trae todo

    //paginados
    Usuario.find({estado:true}, 'nombre email role estado goole img')
        .skip(desde)  //se salta los primeros 5
        .limit(limite)
        .exec((err,usuarios)=>{
        
        if(err){
            return res.status(400).json({
                ok: false,
                err:err
            });
        }

        //saber el numero de registros
        Usuario.countDocuments({estado:true}, (err, conteo)=>{
            res.json(
                {
                    ok:true,
                    usuarios,
                    cuantos: conteo
                }
            )
        })
  
       //console.log(usuarios);
    })


  });
  
  app.post('/usuario', function (req, res) {
  
      let body = req.body;
    
      let usuario = new Usuario({
          nombre: body.nombre,
          email: body.email,
          password: bcrypt.hashSync(body.password,10) ,
          role: body.role

      });

    //console.log('lllega esto',usuario);

      usuario.save((err,usuarioDb)=>{
        if(err) {
            return res.status(400).json({
                ok:false,
                err:err
            })
        }

        //quitar la contraseña de la respuesta
        //usuarioDb.password = null;

        res.json({
            ok:true,
            usuario: usuarioDb
            
        })

      });
      
    
  
      /*if(body.name === undefined){
  
          res.status(400).json({
              ok: false,
              mensaje: 'Faltan datos'
          });
  
      } else {
  
          res.json({
              persona:body
          }); //se envia en json
      
  
      }*/
  
      
    });
  
  app.put('/usuario/:id', function (req, res) {
      let id = req.params.id;
      let body = _.pick(req.body,['nombre','email','img','role','estado']) ;



      Usuario.findByIdAndUpdate(id,body,{new: true, runValidators:true},(err,user)=>{
          
           if(err){
               return res.status(400).json({
                   ok: false,
                   err
               });
           }

           res.json({
            ok: true,
            usuario: user
        }); //se envia en json

      })
    });
    
  
  app.delete('/usuario/:id', function (req, res) {
  //res.json('delete usuario'); //se envia en json

  let id = req.params.id;

  //Asi se remuve fisicamente de la bd, pero si se inactiva

  let cambiaEstado = {
      estado : false
  }
 
  //Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>{
  Usuario.findByIdAndUpdate(id, cambiaEstado,{new: true, runValidators:true},  (err,usuarioBorrado)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if(!usuarioBorrado){
            return res.status(400).json({
                ok: false,
                err : {
                    message: 'Usuario no encontrado'
                }
            });

        }

        res.json({
            status: true,
            usaurio:usuarioBorrado
        })


  })

  });
  

  module.exports = app;