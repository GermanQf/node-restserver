//Declaracion de constantes y valors de la aplicación

///
//Puerto
process.env.PORT = process.env.PORT || 3000;


//ENTORNO

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



//BAse de datos

let urlDB;

if(process.env.NODE_ENV ==='dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://geraqf:Cm1OKvz6TkazXkMj@cluster0.afeyl.mongodb.net/cafe';
}


process.env.urlDB = urlDB;



