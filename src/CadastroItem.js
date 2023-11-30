import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import api from "./services/api";
import InsertItem from "./services/InsertItem";
import "./CadastroItem.css";
import moment from "moment/moment";
import "moment/locale/pt-br";
import secureLocalStorage from "react-secure-storage";

function CadastroItem() {
  const [patrimonio, setPatrimonio] = useState("");
  const [serial, setSerial] = useState("");
  const [tipo_id, setTipo_id] = useState("Selecione o Tipo");
  const [setor_id, setSetor_id] = useState("Selecione o Setor");
  const [situacao_id, setSituacao_id] = useState("Selecione a Situação");
  const [fabricante_id, setFabricante_id] = useState("Selecione o Fabricante");
  const [modelo_id, setModelo_id] = useState("Selecione o Modelo");
  const [local, setLocal] = useState("");
  const [observacao, setObserv] = useState("");
  const [listaFab, setListaFab] = useState([]);
  const [listatipo, setListaTipo] = useState([]);
  const [listaSituacao, setListaSituacao] = useState([]);
  const [listaSetor, setListaSetor] = useState([]);
  const [listaModelo, setListaModelo] = useState([]);
  const [imageuri, setImageuri] = useState();
  const [validated, setValidated] = useState(false);

  /*Get dados para os dropdowns */

  useEffect(() => {
    api
      .get("/fabricantes")
      .then((response) => {
        console.log(response.data);
        setListaFab(response.data);
      })
      .catch((erro) => console.log(erro));
  }, []);

  useEffect(() => {
    api
      .get("/tipos")
      .then((response) => {
        console.log(response.data);
        setListaTipo(response.data);
      })
      .catch((erro) => console.log(erro));
  }, []);

  useEffect(() => {
    api
      .get("/setores")
      .then((response) => {
        console.log(response.data);
        setListaSetor(response.data);
      })
      .catch((erro) => console.log(erro));
  }, []);

  useEffect(() => {
    api
      .get("/situacoes")
      .then((response) => {
        console.log(response.data);
        setListaSituacao(response.data);
      })
      .catch((erro) => console.log(erro));
  }, []);

  const CarregaModelos = (fabricante_id, tipo_id) =>
    api
      .get("/modeloitem/" + fabricante_id + "&" + tipo_id)
      .then((response) => {
        console.log(response.data);
        setListaModelo(response.data);
      })
      .catch((erro) => console.log(erro));

  //ações botão confirmar

  const handleSubmit = (e) => {
    const situacao = { id: situacao_id };
    const setor = { id: setor_id };
    const usuario = { id: secureLocalStorage.getItem("iduser") };
    const modelo = { id: modelo_id };
    const dtAlteracao = moment().locale("pt-br").format("lll");

    const historico = {
      situacao,
      setor,
      usuario,
      local,
      observacao,
      dtAlteracao,
    };

    const item = {
      id: null,
      patrimonio,
      serial,
      modelo,
      historicos: [historico],
    };

    InsertItem(item);
    e.preventDefault();
  };

  return (
    <>
      <section className="componentesList">
        <div className="barraFiltroCadastroItem">
          <Container fluid>
            <Row>
              <Col>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <div className="linhaNumeroPat">
                        <text className="identificadorPat">Patrimônio:</text>
                        <Form.Control
                          className="campoNumeroPat"
                          minLength={2}
                          maxLength={24}
                          size="sm"
                          type="text"
                          placeholder="Número do Patrimônio"
                          value={patrimonio}
                          onChange={(e) => setPatrimonio(e.target.value)}
                          isValid={
                            patrimonio.length >= 2 && patrimonio.length <= 24
                          }
                          isInvalid={patrimonio.length < 2}
                        />
                        <Form.Control.Feedback
                          className="formCFeedback"
                          type="invalid"
                        ></Form.Control.Feedback>
                      </div>
                    </Col>

                    <Col>
                      <div className="linhaNumeroSerie">
                        <text className="identificadorSerie">Série:</text>
                        <Form.Control
                          className="campoNumeroSerie"
                          size="sm"
                          type="text"
                          placeholder="Número de Série"
                          value={serial}
                          onChange={(e) => setSerial(e.target.value)}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="linhaFabricante">
                        <text className="identificadorFabricante">
                          Fabricante:
                        </text>
                        <Form.Select
                          aria-label="Selecione o Fabricante"
                          size="sm"
                          value={fabricante_id}
                          isInvalid={fabricante_id === "Selecione o Fabricante"}
                          isValid={fabricante_id !== "Selecione o Fabricante"}
                          onChange={(e) => {
                            setFabricante_id(e.target.value);
                            CarregaModelos(e.target.value, tipo_id);
                          }}
                        >
                          <Form.Control.Feedback
                            className="formCFeedback"
                            type="invalid"
                          ></Form.Control.Feedback>
                          <option>Selecione o Fabricante</option>
                          {listaFab.map((fab) => {
                            if (fab.ativo === true) {
                              return <option value={fab.id}>{fab.nome}</option>;
                            }
                          })}
                        </Form.Select>
                      </div>
                    </Col>
                    <Col>
                      <div className="linhaSetor">
                        <text className="identificadorSetor">Setor:</text>
                        <Form.Select
                          className="selectSetor"
                          aria-label="Selecione o Setor"
                          size="sm"
                          value={setor_id}
                          isInvalid={setor_id === "Selecione o Setor"}
                          isValid={setor_id !== "Selecione o Setor"}
                          onChange={(e) => setSetor_id(e.target.value)}
                        >
                          <Form.Control.Feedback
                            className="formCFeedback"
                            type="invalid"
                          ></Form.Control.Feedback>
                          <option>Selecione o Setor</option>
                          {listaSetor.map((set) => {
                            if (set.ativo === true) {
                              return <option value={set.id}>{set.nome}</option>;
                            }
                          })}
                        </Form.Select>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="linhaTipo">
                        <text className="identificadorTipo">Tipo:</text>
                        <Form.Select
                          className="selectTipo"
                          size="sm"
                          value={tipo_id}
                          isInvalid={tipo_id === "Selecione o Tipo"}
                          isValid={tipo_id !== "Selecione o Tipo"}
                          onChange={(e) => {
                            setTipo_id(e.target.value);
                            CarregaModelos(fabricante_id, e.target.value);
                          }}
                        >
                          <Form.Control.Feedback
                            className="formCFeedback"
                            type="invalid"
                          ></Form.Control.Feedback>
                          <option>Selecione o Tipo</option>
                          {listatipo.map((tip) => {
                            if (tip.ativo === true) {
                              return <option value={tip.id}>{tip.nome}</option>;
                            }
                          })}
                        </Form.Select>
                      </div>
                    </Col>
                    <Col>
                      <div className="linhaSituacao">
                        <text className="identificadorSituacao">Situação:</text>
                        <Form.Select
                          className="selectSituacao"
                          size="sm"
                          value={situacao_id}
                          isInvalid={situacao_id === "Selecione a Situação"}
                          isValid={situacao_id !== "Selecione a Situação"}
                          onChange={(e) => setSituacao_id(e.target.value)}
                        >
                          <Form.Control.Feedback
                            className="formCFeedback"
                            type="invalid"
                          ></Form.Control.Feedback>
                          <option>Selecione a Situação</option>
                          {listaSituacao.map((sit) => {
                            if (sit.ativo === true) {
                              return <option value={sit.id}>{sit.nome}</option>;
                            }
                          })}
                        </Form.Select>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="linhaModelo">
                        <text className="identificadorModelo">Modelo:</text>
                        <Form.Select
                          className="selectModelo"
                          size="sm"
                          value={modelo_id}
                          isInvalid={modelo_id === "Selecione o Modelo"}
                          isValid={modelo_id !== "Selecione o Modelo"}
                          onChange={(e) => setModelo_id(e.target.value)}
                        >
                          <Form.Control.Feedback
                            className="formCFeedback"
                            type="invalid"
                          ></Form.Control.Feedback>
                          <option>Selecione o Modelo</option>
                          {listaModelo.map((mod) => {
                            if (mod.ativo === true) {
                              return (
                                <option
                                  value={mod.id}
                                  onClick={(e) => {
                                    setImageuri(mod.imageuri);
                                    console.log(mod.imageuri);
                                  }}
                                >
                                  {mod.nome}
                                </option>
                              );
                            }
                          })}
                        </Form.Select>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col>
                <Col>
                  <Container className="modeloFiguraQuadro">
                    <Image src={imageuri} width={200} fluid />
                  </Container>
                </Col>
              </Col>
            </Row>
            <Row>
              <Col>
                <Container className="containerLocalItemCad">
                  <Form>
                    <Form.Group className="textAreaLocaItem">
                      <Form.Label>Descrição do Local do Item</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={local}
                        onChange={(e) => setLocal(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </Container>
              </Col>
              <Col>
                <Container className="containerObservacaoItemCad">
                  <Form>
                    <Form.Group className="textAreaObservacaoItem">
                      <Form.Label>Observações sobre o Item</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={observacao}
                        onChange={(e) => setObserv(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="btnItens">
                  <Button
                    type="submit"
                    variant="light"
                    size="sm"
                    className="btnConfirmar"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    Confirmar
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    className="btnVoltar"
                    href={"/listaitens"}
                  >
                    Voltar
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
}
export default CadastroItem;
