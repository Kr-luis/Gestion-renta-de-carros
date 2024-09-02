import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import '../styles/Vehiculos.css';

const ListVehiculos = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVehiculos = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso2/vehiculo/ver`);
                setVehiculos(response.data);
            } catch (error) {
                console.error('Error al obtener los vehículos', error);
            }
        };

        fetchVehiculos();
    }, []);

    const handleBack = () => {
        navigate(-1); // Regresa a la página anterior
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás recuperar este registro después de eliminarlo.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/caso2/vehiculo/eliminar/${id}`);
                Swal.fire(
                    'Eliminado!',
                    'El vehículo ha sido eliminado.',
                    'success'
                );
                // Actualizar la lista de vehículos después de eliminar
                setVehiculos(vehiculos.filter(vehiculo => vehiculo._id !== id));
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'Hubo un problema al eliminar el vehículo.',
                    'error'
                );
            }
        }
    };

    return (
        <div className="contenedor-vehiculos">
            <button className="btn-regresar" onClick={handleBack}>
                <FiArrowLeft className="icono-flecha" />
                Regresar
            </button>
            <h2 className="titulo">Vehículos Registrados</h2>
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Año de Fabricación</th>
                        <th>Placa</th>
                        <th>Color</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {vehiculos.map(vehiculo => (
                        <tr key={vehiculo._id}>
                            <td>{vehiculo.marca}</td>
                            <td>{vehiculo.modelo}</td>
                            <td>{vehiculo.anio_fabricacion}</td>
                            <td>{vehiculo.placa}</td>
                            <td>{vehiculo.color}</td>
                            <td>
                                <Link to={`/vehiculo/editar/${vehiculo._id}`} className="boton-editar">Editar</Link>
                                <Link to={`/vehiculo/detalle/${vehiculo._id}`} className="boton-detalle">Detalle</Link>
                                <button
                                    onClick={() => handleDelete(vehiculo._id)}
                                    className="boton-eliminar"
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

export default ListVehiculos;
