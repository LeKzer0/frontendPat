import "./TelaCadastro.css";
import React from "react";
import { useParams } from "react-router-dom";
import EditarGenerico from "./EditarGenerico";
import EditarModelo from "./EditarModelo";

function TelaEditar() {
  let { especifique } = useParams();

  if (especifique === "modelos") {
    return <EditarModelo />;
  } else return <EditarGenerico />;
}
export default TelaEditar;
