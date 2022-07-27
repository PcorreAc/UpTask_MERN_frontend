import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({
        msj: "Todos lo campos son obligatorios",
        error: true,
      });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        msj: "Los password no son iguales",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msj: "El password es muy corto, agrega mínimo 6 caracteres",
        error: true,
      });
      return;
    }
    setAlerta({});

    // Crear el usuario en la API
    try {
      const { data } = await clienteAxios.post(`/usuarios`, {
        nombre,
        email,
        password,
      });
      setAlerta({
        msj: data.msj,
        error: false,
      });
      setNombre("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
    } catch (error) {
      setAlerta({
        msj: error.response.data.msj,
        error: true,
      });
      setEmail("");
      setNombre("");
    }
  };

  const { msj } = alerta;

  return (
    <>
      <h2 className="text-sky-600 font-black text-5xl text-center capitalize">
        Crear Cuenta
      </h2>
      {msj && <Alerta alerta={alerta} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-lg font-bold"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Tu Nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />
        </div>
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
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-lg font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-lg font-bold"
            htmlFor="password2"
          >
            Repetir Password
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Repetir tu Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repetirPassword}
            onChange={(event) => setRepetirPassword(event.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Crear Cuenta"
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
          to="/olvide-password"
        >
          Olvidé mi Password
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
