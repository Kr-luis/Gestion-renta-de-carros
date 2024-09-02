import express from "express"
import doteenv from "dotenv"
import cors from "cors"

import routerUsuario from "./routers/usuarios_routers.js"
import routerCliente from "./routers/clientes_routers.js"
import routerVehiculo from "./routers/vehiculo_routers.js"
import routerReserva from "./routers/reservas_routers.js"

// Inicializar
const app = express()
doteenv.config()

// Configuraciones del puerto

app.set("port", process.env.port || 3000)
app.use(cors())

// Middlewares

app.use(express.json())

// Rutas

app.get("/", (req, res) => {
    res.send("Servidor levantado")
})

app.use("/caso2", routerUsuario)
app.use("/caso2", routerVehiculo)
app.use("/caso2", routerReserva)
app.use("/caso2", routerCliente)

// exportar 

export default app
