//verificar token
const jwt = require ('jsonwebtoken');


let verificaToken = (req,res, next)=>{

    //asi se obtiene el token
    let token = req.get('token');

    jwt.verify(token,process.env.SEED,(err,decode)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                err: {
                    message: 'Token no valido'
                }              
            })
        }

        req.usuario = decode.usuario;
        next();
        
    })

    //comprobar que el token sea valido

   
};


//Vertificar Admin Role

let verificaAdminRole = (req,res,next)=>{

    let usuario = req.usuario;

    console.log('holleee');

    if(usuario.role ==='ADMIN_ROLE'){
        next();
        return;
    } else {

            
        res.json({
            ok:false,
            err: {
                message : 'El usuario no es administrador'
            }
        })

    }



}




module.exports = {
    verificaToken,
    verificaAdminRole
}