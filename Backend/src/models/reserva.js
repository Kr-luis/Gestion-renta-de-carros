import mongoose, {Schema, model} from "mongoose";

const ReservasSchema = new Schema({
    codigo:{
        type:String,
        require:true,
        maxlength:20
    },
    descripcion:{
        type:String,
        require:true,
        maxlength:50
    },
    id_cliente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cliente"
    },
    id_vehiculo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehiculo"
    }]
},{
    timestamps:true
})

export default model("Reserva", ReservasSchema)