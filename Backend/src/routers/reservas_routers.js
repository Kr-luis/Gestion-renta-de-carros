import{
    Actualizarreserva, Crearreserva, Eliminarreserva, Verreserva, detallereserva
} from "../controllers/reservas_controller.js"
import {Router} from "express"

const route = Router()

route.post("/reservas/crear", Crearreserva)
route.get("/reservas/ver", Verreserva)
route.get("/reservas/ver/:id", detallereserva)
route.put("/reservas/actualizar/:id", Actualizarreserva)
route.delete("/reservas/eliminar/:id", Eliminarreserva)

export default route