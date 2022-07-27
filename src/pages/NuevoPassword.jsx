import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";
import { useEffect } from "react";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenvalido, setTokenvalido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`);
        setTokenvalido(true);
      } catch (error) {
        setAlerta({
          msj: error.response.data.msj,
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.length < 6) {
      setAlerta({
        msj: "El password debe ser mínimo de 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/usuarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });

      setAlerta({
        msj: data.msj,
        error: false,
      });
      setPasswordModificado(true);
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
        Reestablecer Password
      </h2>
      {msj && <Alerta alerta={alerta} />}
      {tokenvalido && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-lg font-bold"
              htmlFor="password"
            >
              Nuevo Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Escribe tu Nuevo Password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Reestablecer"
            className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}
      {passwordModificado && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Inicia Sesión
        </Link>
      )}
    </>
  );
};

export default NuevoPassword;
