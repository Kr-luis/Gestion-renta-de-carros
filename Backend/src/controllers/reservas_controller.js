import mongoose from "mongoose"
import Cliente from "../models/clientes.js"
import Vehiculo from "../models/vehiculos.js"
import Reserva from "../models/reserva.js"
const Crearreserva = async (req, res) => {
    try {
        const { codigo, descripcion, id_cliente, id_vehiculo } = req.body;

        if (Object.values(req.body).includes("")) 
            return res.status(400).json({ msg: "Debes de llenar los campos obligatorios" });

        const verificarCodigo = await Reserva.findOne({ codigo });
        if (verificarCodigo) 
            return res.status(400).json({ msg: "Lo sentimos, el codigo ingresado ya esta en uso" });

        const permitidoCodigo = /^[A-Z0-9]+$/;
        if (!permitidoCodigo.test(codigo)) 
            return res.status(400).json({ msg: "El codigo solo puedo contener mayusculas y numeros" });

        const Verificarcliente = await Cliente.findById(id_cliente);
        if (!Verificarcliente) 
            return res.status(400).json({ msg: "No se encontró al cliente" });

        console.log("Cliente encontrado:", Verificarcliente); // Verificar que el estudiante tiene datos

        const vehiculoscompletos = [];
        for (let id of id_vehiculo) {
            const VerificarVehiculo = await Vehiculo.findById(id);
            if (!VerificarVehiculo) {
                return res.status(400).json({ msg: `No se encontró el vehiculo con id: ${id}` });
            }
            console.log("Vehiculos encontrados:", VerificarVehiculo); // Verificar que cada materia tiene datos
            vehiculoscompletos.push(VerificarVehiculo);
        }

        console.log("Vehiculos: ", vehiculoscompletos); // Verificar que el array no está vacío

        // Reemplazar los IDs con la información completa
        const nuevaReserva = new Reserva({
            codigo,
            descripcion,
            cliente: Verificarcliente,  // Aquí se guarda la información completa del estudiante
            vehiculos: vehiculoscompletos       // Aquí se guarda la información completa de las materias
        });

        await nuevaReserva.save();

        res.status(200).json({ msg: "La reserva fue creada con éxito" });
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};


const Verreserva = async (req,res) =>{
    try{
        const reservas = await Reserva.find().select("-createdAt -updatedAt -__v")
        res.json(reservas)
    }catch(error){
        res.status(500).json({msg:"Lo sentimos ocurrio un error", error})
    }
}

const detallereserva = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:`Lo sentimos, no se encuentra registrado la reserva`});
    const reserva = await Reserva.findById(id).select("-createdAt -updatedAt -__v")
    res.status(200).json(reserva)
}

const Actualizarreserva = async (req,res) =>{
    const {id} = req.params

    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({msg:"Lo sentimos, no se encuentra una reserva registrada con ese id"})

    await Reserva.findByIdAndUpdate(req.params.id , req.body)

    res.status(200).json({msg:"La reserva fue actualizada con exito"})
}

const Eliminarreserva = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({msg:"Lo sentimos, no existe una reserva registrada con ese id"})
    
    await Reserva.findByIdAndDelete(id)

    res.status(200).json({msg:"La reserva fue elminada correctamente"})
}

export {
    Actualizarreserva, Crearreserva, Eliminarreserva, Verreserva, detallereserva
}
