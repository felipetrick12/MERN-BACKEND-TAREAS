const {response}= require('express'); //para traer nuestra intelligence de js
const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs')


const crearUsuario = async(req,res= response) => {

    const {email, password} = req.body;

    try {
        //consultar que el usuario sea unico
        let usuario= await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg:'El usuario ya existe'})
        }

        //crea un nuevo usuario 
        usuario = new Usuario(req.body);

        //hashear password
        const salt = await bcryptjs.genSalt(10);
        usuario.password= await bcryptjs.hash( password , salt);

        //guarda el usuario
        usuario.save();

        //mensaje de confirmacion
        res.status(201).json({msg:'usuario creado correctamente'})
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

module.exports={
    crearUsuario,

}