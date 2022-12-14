import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioProyecto = () => {
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [cliente, setCliente] = useState("");

  const params = useParams();

  const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

  useEffect(() => {
    if (params.id) {
      setId(proyecto._id);
      setNombre(proyecto.nombre);
      setDescripcion(proyecto.descripcion);
      setFechaEntrega(proyecto.fechaEntrega?.split("T")[0]);
      setCliente(proyecto.cliente);
    }
  }, [params]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
      mostrarAlerta({
        msj: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    // Pasar los datos hacia el Provider
    submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente });
    setId(null);
    setNombre("");
    setDescripcion("");
    setFechaEntrega("");
    setCliente("");
  };

  const { msj } = alerta;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msj && <Alerta alerta={alerta} />}
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="nombre"
        >
          Nombre Proyecto
        </label>
        <input
          id="nombre"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del Proyecto"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
        />
      </div>
      <div className="mb-3">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="descripcion"
        >
          Descripci??n
        </label>
        <textarea
          id="descripcion"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripci??n del Proyecto"
          value={descripcion}
          onChange={(event) => setDescripcion(event.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="fecha-entrega"
        >
          Fecha Entrega
        </label>
        <input
          id="fecha-entrega"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={fechaEntrega}
          onChange={(event) => setFechaEntrega(event.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="nombre-cliente"
        >
          Nombre Cliente
        </label>
        <input
          id="nombre-cliente"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del Cliente"
          value={cliente}
          onChange={(event) => setCliente(event.target.value)}
        />
      </div>
      <input
        type="submit"
        value={id ? "Actualizar Proyecto" : "Crear Proyecto"}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors text-sm"
      />
    </form>
  );
};

export default FormularioProyecto;
