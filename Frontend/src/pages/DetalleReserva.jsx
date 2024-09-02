import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Importar useNavigate
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/Reservas.css'; // Asegúrate de que el archivo CSS esté correctamente nombrado

const DetalleReserva = () => {
    const [reserva, setReserva] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate(); // Definir useNavigate para manejar la navegación

    useEffect(() => {
        const fetchReserva = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso2/reservas/ver/${id}`);
                setReserva(response.data);
            } catch (error) {
                console.error('Error al obtener la reserva', error);
            }
        };

        fetchReserva();
    }, [id]);

    if (!reserva) return <p>Cargando...</p>;

    return (
        <div className="contenedor-reservas">
            <button className="btn-regresar" onClick={() => navigate(-1)}>
                <FiArrowLeft className="icono-flecha" />
                Regresar
            </button>
            <h2 className="titulo">Detalles de la Reserva</h2>
            <div className="detalle">
                <p><strong>Código:</strong> {reserva.codigo}</p>
                <p><strong>Descripción:</strong> {reserva.descripcion}</p>
                <p><strong>Cliente:</strong> {reserva.cliente ? reserva.cliente.nombre : 'No disponible'}</p>
                <p><strong>Vehículos:</strong> 
                    {Array.isArray(reserva.vehiculos) && reserva.vehiculos.length > 0
                        ? reserva.vehiculos.join(', ')
                        : 'No disponible'}
                </p>
            </div>
        </div>
    );
};

export default DetalleReserva;
