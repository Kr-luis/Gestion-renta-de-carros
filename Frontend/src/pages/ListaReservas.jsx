import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import '../styles/Reservas.css'; // Cambiar el nombre del archivo CSS

const ListaReservas = () => {
    const [reservas, setReservas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso2/reservas/ver`);
                setReservas(response.data);
            } catch (error) {
                console.error('Error al obtener las reservas', error);
            }
        };

        fetchReservas();
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    const handleEliminar = async (id) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción no se puede deshacer.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/caso2/reservas/eliminar/${id}`);
                Swal.fire(
                    'Eliminado',
                    'La reserva ha sido eliminada.',
                    'success'
                );
                setReservas(reservas.filter(reserva => reserva._id !== id));
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar la reserva.',
            });
        }
    };

    return (
        <div className="contenedor-reservas"> {/* Cambiar clase CSS */}
            <button className="btn-regresar" onClick={handleBack}>
                <FiArrowLeft className="icono-flecha" />
                Regresar
            </button>
            <h2 className="titulo">Reservas Registradas</h2>
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Cliente</th> {/* Cambiar "Estudiante" a "Cliente" */}
                        <th>Vehículos</th> {/* Cambiar "Materias" a "Vehículos" */}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map(reserva => (
                        <tr key={reserva._id}>
                            <td>{reserva.codigo}</td>
                            <td>{reserva.descripcion}</td>
                            <td>{reserva.id_cliente}</td> {/* Cambiar "id_estudiante" a "id_cliente" */}
                            <td>
                                {Array.isArray(reserva.id_vehiculos)
                                    ? reserva.id_vehiculos.join(', ')
                                    : 'No disponible'}
                            </td> {/* Cambiar "id_materias" a "id_vehiculos" */}
                            <td>
                                <Link to={`/reserva/editar/${reserva._id}`} className="boton-editar">Editar</Link>
                                <Link to={`/reserva/detalle/${reserva._id}`} className="boton-detalle">Detalle</Link>
                                <button
                                    className="boton-eliminar"
                                    onClick={() => handleEliminar(reserva._id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaReservas;
