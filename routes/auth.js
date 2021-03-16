const {Router} = require('express');
const { crearUsuario, loginUsuario,revalidarToken } = require('../controllers/auth');
const router = Router();
const {check } = require('express-validator');
const { customValidator } = require('../middleware/customValidator');
const { validarJWT } = require('../middleware/validarJWT');


router.post(
    '/new',
    [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','No es un email, No existe email').isEmail().not().isEmpty(),
    check('password','Contraseña obligatoria').not().isEmpty(),
    customValidator
    ],
    crearUsuario );

router.post(
        '/', 
        [
            check('email','Email obligatorio').isEmail().not().isEmpty(),
            check('password','Contraseña obligatoria').not().isEmpty(),
            customValidator
            
        ],
        loginUsuario 
        );


router.get('/renew',validarJWT,revalidarToken);


    

module.exports= router;