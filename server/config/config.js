//Declaracion de constantes y valors de la aplicación

///
//Puerto
process.env.PORT = process.env.PORT || 3000;


//ENTORNO

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// VENCIMIENTO DEL TOKEN, 60seguntos, 60 minutos, horas y dias
process.env.CADUCIDAD_TOKEN = 60*60*24*30;


//SEED O semilla de autenticacion
process.env.SEED = process.env.SEED || 'seed-desarrollo';
//BAse de datos

let urlDB;

if(process.env.NODE_ENV ==='dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URL;
}


process.env.urlDB = urlDB;



