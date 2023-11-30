import Form from "react-bootstrap/Form";
import React, { useState, useEffect, useRef } from "react";
import api from "./services/api";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./EditarGenerico.css";
import InsertGenerico from "./services/InsertGenerico";
import { useParams } from "react-router-dom";

function EditarGenerico() {
  let { idgenerico } = useParams();
  const [nome, setNome] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [generico, setGenerico] = useState({});
  const [validated, setValidated] = useState(false);

  //Buscando informações sobre o que sera editado
  useEffect(() => {
    api
      .get("/" + especifique + "/" + idgenerico)
      .then((response) => {
        const gen = response.data;
        setGenerico(gen);
        setNome(gen.nome);
        setAtivo(gen.ativo);
      })
      .catch((erro) => console.log(erro));
  }, []);
  console.log(generico);
  console.log(nome);
  console.log(ativo);

  if (idgenerico === "undefined") {
    idgenerico = null;
  }

  //recebendo que tipo ira cadastrar a partir do userParams do react-router-dom
  let { especifique } = useParams();

  //alguns condicionais para preencher as informações que podem varia dependendo do que sera cadastrado
  let substituir = "";
  let min;
  let max;
  if (especifique === "situacoes") {
    substituir = "Situação";
    min = 4;
    max = 32;
  } else if (especifique === "setores") {
    substituir = "Setor";
    min = 2;
    max = 32;
  } else {
    substituir = "Tipo";
    min = 2;
    max = 32;
  }

  //Submit
  const handleSubmit = (e) => {
    setValidated(true);
    e.preventDefault();
    const tipo = {
      id: idgenerico,
      nome: nome,
      ativo: ativo,
    };

    InsertGenerico(especifique, tipo);
  };

  return (
    <section className="componentesList">
      <div className="barraFiltroEditarGenerico">
        <Form.Label className="labelStatusGenerico">Status</Form.Label>
        <Form.Select
          className="seletorStatusGenerico"
          size="sm"
          id="status"
          value={ativo}
          onChange={(e) => setAtivo(e.target.value)}
        >
          <option value={true}>Ativo</option>
          <option value={false}>Inativo</option>
        </Form.Select>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Label className="labelDescricaoGenerico">
            Descrição de {substituir}
          </Form.Label>
          <Form.Control
            className="campoDescricaoGenerico"
            minLength={min}
            maxLength={max}
            required
            type="text"
            size="sm"
            placeholder={"Nome de " + min + " a " + max + " caracteres"}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            isValid={nome.length >= min && nome.length <= max}
            isInvalid={nome.length < min}
          />
          <Form.Control.Feedback
            className="formCFeedbackDescricaoGen"
            type="invalid"
          >
            Nome de {min} a {max} caracteres
          </Form.Control.Feedback>

          <div className="btnListEditarGenerico">
            <Button
              type="submit"
              variant="light"
              size="sm"
              className="btnConfirmar"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              Confirmar
            </Button>
            <Button
              variant="light"
              size="sm"
              className="btnVoltar"
              href={"/lista" + especifique}
            >
              Voltar
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
}
export default EditarGenerico;
