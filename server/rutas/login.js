const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const Usuario = require('../modelos/usuario');

const app = express()


app.post('/login',(req,res)=>{

    let body = req.body;
    
    //validar si el usuario existe
    Usuario.findOne({email: body.email}, (err, usuarioBd)=>{
        console.log('usar',usuarioBd);

        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!usuarioBd){
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contrasea incorrectos'
                }
            });

        }

        //para saber la contraseña
        if(!bcrypt.compareSync((body.password),usuarioBd.password)){

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contrasea) incorrectos'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioBd,
        },process.env.SEED,{
            expiresIn: process.env.CADUCIDAD_TOKEN
        })

        res.json({
            ok:true,
            usuario: usuarioBd,
            token: token

        })

    })


})



module.exports = app;