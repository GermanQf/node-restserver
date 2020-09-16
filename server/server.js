
require('./config/config')  //al inicializar, configura todo, el puerto en especial


const express = require('express');
const mongoose = require('mongoose');


const app = express()
const bodyParser = require('body-parser')
const { request } = require('express')


app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


//carga de rutas
app.use(require('./rutas/index'));

//conexion a la bd

/*await mongoose.connect('mongodb://localhost:27017/cafe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});*/


mongoose.connect(process.env.urlDB,
          {
            useNewUrlParser:true, 
            useCreateIndex:true,
             useUnifiedTopology: true}, 
          (err, resp)=>{
    if(err) throw err;

    console.log('Bd Online');
});
 
app.listen(process.env.PORT, ()=>{
    console.log('Escuchando en el puerto ',process.env.PORT)
})