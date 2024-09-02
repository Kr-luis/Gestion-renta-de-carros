import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../styles/Reservas.css';

// Función para generar un código aleatorio de 10 caracteres en mayúsculas
const generarCodigoAleatorio = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres[randomIndex];
    }
    return codigo;
};

const Reservas = () => {
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cedula, setCedula] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [idCliente, setIdCliente] = useState('');
    const [idVehiculos, setIdVehiculos] = useState([]);
    const [vehiculosDisponibles, setVehiculosDisponibles] = useState([]);
    const [clientes, setClientes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        obtenerVehiculosDisponibles();
        obtenerClientes();
        // Generar un código aleatorio al montar el componente
        setCodigo(generarCodigoAleatorio());
    }, []);

    const obtenerVehiculosDisponibles = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso2/vehiculo/ver`);
            setVehiculosDisponibles(data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al obtener los vehículos disponibles.',
            });
        }
    };

    const obtenerClientes = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso2/cliente/ver`);
            setClientes(data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al obtener los clientes.',
            });
        }
    };

    const seleccionarCliente = (cliente) => {
        setNombreCliente(`${cliente.nombre} ${cliente.apellido}`);
        setIdCliente(cliente._id);
        setCedula(cliente.cedula);
    };

    const crearReserva = async (e) => {
        e.preventDefault();

        if (!codigo || !descripcion || !idCliente || idVehiculos.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Por favor, completa todos los campos y selecciona al menos un vehículo.',
            });
            return;
        }

        try {
            const nuevaReserva = {
                codigo,
                descripcion,
                id_cliente: idCliente,  // Actualiza el nombre del campo
                id_vehiculo: idVehiculos // Actualiza el nombre del campo
            };

            console.log("Datos de la reserva a enviar:", nuevaReserva); // Agrega este log

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/caso2/reservas/crear`, nuevaReserva);

            console.log("Respuesta del servidor:", response); // Agrega este log

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Reserva creada con éxito.',
            });
            limpiarFormulario();
        } catch (error) {
            console.error("Error al crear reserva:", error); // Agrega este log

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response ? error.response.data.msg : 'Error al crear la reserva.',
            });
        }
    };

    const limpiarFormulario = () => {
        setDescripcion('');
        setCedula('');
        setNombreCliente('');
        setIdCliente('');
        setIdVehiculos([]);
    };

    const handleVehiculoSeleccionado = (id) => {
        if (idVehiculos.includes(id)) {
            setIdVehiculos(idVehiculos.filter(vehiculoId => vehiculoId !== id));
        } else {
            setIdVehiculos([...idVehiculos, id]);
        }
    };

    const handleVerReservas = () => {
        navigate('/reservas');
    };

    return (
        <div className="contenedor-reservas">
            <h2 className="titulo">Registrar Reserva</h2>
            <form onSubmit={crearReserva} className="formulario">
                <div className="campo-group">
                    <label className="label">Código</label>
                    <input
                        type="text"
                        className="input"
                        value={codigo}
                        readOnly // Campo solo lectura
                    />
                </div>
                <div className="campo-group">
                    <label className="label">Descripción</label>
                    <input
                        type="text"
                        className="input"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>
                <div className="campo-group">
                    <label className="label">Cliente</label>
                    <input
                        type="text"
                        className="input"
                        value={nombreCliente}
                        readOnly
                    />
                </div>
                <div className="campo-group">
                    <label className="label">Seleccionar Cliente</label>
                    <table className="tabla">
                        <thead>
                            <tr>
                                <th className="tabla-encabezado">Nombre</th>
                                <th className="tabla-encabezado">Apellido</th>
                                <th className="tabla-encabezado">Cédula</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((cliente) => (
                                <tr
                                    key={cliente._id}
                                    onClick={() => seleccionarCliente(cliente)}
                                    className={idCliente === cliente._id ? 'fila-seleccionada' : ''}
                                >
                                    <td className="tabla-celda">{cliente.nombre}</td>
                                    <td className="tabla-celda">{cliente.apellido}</td>
                                    <td className="tabla-celda">{cliente.cedula}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="campo-group">
                    <label className="label">Vehículos Disponibles</label>
                    <table className="tabla">
                        <thead>
                            <tr>
                                <th className="tabla-encabezado">Seleccionar</th>
                                <th className="tabla-encabezado">Marca</th>
                                <th className="tabla-encabezado">Placa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehiculosDisponibles.map((vehiculo) => (
                                <tr key={vehiculo._id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={idVehiculos.includes(vehiculo._id)}
                                            onChange={() => handleVehiculoSeleccionado(vehiculo._id)}
                                        />
                                    </td>
                                    <td className="tabla-celda">{vehiculo.marca}</td>
                                    <td className="tabla-celda">{vehiculo.placa}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="campo-group">
                    <label className="label">Vehículos Seleccionados</label>
                    <input
                        type="text"
                        className="input"
                        value={idVehiculos.join(', ')}
                        readOnly
                    />
                </div>
                <div className="botones">
                    <button type="submit" className="boton">Registrar Reserva</button>
                    <button type="button" onClick={handleVerReservas} className="boton-secundario">Reservas Registradas</button>
                </div>
            </form>
        </div>
    );
};

export default Reservas;
