const Proyecto = require("../models/Proyecto");
const Tareas = require("../models/Tareas");



const crearTareas = async(req,res= response) => {

    const {proyecto} = req.body;
    const uid =req.uid;

    try {
      
        const existeProyecto = await Proyecto.findById(proyecto);

        if(!existeProyecto){
            return res.status(404).json({
            ok:false,
            msg: 'No se encontro el ID del Proyecto'
            })
        }

        if (existeProyecto.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg: 'No Autorizado'
            })
        }

        const tarea = new Tareas(req.body);
        await tarea.save();
        res.status(200).json({
            ok:true,
            tareas: tarea,
            msg: 'Tarea Creada'
        })


    } catch (error) {
        console.log(error)
         return res.status(500).json({
         ok:true,
         msg: 'hable con el administrador'
     })
    }
}

const obtenerTareas = async(req,res= response) => {

    const {proyecto} = req.query;
    const uid =req.uid;

    
    try {
      
        const existeProyecto = await Proyecto.findById(proyecto);

        if(!existeProyecto){
            return res.status(404).json({
            ok:false,
            msg: 'No se encontro el ID del Proyecto'
            })
        }

        if (existeProyecto.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg: 'No Autorizado'
            })
        }

        const tareas = await Tareas.find({proyecto});

        res.status(200).json({
           ok:true,
           tareas
          
   
       })

    } catch (error) {
        console.log(error)
         return res.status(500).json({
         ok:true,
         msg: 'hable con el administrador'
     })
    }
}

const actualizarTareas = async(req,res= response) => {

    const {proyecto,nombre,estado} = req.body;
    const uid =req.uid;

    try {
      
        let tarea = await Tareas.findById(req.params.id);

        if (!tarea) {
            return res.status(404).json({
                ok:false,
                msg: 'No Existe Tarea'
            })
        }

        const existeProyecto = await Proyecto.findById(proyecto);

        if (existeProyecto.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg: 'No Autorizado'
            })
        }

        const nuevaTareas = {
            ...req.body,
            user:uid
        }

        if( nombre ) nuevaTareas.nombre = nombre;        
        if( estado ) nuevaTareas.estado = estado;
        
    
        tarea =await Tareas.findOneAndUpdate({ _id: req.params.id} ,nuevaTareas,{new:true});
    
        res.status(200).json({
            ok:true,
            tarea: tarea,
            msg: 'Tarea Actualizada'
        });

    } catch (error) {
        console.log(error)
         return res.status(500).json({
         ok:true,
         msg: 'hable con el administrador'
     })
    }
}


const eliminarTareas = async(req,res= response) => {

    const {proyecto} = req.body;
    const uid =req.uid;

    try {
      
        let tarea = await Tareas.findById(req.params.id);

        if (!tarea) {
            return res.status(404).json({
                ok:false,
                msg: 'No Existe Tarea'
            })
        }

        const existeProyecto = await Proyecto.findById(proyecto);

        if (existeProyecto.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg: 'No Autorizado'
            })
        }


        tarea =await Tareas.findOneAndRemove({ _id: req.params.id});
    
        res.status(200).json({
            ok:true,
            tarea: tarea,
            msg : 'Tarea Eliminada'
        });

    } catch (error) {
        console.log(error)
         return res.status(500).json({
         ok:true,
         msg: 'hable con el administrador'
     })
    }
}





module.exports={
    crearTareas,
    obtenerTareas,
    actualizarTareas,
    eliminarTareas
}