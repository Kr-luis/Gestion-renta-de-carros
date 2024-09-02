import{
    Actualizarvehiculo,
    Crearvehiculo,
    detallevehiculo,
    Eliminarvehiculo,
    VerVehiculo
} from "../controllers/vehiculos_controller.js"
import { Router } from "express"

const router = Router()

router.post("/vehiculo/crear", Crearvehiculo)
router.get("/vehiculo/ver", VerVehiculo)
router.get("/vehiculo/ver/:id", detallevehiculo)
router.put("/vehiculo/actualizar/:id", Actualizarvehiculo)
router.delete("/vehiculo/eliminar/:id", Eliminarvehiculo)

export default router