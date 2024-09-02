import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/Clientes.css'; // Asegúrate de que el archivo CSS esté renombrado

const ClientesRegistrados = () => {
  const [clientes, setClientes] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    obtenerClientes();
  }, []);

  const obtenerClientes = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/caso2/cliente/ver`);
      setClientes(data);
    } catch (error) {
      setMensaje('Error al obtener los clientes');
    }
  };

  const eliminarCliente = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás encontrar este cliente después de eliminarlo.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/caso2/cliente/eliminar/${id}`);
        Swal.fire('Eliminado!', 'Cliente eliminado con éxito.', 'success');
        obtenerClientes(); // Actualiza la lista de clientes después de eliminar
      } catch (error) {
        Swal.fire('Error!', 'Error al eliminar al cliente.', 'error');
      }
    }
  };

  const editarCliente = (cliente) => {
    navigate(`/editar-cliente/${cliente._id}`, { state: { cliente } });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="contenedor-clientes">
      <button className="btn-regresar" onClick={handleBack}>
        <FiArrowLeft className="icono-flecha" />
      </button>
      <h2 className="titulo">Clientes Registrados</h2>
      {mensaje && <p className="mensaje">{mensaje}</p>}
      <table className="tabla">
        <thead>
          <tr>
            <th className="tabla-encabezado">Nombre</th>
            <th className="tabla-encabezado">Apellido</th>
            <th className="tabla-encabezado">Cédula</th>
            <th className="tabla-encabezado">Ciudad</th>
            <th className="tabla-encabezado">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente._id}>
              <td className="tabla-celda">{cliente.nombre}</td>
              <td className="tabla-celda">{cliente.apellido}</td>
              <td className="tabla-celda">{cliente.cedula}</td>
              <td className="tabla-celda">{cliente.ciudad}</td>
              <td className="tabla-celda">
                <button onClick={() => editarCliente(cliente)} className="boton-editar">
                  Editar
                </button>
                <button onClick={() => eliminarCliente(cliente._id)} className="boton-eliminar">
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

export default ClientesRegistrados;
