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
    cliente:{
        type:Object,
        ref:"Cliente"
    },
    vehiculos:{
        type:[Object],
        ref:"Vehiculo"
    }
},{
    timestamps:true
})

export default model("Reserva", ReservasSchema)