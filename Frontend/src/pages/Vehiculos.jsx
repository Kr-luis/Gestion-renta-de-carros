import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/Vehiculos.css'; // Asegúrate de que el archivo CSS esté correctamente nombrado

const Vehiculos = () => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anioFabricacion, setAnioFabricacion] = useState('');
  const [placa, setPlaca] = useState('');
  const [color, setColor] = useState('');
  const [tipoVehiculo, setTipoVehiculo] = useState('');
  const [kilometraje, setKilometraje] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();

  const crearVehiculo = async (e) => {
    e.preventDefault();

    // Validaciones en el frontend
    if ([marca, modelo, anioFabricacion, placa, color, tipoVehiculo, kilometraje, descripcion].includes('')) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Lo sentimos, debes llenar todos los datos.',
      });
      return;
    }

    const Verificacion_numeros = /^[0-9]+$/;
    if (!Verificacion_numeros.test(kilometraje)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Asegúrate de ingresar solo números en el kilometraje.',
      });
      return;
    }

    if (!Verificacion_numeros.test(anioFabricacion)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Asegúrate de ingresar solo números en el año de fabricación.',
      });
      return;
    }

    const permitido = /^[A-Z0-9]+$/; // Permite letras y números sin caracteres especiales
    if (!permitido.test(placa)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Asegúrate de ingresar solo caracteres permitidos en la placa.',
      });
      return;
    }

    try {
      const nuevoVehiculo = { marca, modelo, anio_fabricacion: anioFabricacion, placa, color, tipo_vehiculo: tipoVehiculo, kilometraje, descripcion };
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/caso2/vehiculo/crear`, nuevoVehiculo);
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Vehículo creado con éxito.',
      });
      limpiarFormulario();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al crear el vehículo. Verifica los datos ingresados.',
      });
    }
  };

  const limpiarFormulario = () => {
    setMarca('');
    setModelo('');
    setAnioFabricacion('');
    setPlaca('');
    setColor('');
    setTipoVehiculo('');
    setKilometraje('');
    setDescripcion('');
  };

  const handleVerVehiculos = () => {
    navigate('/vehiculos'); // Navega a la página de vehículos registrados
  };

  return (
    <div className="contenedor-vehiculos">
      <h2 className="titulo">Registrar Vehículo</h2>
      <form onSubmit={crearVehiculo} className="formulario">
        <div className="campo-group">
          <div className="campo">
            <label className="label">Marca</label>
            <input
              type="text"
              className="input"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
            />
          </div>
          <div className="campo">
            <label className="label">Modelo</label>
            <input
              type="text"
              className="input"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
            />
          </div>
        </div>
        <div className="campo-group">
          <div className="campo">
            <label className="label">Año de Fabricación</label>
            <input
              type="number"
              className="input"
              value={anioFabricacion}
              onChange={(e) => setAnioFabricacion(e.target.value)}
              min="1900" // Puedes ajustar el rango de años según tus necesidades
              max={new Date().getFullYear()} // Asegura que el año no sea mayor que el año actual
            />
          </div>
          <div className="campo">
            <label className="label">Placa</label>
            <input
              type="text"
              className="input"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
            />
          </div>
        </div>
        <div className="campo-group">
          <div className="campo">
            <label className="label">Color</label>
            <input
              type="text"
              className="input"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="campo">
            <label className="label">Tipo de Vehículo</label>
            <input
              type="text"
              className="input"
              value={tipoVehiculo}
              onChange={(e) => setTipoVehiculo(e.target.value)}
            />
          </div>
        </div>
        <div className="campo-group">
          <div className="campo">
            <label className="label">Kilometraje</label>
            <input
              type="text"
              className="input"
              value={kilometraje}
              onChange={(e) => setKilometraje(e.target.value)}
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
        </div>
        <div className="botones">
          <button type="submit" className="boton">Registrar Vehículo</button>
          <button type="button" onClick={handleVerVehiculos} className="boton-secundario">Vehículos Registrados</button>
        </div>
      </form>
    </div>
  );
};

export default Vehiculos;
