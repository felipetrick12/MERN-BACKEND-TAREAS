const {response}= require('express'); //para traer nuestra intelligence de js
const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req,res= response) => {

    const {email, password} = req.body;

    try {
        //consultar que el usuario sea unico
        let usuario= await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({
                ok:false,
                msg: 'El Usuario ya existe',
                
            })
        }

        //crea un nuevo usuario 
        usuario = new Usuario(req.body);

        //hashear password
        const salt = await bcryptjs.genSalt(10);
        usuario.password= await bcryptjs.hash( password , salt);

        //guarda el usuario
        usuario.save();

        console.log(usuario)
        
        //crear el jsonwebtoken
        const token = await generarJWT(usuario.id,usuario.name) //guarda el token creado

        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'servidor caido'
        })
    }
}

const loginUsuario = async (req,res= response) => {
    
    const {email,password} = req.body;

    try {
        const usuario = await Usuario.findOne({email});

        if(!usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'el usuario no existe con ese email'
            })
        }


        const validPassword = bcryptjs.compareSync(password,usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok:false,
                msg:'password incorrecto'
            })
            
        }

        const token = await generarJWT(usuario.id,usuario.name)
        
        res.json ({
            ok:true,
            uid: usuario.id,
            name:usuario.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'servidor caido'
        })
    }
}


const autenticarUsuario =  async (req,res= response) => {    
   try {
       const usuario = await Usuario.findById(req.uid).select('-password');
      
       res.status(202).json({ 
           usuario
       })
   } catch (error) {
       res.status(500).json({
           msg: 'hubo un error'
       })
   }
}

const revalidarToken =  async (req,res= response) => {

    const uid= req.uid;
    const name= req.name;

    const token = await generarJWT(uid,name)

    res.json({
        ok:true,
        msg: 'renew',
        uid,
        name,
        token
    })
}

module.exports={
    crearUsuario,
    loginUsuario,
    revalidarToken,
    autenticarUsuario

}