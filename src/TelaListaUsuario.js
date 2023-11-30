import "./TelaListaUsuario.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { React, useState } from "react";
import TableUser from "./TableUser";
import { useParams } from "react-router-dom";

function TelaListaUsuario() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [pesquisa, setPesquisa] = useState();
  //recebendo que tipo ira listar a partir do userParams do react-router-dom
  let { especifique } = useParams();
  console.log(especifique);

  function handlerPesquisar() {
    if (nome !== "" || cpf !== "") {
      setPesquisa("/usuariofind/" + nome + "&" + cpf);
    } else {
      setPesquisa("/usuarios");
    }
  }

  return (
    <section className="componentesList">
      <div className="barraFiltro">
        <Form.Label className="nomeUsuarioLabel">Nome do Usuário</Form.Label>
        <Form.Control
          className="campoNomeUsuarioFiltro"
          size="sm"
          type="text"
          placeholder="Nome do usuário"
          onChange={(e) => setNome(e.target.value)}
          value={nome}
        />

        <Form.Label className="cpfLabel">CPF</Form.Label>
        <Form.Control
          className="campoCPFUsuarioFiltro"
          size="sm"
          type="text"
          placeholder="CPF"
          onChange={(e) => setCpf(e.target.value)}
          value={cpf}
        />

        <Button
          variant="light"
          size="sm"
          className="btnPesquisarUsuario"
          onClick={handlerPesquisar}
        >
          Pesquisar
        </Button>
      </div>
      <div className="quadroListaUser">
        <TableUser pes={pesquisa} />
      </div>
    </section>
  );
}

export default TelaListaUsuario;
