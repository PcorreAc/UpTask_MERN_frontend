import React from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";
import { useEffect } from "react";
import { useState } from "react";

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);

        setAlerta({
          msj: data.msj,
          error: false,
        });

        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          msj: error.response.data.msj,
          error: true,
        });
      }
    };
    confirmarCuenta();
  }, []);

  const { msj } = alerta;

  return (
    <>
      <h2 className="text-sky-600 font-black text-5xl text-center capitalize">
        Confirmar Cuenta
      </h2>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msj && <Alerta alerta={alerta} />}{" "}
        {cuentaConfirmada && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            Inicia Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
