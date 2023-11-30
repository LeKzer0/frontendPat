import "./TelaCadastro.css";
import React from "react";
import CadastroUsuario from "./CadastroUsuario";
import { useParams } from "react-router-dom";

function TelaCadastroUsuario() {
  let { especifique } = useParams();
  console.log(especifique);

  return (
    <section className="componentesList">
      <div className="quadroLista">
        <CadastroUsuario />
      </div>
      <div className="barraBtnSalvar"></div>
    </section>
  );
}
export default TelaCadastroUsuario;
