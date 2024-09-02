import mongoose from "mongoose";
import Clientes from "../models/clientes.js";
import Usuarios from "../models/usuarios.js";

const CrearCliente = async (req,res) => {
    // Solicuitud
    const {nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email} = req.body
    // Validaciones
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debe llenar todos los datos"})

    const EmailUsuario = await Usuarios.findOne({email})
    if (EmailUsuario) return res.status(400).json({msg:"Lo sentimos el email, parece que ha sido registrado en una cuenta de usuario"})

    const VerificarEmail = await Clientes.findOne({email})
    if(VerificarEmail) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})

    const Verificacion_numeros = /^[0-9]+$/;
    if(!Verificacion_numeros.test(cedula)) return res.status(400).json({msg:"Asegurese de ingresar solo numeros en la cedula"})

    if(!Verificacion_numeros.test(telefono)) return res.status(400).json({msg:"Asegurese de ingresar solo numeros en el telefono"})

    const VerificarCedula = await Clientes.findOne({cedula})
    if(VerificarCedula) return res.status(400).json({msg:"Lo sentimos, la cedula ya se encuentra registrada"})

    const Verificartelefono = await Clientes.findOne({telefono})
    if(Verificartelefono) return res.status(400).json({msg:"Lo sentimos, el telefono ya se encuentra registrado"})
    // BDD
    const nuevoCliente = new Clientes(req.body)
    await nuevoCliente.save()
    // Respuesta
    res.status(200).json({msg:"El Cliente fue registrado exitosamente"})
}

const VerCliente = async (req,res) => {
    try{
        const Clientes = await Clientes.find().select("-createdAt -updatedAt -__v");
        res.json(Clientes)
    } catch (error) {
        res.status(500).json({msg:"Hubo un error al mostrar los Clientes", error})
    }
}

const detalleCliente = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:`Lo sentimos, no se encuentra registrado el Cliente`});
    const Cliente = await Clientes.findById(id).select("-createdAt -updatedAt -__v")
    res.status(200).json(Cliente)
}


const ActualizarCliente = async (req,res) => {
    // Solicitud
    const {id} = req.params
    // Validaciones
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debe llenar todos los datos"})
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({msg:"No se ha encontrado a un Cliente con ese id"})
    // BDD
    await Clientes.findByIdAndUpdate(req.params.id, req.body)
    // Respuesta
    res.status(200).json({msg:"Se ha actualizado la informacion del Cliente"})
}

const EliminarCliente = async (req,res) => {
    // Solicitud
    const {id} = req.params
    // Validaciones
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:"Lo sentimos, no se ha encontrado al Cliente"})
    // BDD
    await Clientes.findByIdAndDelete(id)
    // Respuesta
    res.status(200).json({msg:"El registro del Cliente ha sido eliminado exitosamente"})
}

export{
    CrearCliente,
    VerCliente,
    ActualizarCliente,
    EliminarCliente,
    detalleCliente
}
