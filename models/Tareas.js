const {Schema,model} = require('mongoose');


const TareasSchema = Schema({

    nombre :{
        type:String,
        required: true,
        trim :true
    },
    estado: {
        type: Boolean,
        default: false
    },
    creado: {
        type: Date,
        default: Date.now(),
        trim :true,
    },
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Proyecto',
    }
})


TareasSchema.method('toJSON',function () {
    const{_id,__v,...object} = this.toObject();
    object.id=_id;
    return object;

})


module.exports= model('Tarea',TareasSchema);