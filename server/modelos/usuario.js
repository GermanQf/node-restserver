
//modelo de datos.user-select-all

const mongoose =require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    meesage: '{VALUE} no es un rol valido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true,'El nombre es necesario']
    },
    //el correo no puede ser repetido}
    // npm i mongoose-unique-validator
    email: {
        type: String,
        unique: true,
        require: [true,'el correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'la contraseña es necesaria']
    },
    img:{
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true

    },
    google: {
        type: Boolean,
        default: false

    }
}); //el esquema se declara

//quitar el password de la bd

usuarioSchema.methods.toJSON = function(){
    let user = this;
    let UserObjetct = user.toObject();
    delete UserObjetct.password;

    return UserObjetct;
}


usuarioSchema.plugin(uniqueValidator,{
    message:'{PATH} debe de ser unico'
})
module.exports= mongoose.model('Usuario',usuarioSchema); //asi se exporta y asi se llama el esquema