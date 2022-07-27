import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msj: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    try {
      const { data } = await clienteAxios.post("/usuarios/login", {
        email,
        password,
      });

      setAlerta({});
      localStorage.setItem("token", data.token);
      setAuth(data);
      navigate("/proyectos");
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
        Iniciar sesión
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
        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/registrar"
        >
          ¿No tienes una cuenta? Regístrate
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

export default Login;
