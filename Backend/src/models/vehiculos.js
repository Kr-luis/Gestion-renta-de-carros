import mongoose, { Schema, model } from "mongoose";

const VehiculosSchema = new Schema({
    marca: {
        type: String,
        require: true,
        maxlength: 50
    },
    modelo: {
        type: String,
        require: true,
        maxlenght: 10
    },
    anio_fabricacion: {
        type: Date,
        require: true,
    },
    placa: {
        type: String,
        require: true,
        maxlenght:10,
    },
    color:{
        type:String,
        require:true,
        maxlenght:10
    },
    tipo_vehiculo:{
        type:String,
        require:true,
        maxlenght:20
    },
    kilometraje:{
        type:Number,
        require:true
    },
    descripcion:{
        type:String,
        require:true,
        maxlenght:50
    }
}, {
    timestamps: true
})
export default model("Vehiculo", VehiculosSchema)