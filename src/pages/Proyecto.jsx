import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
import Tarea from "../components/Tarea";
import Colaborador from "../components/Colaborador";
import Alerta from "../components/Alerta";
import { io } from "socket.io-client";

let socket;

const Proyecto = () => {
  const params = useParams();

  const {
    obtenerProyecto,
    proyecto,
    cargando,
    handleModalTarea,
    alerta,
    submitTareasProyecto,
    eliminarTareaProyecto,
    actualizarTareaProyecto,
    cambiarEstadoTarea,
  } = useProyectos();

  const admin = useAdmin();

  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("abrir proyecto", params.id);
  }, []);

  useEffect(() => {
    socket.on("tarea agregada", (tareaNueva) => {
      if (tareaNueva.proyecto === proyecto._id) {
        submitTareasProyecto(tareaNueva);
      }
    });
    socket.on("tarea eliminada", (tareaEliminada) => {
      if (tareaEliminada.proyecto === proyecto._id) {
        eliminarTareaProyecto(tareaEliminada);
      }
    });
    socket.on("tarea actualizada", (tareaActualizada) => {
      if (tareaActualizada.proyecto._id === proyecto._id) {
        actualizarTareaProyecto(tareaActualizada);
      }
    });
    socket.on("nuevo estado", (nuevoEstadoTarea) => {
      if (nuevoEstadoTarea.proyecto._id === proyecto._id) {
        cambiarEstadoTarea(nuevoEstadoTarea);
      }
    });
  });

  const { nombre } = proyecto;
  const { msj } = alerta;

  if (cargando) return "Cargando";
  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-black text-4xl capitalize">{nombre}</h2>
        {admin && (
          <div className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <Link
              to={`/proyectos/editar/${params.id}`}
              className="uppercase font-bold"
            >
              Editar
            </Link>
          </div>
        )}
      </div>
      {admin && (
        <button
          onClick={handleModalTarea}
          type="button"
          className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Nueva Tarea
        </button>
      )}

      <p className="font-bold text-xl mt-10">Tareas del Proyecto</p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/3 lg:w-1/4">
          {msj && <Alerta alerta={alerta} />}
        </div>
      </div>

      <div className="bg-white shadow mt-10 rounded-lg">
        {proyecto.tareas?.length ? (
          proyecto.tareas?.map((tarea) => (
            <Tarea key={tarea._id} tarea={tarea} />
          ))
        ) : (
          <p className="text-center my-5 p-10">
            No hay tareas en este proyecto
          </p>
        )}
      </div>
      {admin && (
        <>
          <div className="flex items-center justify-between mt-10">
            <p className="font-bold text-xl mt-10">Colaboradores</p>
            <Link
              to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
              className="text-gray-400 hover:text-black uppercase font-bold"
            >
              Añadir
            </Link>
          </div>
          <div className="bg-white shadow mt-10 rounded-lg">
            {proyecto.colaboradores?.length ? (
              proyecto.colaboradores?.map((colaborador) => (
                <Colaborador key={colaborador._id} colaborador={colaborador} />
              ))
            ) : (
              <p className="text-center my-5 p-10">
                No hay Colaboradores en este proyecto
              </p>
            )}
          </div>
        </>
      )}

      <ModalFormularioTarea />
      <ModalEliminarTarea />
      <ModalEliminarColaborador />
    </>
  );
};

export default Proyecto;
