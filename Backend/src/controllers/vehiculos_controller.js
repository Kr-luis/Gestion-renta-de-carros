import { mongoose } from "mongoose";
import Vehiculo from "../models/vehiculos.js";

const Crearvehiculo = async (req,res) => {
    // Solicitud
    const {marca, modelo, anio_fabricacion, placa, color, tipo_vehiculo, kilometraje, descripcion} = req.body
    const placamin = placa.toLowerCase();
    // Validaciones
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Debe llenar todos los campos"})

    const verificarPlaca = await Vehiculo.findOne({placa:placamin})
    if(verificarPlaca) return res.status(400).json({msg:"Ya existe una vehiculo con ese nombre"})
    
    const permitido = /^[A-Z0-9]+$/; // Permite letras, espacios y acentos
    if(!permitido.test(placa)) return res.status(400).json({msg:"No se permiten el uso de caracteres especiales, intente de nuevo"})

    const Nombre_permitidos = /^[a-zA-ZÀ-ÿ\s]+$/;
    if(!Nombre_permitidos.test(marca)) return res.status(400).json({msg:"Lo sentimos, la marca que intenta ingresar es incorrecta"})
    
    if(!Nombre_permitidos.test(modelo)) return res.status(400).json({msg:"Lo sentimos, el modelo que intenta ingresar es incorrecta"})
    
    if(!Nombre_permitidos.test(color)) return res.status(400).json({msg:"Lo sentimos, el color que intenta ingresar es incorrecta"})
    // BDD

    const nuevavehiculo = new Vehiculo({
        marca,
        modelo,
        anio_fabricacion,
        placa: placamin,
        color,
        tipo_vehiculo,
        kilometraje,
        descripcion
    });
    await nuevavehiculo.save()

    res.status(200).json({msg:"La vehiculo fue creada con exito"})
}

const VerVehiculo = async (req, res) => {
    try {
        const vehiculos = await Vehiculo.find().select("-createdAt -updatedAt -__v");
        res.json(vehiculos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las Vehiculo", error });
    }
};

const detallevehiculo = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe esta vehiculo`});
    const vehiculo = await Vehiculo.findById(id).select("-createdAt -updatedAt -__v")
    res.status(200).json(vehiculo)
}

const Actualizarvehiculo = async (req,res) => {
    // Solicitud
    const {id} = req.params
    // Validaciones
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:`Lo sentimos no existe o no se encontró esa vehiculo`})
    await Vehiculo.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({msg:"La vehiculo se actualizo correctamente"})
}

const Eliminarvehiculo = async (req,res) => {
    // Solicitud
    const {id} = req.params
    // Validaciones
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:"Lo sentimos no existe o no se encontró esa vehiculo"})
    // BDD
    await Vehiculo.findByIdAndDelete(req.params.id)
    // Respuesta
    res.status(200).json({msg:"La vehiculo se elimino correctamente"})
}

export {
    Actualizarvehiculo,
    Crearvehiculo,
    detallevehiculo,
    Eliminarvehiculo,
    VerVehiculo
};
