import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import api from "./services/api";
import InsertFabricante from "./services/InsertFabricante";
import "./EditarFabricante.css";
import { useParams } from "react-router-dom";
import PathConstants from "./routes/pathConstants";
import { InputGroup } from "react-bootstrap";
import { validarCPFCNPJ, mascara } from "./services/validarcoes";

function EditarFabricante() {
  let { especifique } = useParams();
  const [id, setId] = useState(especifique);
  const [nome, setNome] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [fabricante, setFabricante] = useState({});
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    api
      .get("/fabricantes/" + especifique + "")
      .then((response) => {
        const fab = response.data;
        setNome(fab.nome);
        setCNPJ(fab.cnpj);
        setAtivo(fab.ativo);
      })
      .catch((erro) => console.log(erro));
  }, []);

  //se o id recebeu undefined do userParams especifique é porque é adição de um novo fabricante)
  if (id === "undefined") {
    setId(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const fabricante = {
      id: id,
      nome: nome,
      cnpj: cnpj,
      ativo: ativo,
    };
    console.log(fabricante);

    InsertFabricante(fabricante);
  };

  console.log(nome);

  return (
    <div className="quadroLista">
      <>
        <Container fluid>
          <Row>
            <Col>
              <Form.Label className="identificadorStatus">Status</Form.Label>
              <Form.Select
                className="seletorStatusFab"
                size="sm"
                id="status"
                value={ativo}
                onChange={(e) => setAtivo(e.target.value)}
              >
                <option value={true}>Ativo</option>
                <option value={false}>Inativo</option>
              </Form.Select>
            </Col>
          </Row>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <div className="areaNomeCompleto">
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control
                  className="campoCadastroNomeFabricante"
                  minLength={2}
                  maxLength={32}
                  required
                  type="text"
                  size="sm"
                  placeholder="Nome de 2 a 32 caracteres"
                  id="nomeCompleto"
                  name="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  isValid={nome.length >= 2 && nome.length <= 32}
                  isInvalid={nome.length < 2}
                />
                <Form.Control.Feedback className="formCFeedback" type="invalid">
                  Nome de 2 a 32 caracteres
                </Form.Control.Feedback>
              </div>
            </Row>
            <Row>
              <div>
                <Form.Label>CNPJ</Form.Label>
                <InputGroup>
                  <Form.Control
                    required
                    minlength={18}
                    maxlength={18}
                    isValid={validarCPFCNPJ(cnpj)}
                    isInvalid={!validarCPFCNPJ(cnpj)}
                    className="campoCadastroCNPJ"
                    size="sm"
                    type="text"
                    placeholder="88.888.888/8888-88"
                    value={cnpj}
                    onChange={(e) => {
                      setCNPJ(mascara(e.target.value));
                      console.log(mascara(cnpj));
                    }}
                  />
                  <Form.Control.Feedback
                    className="formCFeedback"
                    type="invalid"
                  >
                    CNPJ deve ser válido
                  </Form.Control.Feedback>
                </InputGroup>
              </div>
            </Row>
            <Row>
              <div className="btnList">
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
                  href={PathConstants.LISTAFABRICANTES}
                >
                  Voltar
                </Button>
              </div>
            </Row>
          </Form>
        </Container>
      </>
    </div>
  );
}
export default EditarFabricante;
