import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Swal from 'sweetalert2';
import '../styles/Vehiculos.css';

const EditarVehiculo = () => {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [anioFabricacion, setAnioFabricacion] = useState('');
    const [placa, setPlaca] = useState('');
    const [color, setColor] = useState('');
    const [tipoVehiculo, setTipoVehiculo] = useState('');
    const [kilometraje, setKilometraje] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVehiculo = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso2/vehiculo/ver/${id}`);
                const vehiculo = response.data;
                setMarca(vehiculo.marca);
                setModelo(vehiculo.modelo);
                setAnioFabricacion(vehiculo.anio_fabricacion);
                setPlaca(vehiculo.placa);
                setColor(vehiculo.color);
                setTipoVehiculo(vehiculo.tipo_vehiculo);
                setKilometraje(vehiculo.kilometraje);
                setDescripcion(vehiculo.descripcion);
            } catch (error) {
                console.error('Error al obtener el vehículo', error);
            }
        };

        fetchVehiculo();
    }, [id]);

    const actualizarVehiculo = async (e) => {
        e.preventDefault();
        try {
            const vehiculoActualizado = { marca, modelo, anio_fabricacion: anioFabricacion, placa, color, tipo_vehiculo: tipoVehiculo, kilometraje, descripcion };
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/caso2/vehiculo/actualizar/${id}`, vehiculoActualizado);
            Swal.fire({
                icon: 'success',
                title: 'Actualización exitosa',
                text: 'Vehículo actualizado con éxito',
            }).then(() => {
                navigate(-1); // Regresa a la página anterior
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al actualizar el vehículo',
            });
        }
    };

    const handleBack = () => {
        navigate(-1); // Regresa a la página anterior
    };

    return (
        <div className="contenedor-vehiculo">
            <button className="btn-regresar" onClick={handleBack}>
                <FiArrowLeft className="icono-flecha" />
                Regresar
            </button>
            <h2 className="titulo">Editar Vehículo</h2>
            <form onSubmit={actualizarVehiculo} className="formulario">
                <div className="campo-group">
                    <label className="label">Marca</label>
                    <input
                        type="text"
                        className="input"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                    />
                </div>
                <div className="campo-group">
                    <label className="label">Modelo</label>
                    <input
                        type="text"
                        className="input"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                    />
                </div>
                <div className="campo-group">
                    <label className="label">Año de Fabricación</label>
                    <input
                        type="number"
                        className="input"
                        value={anioFabricacion}
                        onChange={(e) => setAnioFabricacion(e.target.value)}
                    />
                </div>
                <div className="campo-group">
                    <label className="label">Placa</label>
                    <input
                        type="text"
                        className="input"
                        value={placa}
                        onChange={(e) => setPlaca(e.target.value)}
                    />
                </div>
                <div className="campo-group">
                    <label className="label">Color</label>
                    <input
                        type="text"
                        className="input"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>
                <div className="campo-group">
                    <label className="label">Tipo de Vehículo</label>
                    <input
                        type="text"
                        className="input"
                        value={tipoVehiculo}
                        onChange={(e) => setTipoVehiculo(e.target.value)}
                    />
                </div>
                <div className="campo-group">
                    <label className="label">Kilometraje</label>
                    <input
                        type="text"
                        className="input"
                        value={kilometraje}
                        onChange={(e) => setKilometraje(e.target.value)}
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
                <div className="botones">
                    <button type="submit" className="boton">Actualizar Vehículo</button>
                    <button type="button" onClick={handleBack} className="boton-secundario">Ver Vehículos</button>
                </div>
            </form>
        </div>
    );
};

export default EditarVehiculo;
