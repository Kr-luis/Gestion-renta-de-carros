import mongoose from "mongoose"
import Cliente from "../models/clientes.js"
import Vehiculo from "../models/reserva.js"
import Reserva from "../models/vehiculos.js"
const Crearreserva = async (req,res) =>{
    const {codigo, descripcion, id_cliente, id_vehiculo} = req.body

    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Debes de llenar los campos obligatorios"})

    const verificarCodigo = await Vehiculo.findOne({codigo})
    if(verificarCodigo) return res.status(400).json({msg:"Lo sentimos, el codigo ingresado ya esta en uso"})

    const permitidoCodigo = /^[A-Z0-9]+$/;
    if(!permitidoCodigo.test(codigo)) return res.status(400).json({msg:"El codigo solo puedo contener mayusculas y numeros"})
    
    const Verificarestudiante = await Cliente.findById(id_estudiante)
    if(!Verificarestudiante) return res.status(400).json({msg:"No se encontro al estudiante"})

    for (let id of id_Reserva) {
        const Verificarmateria = await Reserva.findOne({ _id: id });
        if (!Verificarmateria) {
            return res.status(400).json({ msg: `No se encontró la materia con id: ${id}` });
        }
    }

    const nuevareserva = new Vehiculo(req.body);
    await nuevareserva.save();

    res.status(200).json({ msg: "La matrícula fue creada con éxito" });
}

const Verreserva = async (req,res) =>{
    try{
        const Vehiculo = await Vehiculo.find().select("-createdAt -updatedAt -__v")
        res.json(Vehiculo)
    }catch(error){
        res.status(500).json({msg:"Lo sentimos ocurrio un error", error})
    }
}

const detallereserva = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:`Lo sentimos, no se encuentra registrado el estudiante`});
    const reserva = await Vehiculo.findById(id).select("-createdAt -updatedAt -__v")
    res.status(200).json(reserva)
}

const Actualizarreserva = async (req,res) =>{
    const {id} = req.params

    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({msg:"Lo sentimos, no se encuentra una reserva registrada con ese id"})

    await Vehiculo.findByIdAndUpdate(req.params.id , req.body)

    res.status(200).json({msg:"La reserva fue actualizada con exito"})
}

const Eliminarreserva = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({msg:"Lo sentimos, no existe una reserva registrada con ese id"})
    
    await Vehiculo.findByIdAndDelete(id)

    res.status(200).json({msg:"La reserva fue elminada correctamente"})
}

export {
    Actualizarreserva, Crearreserva, Eliminarreserva, Verreserva, detallereserva
}
