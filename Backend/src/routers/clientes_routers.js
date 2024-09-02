import{
    CrearCliente,
    VerCliente,
    ActualizarCliente,
    EliminarCliente,
    detalleCliente
} from "../controllers/clientes_controller.js"

import {Router} from "express"

const route = Router()

route.post("/estudiante/crear", CrearCliente)
route.get("/estudiante/ver", VerCliente)
route.get("/estudiante/ver/:id", detalleCliente)
route.put("/estudiante/actualizar/:id", ActualizarCliente)
route.delete("/estudiante/eliminar/:id", EliminarCliente)

export default route
