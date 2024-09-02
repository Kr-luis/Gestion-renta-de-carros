import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import '../styles/Materias.css';

const Clientes = () => {
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [creditos, setCreditos] = useState('');
  const navigate = useNavigate();

  const crearMateria = async (e) => {
    e.preventDefault();
    try {
      const nuevaMateria = { nombre, codigo, descripcion, creditos };
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/caso1/materias/crear`, nuevaMateria);
      Swal.fire('Éxito', 'Cliente registrado con éxito', 'success');
      limpiarFormulario();
    } catch (error) {
      Swal.fire('Error', 'Error al registrar al cliente', 'error');
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setCodigo('');
    setDescripcion('');
    setCreditos('');
  };

  const handleVerMaterias = () => {
    navigate('/clientes-registrados'); // Navega a la página de materias registradas
  };

  return (
    <div className="contenedor-materias">
      <h2 className="titulo">Registrar Cliente</h2>
      <form onSubmit={crearMateria} className="formulario">
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
          <label className="label">Código</label>
          <input
            type="text"
            className="input"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
        </div>
        <div className="campo">
          <label className="label">Descripción</label>
          <input
            type="text"
            className="input"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="campo">
          <label className="label">Créditos</label>
          <input
            type="number"
            className="input"
            value={creditos}
            onChange={(e) => setCreditos(e.target.value)}
          />
        </div>
        <div className="botones">
          <button type="submit" className="boton">Registrar Cliente</button>
          <button type="button" onClick={handleVerMaterias} className="boton-secundario">Ver Clientes Registrados</button>
        </div>
      </form>
    </div>
  );
};

export default Clientes;
