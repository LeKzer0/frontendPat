import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import api from "./services/api";
import insertUser from "./services/InsertUser";
import "./EditarUsuario.css";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import PathConstants from "./routes/pathConstants";
import { validarCPFCNPJ, mascara } from "./services/validarcoes";
import { InputGroup } from "react-bootstrap";

const CadastroUsuario = () => {
  let { especifique } = useParams();
  const [id, setId] = useState(especifique);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [adm, setAdm] = useState(false);
  const [ativo, setAtivo] = useState(true);
  const [usuario, setUsuario] = useState({});
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    api
      .get("/usuarios/" + especifique + "")
      .then((response) => {
        const usu = response.data;
        setNome(usu.nome);
        setUsername(usu.username);
        setPass(usu.pass);
        setCpf(usu.cpf);
        setAdm(usu.adm);
        setAtivo(usu.ativo);
      })
      .catch((erro) => console.log(erro));
  }, []);

  //se o id recebeu undefined do userParams especifique é porque é adição de um novo user)
  if (id === "undefined") {
    setId(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      id: id,
      nome: nome,
      cpf: cpf,
      username: username,
      pass: pass,
      adm: adm,
      ativo: ativo,
    };
    console.log(user);

    insertUser(user);
  };
  return (
    <div className="quadroLista">
      <>
        <Container className="cadastroDeUsuarios" fluid>
          <Row>
            <Col>
              <div>
                <Form.Label className="linhaStatusUsuario">Status</Form.Label>
                <Form.Select
                  className="seletorStatusUsuario"
                  size="sm"
                  id="status"
                  value={ativo}
                  onChange={(e) => setAtivo(e.target.value)}
                >
                  <option value={true} href="#/action-2">
                    Ativo
                  </option>
                  <option value={false} href="#/action-3">
                    Inativo
                  </option>
                </Form.Select>
              </div>
            </Col>
            <Col>
              <div className="switchAdm">
                <Form.Check
                  type="switch"
                  id="switchAdm"
                  label="Administrador"
                  value={adm}
                  checked={adm}
                  onChange={() => setAdm(!adm)}
                />
              </div>
            </Col>
            <Col></Col>
          </Row>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col>
                <div>
                  <Form.Label>Nome Completo</Form.Label>
                  <Form.Control
                    className="campoCadastroNomeCompleto"
                    minLength={8}
                    maxLength={64}
                    required
                    type="text"
                    size="sm"
                    placeholder="Nome de 8 a 64 caracteres"
                    id="nomeCompleto"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    isValid={nome.length >= 8 && nome.length <= 64}
                    isInvalid={nome.length < 8}
                  />
                  <Form.Control.Feedback
                    className="formCFeedback"
                    type="invalid"
                  >
                    Nome de 8 a 64 caracteres
                  </Form.Control.Feedback>
                </div>
              </Col>
              <Col>
                <div>
                  <Form.Label>CPF</Form.Label>
                  <InputGroup>
                    <Form.Control
                      required
                      minLength={14}
                      maxLength={14}
                      isValid={validarCPFCNPJ(cpf)}
                      isInvalid={!validarCPFCNPJ(cpf)}
                      className="campoCadastroCPF"
                      size="sm"
                      type="text"
                      placeholder="888.888.888-88"
                      value={cpf}
                      onChange={(e) => {
                        setCpf(mascara(e.target.value));
                      }}
                    />
                    <Form.Control.Feedback
                      className="formCFeedback"
                      type="invalid"
                    >
                      CPF deve ser válido
                    </Form.Control.Feedback>
                  </InputGroup>
                </div>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <Form.Label>Nome de Usuário</Form.Label>
                  <Form.Control
                    className="campoNomeDeUsuario"
                    minLength={4}
                    maxLength={20}
                    required
                    size="sm"
                    type="text"
                    placeholder="Usuário de 4 a 20 caracteres"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    isValid={username.length >= 4 && username.length <= 20}
                    isInvalid={username.length < 4}
                  />
                  <Form.Control.Feedback
                    className="formCFeedback"
                    type="invalid"
                  >
                    Usuário de 4 a 20 caracteres
                  </Form.Control.Feedback>
                  <br />
                </div>
              </Col>
              <Col>
                <div>
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    className="campoSenha"
                    minLength={6}
                    maxLength={24}
                    required
                    size="sm"
                    type="password"
                    placeholder="Senha de 6 a 24 caracteres"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    isValid={pass.length >= 6 && pass.length <= 24}
                    isInvalid={pass.length < 6}
                  />
                  <Form.Control.Feedback
                    className="formCFeedback"
                    type="invalid"
                  >
                    Senha de 6 a 24 caracteres
                  </Form.Control.Feedback>
                </div>
              </Col>
              <Col></Col>
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
                  href={PathConstants.LISTAUSUARIO}
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
};

export default CadastroUsuario;
