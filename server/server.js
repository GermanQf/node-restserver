
require('./config/config')  //al inicializar, configura todo, el puerto en especial

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { request } = require('express')


app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.get('/usuario', function (req, res) {
  res.json('getUsuariosss'); //se envia en json
});


app.post('/usuario', function (req, res) {

    let body = req.body;


    if(body.name === undefined){

        res.status(400).json({
            ok: false,
            mensaje: 'Faltan datos'
        });

    } else {

        res.json({
            persona:body
        }); //se envia en json
    

    }

    
  });

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
res.json({
    id
}); //se envia en json
});


app.delete('/usuario', function (req, res) {
res.json('delete usuario'); //se envia en json
});



 
app.listen(process.env.PORT, ()=>{
    console.log('Escuchando en el puerto ',process.env.PORT)
})