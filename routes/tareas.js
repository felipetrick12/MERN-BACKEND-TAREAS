const {Router} = require('express');
const router = Router();
const { validarJWT } = require('../middleware/validarJWT');
const {check } = require('express-validator');
const { customValidator } = require('../middleware/customValidator');
const { crearTareas, obtenerTareas, actualizarTareas, eliminarTareas } = require('../controllers/tareasController');




router.use(validarJWT);

//obtener tareas
router.get('/',obtenerTareas);

// crea proyecto
router.post('/create',[
         check('nombre','El nombre es obligatorio').not().isEmpty(),
         check('proyecto','El proyecto es obligatorio').not().isEmpty(),
         customValidator
        ],
        crearTareas);


//actualizar Tarea
router.put('/:id',actualizarTareas);

//actualizar Tarea
router.delete('/:id',eliminarTareas);





module.exports = router;