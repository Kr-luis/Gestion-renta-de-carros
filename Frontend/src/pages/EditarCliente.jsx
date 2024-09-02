import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/Clientes.css'; // Asegúrate de que el archivo CSS esté renombrado

const EditarCliente = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [cedula, setCedula] = useState('');
    const [ciudad, setCiudad] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerCliente = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso2/cliente/ver/${id}`);
                setNombre(data.nombre);
                setApellido(data.apellido);
                setCedula(data.cedula);
                setCiudad(data.ciudad);
            } catch (error) {
                Swal.fire('Error', 'No se pudo encontrar el cliente', 'error');
            }
        };

        obtenerCliente();
    }, [id]);

    const actualizarCliente = async (e) => {
        e.preventDefault();
        if (!nombre || !apellido || !cedula || !ciudad) {
            Swal.fire('Advertencia', 'Por favor, complete todos los campos.', 'warning');
            return;
        }

        try {
            const clienteActualizado = { nombre, apellido, cedula, ciudad };
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/caso2/cliente/actualizar/${id}`, clienteActualizado);
            Swal.fire('Éxito', 'Cliente actualizado con éxito', 'success');
            navigate('/clientes-registrados'); // Redirige a la página de clientes registrados después de actualizar
        } catch (error) {
            Swal.fire('Error', 'Error al actualizar al cliente', 'error');
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    // Función para manejar la entrada en el campo de cédula
    const handleCedulaChange = (e) => {
        const value = e.target.value;
        // Solo permite números en la cédula
        if (/^\d*$/.test(value)) {
            setCedula(value);
        }
    };

    return (
        <div className="contenedor-clientes">
            <button className="btn-regresar" onClick={handleBack}>
                <FiArrowLeft className="icono-flecha" />
            </button>
            <h2 className="titulo">Editar Cliente</h2>
            <form onSubmit={actualizarCliente} className="formulario">
                <div className="campo">
                    <label className="label">Nombre</label>
                    <input
                        type="text"
                        className="input"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label className="label">Apellido</label>
                    <input
                        type="text"
                        className="input"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label className="label">Cédula</label>
                    <input
                        type="text"
                        className="input"
                        value={cedula}
                        onChange={handleCedulaChange}
                    />
                </div>
                <div className="campo">
                    <label className="label">Ciudad</label>
                    <input
                        type="text"
                        className="input"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                    />
                </div>
                <button type="submit" className="boton">Actualizar Cliente</button>
            </form>
        </div>
    );
};

export default EditarCliente;
