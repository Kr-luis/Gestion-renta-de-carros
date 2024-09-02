import './App.css'
import { PaginaInicial } from './pages/PaginaInicial.jsx'
import Ingresar from './pages/Ingresar.jsx'
import { Registrar } from './pages/Registrar.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider.jsx'
import Auth from './layout/Auth'
import { PrivateRoute } from './routes/PrivateRoute.jsx'
import Clientes from './pages/Clientes.jsx';
import EditarCliente from './pages/EditarCliente.jsx';
import Vehiculos from './pages/Vehiculos.jsx';
import ListVehiculos from './pages/VehiculosRegistrados.jsx';
import EditarVehiculo from './pages/EditarVehiculo.jsx';
import DetalleVehiculo from './pages/DetalleVehiculos.jsx';
import Reservas from './pages/Reservas.jsx';
import DetalleReserva from './pages/DetalleReserva.jsx';
import EditarReserva from './pages/EditarReserva.jsx';
import ListaReservas from './pages/ListaReservas.jsx';
import Dashboard from './layout/Dashboard.jsx';
import ClientesRegistrados from './pages/ClientesRegistrados.jsx'

function App() {
  return (

    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route index element={<PaginaInicial/>}/>
            <Route path='/' element={<Auth/>}>
            <Route path='ingresar' element={<Ingresar/>}/>
            <Route path='registrar' element={<Registrar/>}/>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='dashboard/clientes' element={<Clientes />} />
            <Route path='clientes-registrados' element={<ClientesRegistrados />} />
            <Route path='editar-cliente/:id' element={<EditarCliente />} />
            <Route path="dashboard/vehiculos" element={<Vehiculos />} />
            <Route path="vehiculo/editar/:id" element={<EditarVehiculo />} />
            <Route path="vehiculo/detalle/:id" element={<DetalleVehiculo />} />
            <Route path="/vehiculos" element={<ListVehiculos />} /> 
            <Route path="dashboard/reservas" element={< Reservas />} />
            <Route path="reserva/editar/:id" element={<EditarReserva />} />
            <Route path="reserva/detalle/:id" element={<DetalleReserva />} />
            <Route path="reservas" element={<ListaReservas />} /> 
        </Route>
        </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
