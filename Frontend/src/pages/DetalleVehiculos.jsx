import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/Vehiculos.css';

const DetailVehiculo = () => {
    const [vehiculo, setVehiculo] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate(); // Hook para navegación

    useEffect(() => {
        const fetchVehiculo = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso2/vehiculo/ver/${id}`);
                setVehiculo(response.data);
            } catch (error) {
                console.error('Error al obtener el vehículo', error);
            }
        };

        fetchVehiculo();
    }, [id]);

    const handleBack = () => {
        navigate(-1); // Regresa a la página anterior
    };

    if (!vehiculo) return <p>Cargando...</p>;

    return (
        <div className="contenedor-vehiculo">
            <button className="btn-regresar" onClick={handleBack}>
                <FiArrowLeft className="icono-flecha" />
                Regresar
            </button>
            <h2 className="titulo">Detalles del Vehículo</h2>
            <div className="detalle">
                <p><strong>Marca:</strong> {vehiculo.marca}</p>
                <p><strong>Modelo:</strong> {vehiculo.modelo}</p>
                <p><strong>Año de Fabricación:</strong> {vehiculo.anio_fabricacion}</p>
                <p><strong>Placa:</strong> {vehiculo.placa}</p>
                <p><strong>Color:</strong> {vehiculo.color}</p>
                <p><strong>Tipo de Vehículo:</strong> {vehiculo.tipo_vehiculo}</p>
                <p><strong>Kilometraje:</strong> {vehiculo.kilometraje}</p>
                <p><strong>Descripción:</strong> {vehiculo.descripcion}</p>
            </div>
        </div>
    );
};

export default DetailVehiculo;
