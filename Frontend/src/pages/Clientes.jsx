import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import '../styles/Clientes.css';

const Clientes = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const crearCliente = async (e) => {
    e.preventDefault();
    try {
      const nuevoCliente = { nombre, apellido, cedula, fecha_nacimiento: fechaNacimiento, ciudad, direccion, telefono, email };
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/caso2/cliente/crear`, nuevoCliente);
      Swal.fire('Éxito', 'Cliente registrado con éxito', 'success');
      limpiarFormulario();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.msg || 'Error al registrar al cliente', 'error');
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setApellido('');
    setCedula('');
    setFechaNacimiento('');
    setCiudad('');
    setDireccion('');
    setTelefono('');
    setEmail('');
  };

  const handleVerClientes = () => {
    navigate('/clientes-registrados'); // Navega a la página de clientes registrados
  };

  return (
    <div className="contenedor-clientes">
      <h2 className="titulo">Registrar Cliente</h2>
      <form onSubmit={crearCliente} className="formulario">
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
            onChange={(e) => setCedula(e.target.value)}
          />
        </div>
        <div className="campo">
          <label className="label">Fecha de Nacimiento</label>
          <input
            type="date"
            className="input"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
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
        <div className="campo">
          <label className="label">Dirección</label>
          <input
            type="text"
            className="input"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>
        <div className="campo">
          <label className="label">Teléfono</label>
          <input
            type="text"
            className="input"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="campo">
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="botones">
          <button type="submit" className="boton">Registrar Cliente</button>
          <button type="button" onClick={handleVerClientes} className="boton-secundario">Ver Clientes Registrados</button>
        </div>
      </form>
    </div>
  );
};

export default Clientes;
