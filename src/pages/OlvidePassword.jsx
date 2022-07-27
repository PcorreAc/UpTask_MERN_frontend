import React, { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === "" || email.length < 6) {
      setAlerta({
        msj: "El Email es obligatorio",
        error: true,
      });
      return;
    }
    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {
        email,
      });
      setAlerta({
        msj: data.msj,
        error: false,
      });
    } catch (error) {
      setAlerta({
        msj: error.response.data.msj,
        error: true,
      });
    }
  };

  const { msj } = alerta;
  return (
    <>
      <h2 className="text-sky-600 font-black text-5xl text-center capitalize">
        Recuperar Acceso
      </h2>
      {msj && <Alerta alerta={alerta} />}
      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-lg font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Enviar código "
          className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/registrar"
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
      </nav>
    </>
  );
};

export default OlvidePassword;
