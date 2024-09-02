import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/Reservas.css'; // Asegúrate de que el archivo CSS esté correctamente nombrado

const EditarReserva = () => {
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [idCliente, setIdCliente] = useState('');
    const [idVehiculos, setIdVehiculos] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReserva = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso2/reservas/ver/${id}`);
                const reserva = response.data;
                setCodigo(reserva.codigo);
                setDescripcion(reserva.descripcion);
                setIdCliente(reserva.cliente);
                setIdVehiculos(reserva.vehiculos);
            } catch (error) {
                console.error('Error al obtener la reserva', error);
                Swal.fire('Error', 'No se pudo obtener la reserva', 'error');
            }
        };

        fetchReserva();
    }, [id]);

    const actualizarReserva = async (e) => {
        e.preventDefault();
        if (!codigo || !descripcion || !idCliente || idVehiculos.length === 0) {
            Swal.fire('Advertencia', 'Por favor, complete todos los campos.', 'warning');
            return;
        }

        try {
            const reservaActualizada = { codigo, descripcion, cliente: idCliente, vehiculos: idVehiculos };
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/caso1/reservas/actualizar/${id}`, reservaActualizada);
            Swal.fire('Éxito', 'Reserva actualizada con éxito', 'success');
            navigate(-1); // Regresa a la página anterior
        } catch (error) {
            Swal.fire('Error', 'Error al actualizar la reserva', 'error');
        }
    };

    const handleBack = () => {
        navigate(-1); // Regresa a la página anterior
    };

    return (
        <div className="contenedor-reservas">
            <button className="btn-regresar" onClick={handleBack}>
                <FiArrowLeft className="icono-flecha" />
                Regresar
            </button>
            <h2 className="titulo">Editar Reserva</h2>
            {mensaje && <p className="mensaje">{mensaje}</p>}
            <form onSubmit={actualizarReserva} className="formulario">
                <div className="campo-group">
                    <label className="label">Código</label>
                    <input
                        type="text"
                        className="input"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
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
                    <label className="label">ID Cliente</label>
                    <input
                        type="text"
                        className="input"
                        value={idCliente}
                        onChange={(e) => setIdCliente(e.target.value)}
                    />
                </div>
                <div className="campo-group">
                    <label className="label">ID Vehículos (separados por comas)</label>
                    <input
                        type="text"
                        className="input"
                        value={idVehiculos.join(', ')}
                        onChange={(e) => setIdVehiculos(e.target.value.split(',').map(id => id.trim()))}
                    />
                </div>
                <div className="botones">
                    <button type="submit" className="boton">Actualizar Reserva</button>
                </div>
            </form>
        </div>
    );
};

export default EditarReserva;
