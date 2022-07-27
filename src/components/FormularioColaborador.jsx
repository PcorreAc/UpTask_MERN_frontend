import React, { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioColaborador = () => {
  const [email, setEmail] = useState("");

  const { mostrarAlerta, alerta, submitColaborador } = useProyectos();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === "") {
      mostrarAlerta({
        msj: "El Email es obligatorio",
        error: true,
      });
      return;
    }
    submitColaborador(email);
  };

  const { msj } = alerta;

  return (
    <form
      className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msj && <Alerta alerta={alerta} />}
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="email"
        >
          Email Colaborador
        </label>
        <input
          id="email"
          type="email"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Email del Usuario"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <input
        type="submit"
        value="Buscar Colaborador"
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors text-sm"
      />
    </form>
  );
};

export default FormularioColaborador;
