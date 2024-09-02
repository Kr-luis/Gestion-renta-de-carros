import{
    Actualizarreserva, Crearreserva, Eliminarreserva, Verreserva, detallereserva
} from "../controllers/reservas_controller.js"
import {Router} from "express"

const route = Router()

route.post("/matriculas/crear", Crearreserva)
route.get("/matriculas/ver", Verreserva)
route.get("/matriculas/ver/:id", detallereserva)
route.put("/matriculas/actualizar/:id", Actualizarreserva)
route.delete("/matriculas/eliminar/:id", Eliminarreserva)

export default route