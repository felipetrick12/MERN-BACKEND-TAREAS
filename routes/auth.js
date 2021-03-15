const {Router} = require('express');
const { crearUsuario } = require('../controllers/auth');
const router = Router();
const {check } = require('express-validator');
const { customValidator } = require('../middleware/customValidator');


router.post(
    '/new',
    [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','No es un email, No existe email').isEmail().not().isEmpty(),
    check('password','Contraseña obligatoria').not().isEmpty(),
    customValidator
    ],
    crearUsuario );


    

module.exports= router;