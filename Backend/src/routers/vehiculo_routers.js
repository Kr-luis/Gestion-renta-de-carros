import{
    Actualizarvehiculo,
    Crearvehiculo,
    detallevehiculo,
    Eliminarvehiculo,
    VerVehiculo
} from "../controllers/vehiculos_controller.js"
import { Router } from "express"

const router = Router()

router.post("/materias/crear", Crearvehiculo)
router.get("/materias/ver", VerVehiculo)
router.get("/materias/ver/:id", detallevehiculo)
router.put("/materias/actualizar/:id", Actualizarvehiculo)
router.delete("/materias/eliminar/:id", Eliminarvehiculo)

export default router