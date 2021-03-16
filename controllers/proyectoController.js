const Proyecto = require("../models/Proyecto");



const crearProyecto = async(req,res= response) => {

    try {
        const proyecto = new Proyecto(req.body);
        
        proyecto.user = req.uid;
        const proyectoDB = await proyecto.save();
        
        res.status(401).json({
            ok:true,
            proyecto: proyectoDB
        })


    } catch (error) {
        console.log(error)
         return res.status(500).json({
         ok:true,
         msg: 'hable con el administrador'
     })
    }
}

const obtenerProyecto = async(req,res= response) => {

    try {
        const proyectos = await Proyecto.find({user: req.uid});

        res.status(401).json({
           ok:true,
           proyectos
   
       })
           
    } catch (error) {
        console.log(error)
         return res.status(500).json({
         ok:false,
         msg: 'hable con el administrador'
     })
    }
}

const actualizarProyecto = async(req,res= response) => {

    const proyectoID = req.params.id;
    const uid =req.uid;

    try {
    
    const proyecto = await Proyecto.findById(proyectoID);

    if(!proyecto) {
        return res.status(404).json({
           ok:false,
           msg: 'No se encontro el ID del Proyecto'
        })
    }

     if (proyecto.user.toString() !== uid) {
        return res.status(401).json({
            ok:false,
            msg: 'No tiene permiso para editar este proyecto'
        })
    }

    const nuevoProyecto = {
        ...req.body,
        user:uid
    }

    const proyectoActualizado =await Proyecto.findByIdAndUpdate(proyectoID,nuevoProyecto,{new:true});

    res.status(200).json({
        ok:true,
        proyecto: proyectoActualizado
    });

    } catch (error) {
        console.log(error)
         return res.status(500).json({
         ok:false,
         msg: 'hable con el administrador'
     })
    }
}


const eliminarProyecto = async (req,res= response) => { 

    const proyectoID = req.params.id;
    const uid =req.uid;

    try {
    
    const proyecto = await Proyecto.findById(proyectoID);

    if(!proyecto) {
        return res.status(404).json({
           ok:false,
           msg: 'No se encontro el ID del Proyecto'
        })
    }

     if (proyecto.user.toString() !== uid) {
        return res.status(401).json({
            ok:false,
            msg: 'No tiene permiso para eliminar este proyecto'
        })
    }

    const proyectoEliminado = await Proyecto.findByIdAndRemove(proyectoID);
         
    res.status(200).json({
        ok:true,
        msg: 'Proyecto Eliminado',
        proyectoEliminado
    });

    } catch (error) {
        console.log(error)
         return res.status(500).json({
         ok:false,
         msg: 'hable con el administrador'
     })
    }

}


module.exports={
    crearProyecto,
    obtenerProyecto,
    actualizarProyecto,
    eliminarProyecto
    

}