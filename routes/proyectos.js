const {Router} = require('express');
const router = Router();
const { crearProyecto, obtenerProyecto,actualizarProyecto, eliminarProyecto } = require('../controllers/proyectoController');
const { validarJWT } = require('../middleware/validarJWT');
const {check } = require('express-validator');
const { customValidator } = require('../middleware/customValidator');



router.use(validarJWT);


//obtener proyectos 
router.get('/',obtenerProyecto);

// crea proyecto
router.post('/create',[
         check('nombre','El nombre es obligatorio').not().isEmpty(),
         customValidator
        ],
        crearProyecto);

router.put('/:id',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    customValidator
   ],
   actualizarProyecto);

router.delete('/:id', eliminarProyecto);



module.exports = router;