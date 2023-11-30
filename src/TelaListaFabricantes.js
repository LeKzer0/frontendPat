import "./TelaListaFabricantes.css";
import { React, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import TableFabricante from "./TableFabricante";

function TelaListaFabricantes() {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [pesquisa, setPesquisa] = useState();

  function handlerPesquisar() {
    if (nome !== "" || cnpj !== "") {
      setPesquisa("/fabricantefind/" + nome + "&" + cnpj);
    } else {
      setPesquisa("/fabricantes");
    }
  }

  return (
    <section className="componentesList">
      <div className="barraFiltro">
        <Form.Label className="nomeFabricanteLabel">
          Nome do Fabrincante
        </Form.Label>
        <Form.Control
          className="campoNomeFabricanteFiltro"
          size="sm"
          type="text"
          placeholder="Nome do fabricante"
          onChange={(e) => setNome(e.target.value)}
          value={nome}
        />

        <Form.Label className="cnpjLabel">CNPJ</Form.Label>
        <Form.Control
          className="campoCNPJFabricanteFiltro"
          size="sm"
          type="text"
          placeholder="CNPJ"
          onChange={(e) => setCnpj(e.target.value)}
          value={cnpj}
        />

        <Button
          className="btnPesquisarFabricante"
          variant="light"
          size="sm"
          onClick={handlerPesquisar}
        >
          Pesquisar
        </Button>
      </div>
      <div className="quadroLista">
        <TableFabricante pes={pesquisa} />
      </div>
    </section>
  );
}

export default TelaListaFabricantes;
