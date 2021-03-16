const {Schema,model} = require('mongoose');


const ProyectoSchema = Schema({

    nombre :{
        type:String,
        required: true,
        trim :true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        
    },
    creado: {
        type: Date,
        default: Date.now(),
        trim :true,
    }

})


ProyectoSchema.method('toJSON',function () {
    const{_id,__v,...object} = this.toObject();
    object.id=_id;
    return object;

})


module.exports= model('Proyecto',ProyectoSchema);