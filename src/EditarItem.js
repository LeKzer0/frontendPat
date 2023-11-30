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
import { useParams } from "react-router-dom";
import TableHistoricoDados from "./TableHistoricoDados";
import secureLocalStorage from "react-secure-storage";

function EditarItem() {
  //recebendo que tipo ira cadastrar a partir do userParams do react-router-dom
  let { especifique } = useParams();

  const [patrimonio, setPatrimonio] = useState("");
  const [serial, setSerial] = useState("");
  const [tipo_id, setTipo_id] = useState(0);
  const [setor_id, setSetor_id] = useState("Selecione o Setor");
  const [situacao_id, setSituacao_id] = useState("Selecione a Situação");
  const [fabricante_id, setFabricante_id] = useState(0);
  const [modelo_id, setModelo_id] = useState(0);
  const [itemEdit, setItemEdit] = useState([]);
  const [local, setLocal] = useState("");
  const [observacao, setObserv] = useState("");
  const [listaFab, setListaFab] = useState([]);
  const [listatipo, setListaTipo] = useState([]);
  const [listaSituacao, setListaSituacao] = useState([]);
  const [listaSetor, setListaSetor] = useState([]);
  const [listaModelo, setListaModelo] = useState([]);
  const [dadosTab, setDadosTab] = useState([]);
  const [validated, setValidated] = useState(false);

  /*Get dados para os dropdowns e item a ser editado*/

  useEffect(() => {
    api
      .get("/itens/" + especifique + "")
      .then((response) => {
        setItemEdit(response.data);
      })
      .catch((erro) => console.log(erro));
    console.log(itemEdit);
  }, []);

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

  useEffect(() => {
    api
      .get("/modelos")
      .then((response) => {
        console.log(response.data);
        setListaModelo(response.data);
      })
      .catch((erro) => console.log(erro));
  }, []);

  useEffect(() => {
    api
      .get("/historicos/item/" + especifique + "")
      .then((response) => {
        setDadosTab(response.data);
      })
      .catch((erro) => console.log(erro));
  }, []);

  //Ações botão confirmar

  const handleSubmit = (e) => {
    const situacao = { id: situacao_id };
    const setor = { id: setor_id };
    const usuario = { id: secureLocalStorage.getItem("iduser") };
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
      id: especifique,
      patrimonio: itemEdit.patrimonio,
      serial: itemEdit.serial,
      modelo: itemEdit?.modelo,
      historicos: [historico],
    };

    InsertItem(item);
    e.preventDefault();
  };

  const handleConsultar = () => {
    api
      .get("/historicos/item/" + especifique + "")
      .then((response) => {
        setDadosTab(response.data);
      })
      .catch((erro) => console.log(erro));
  };

  return (
    <>
      <section className="componentesList">
        <div className="barraFiltroEditarItem">
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
                          size="sm"
                          type="text"
                          placeholder={itemEdit.patrimonio}
                          readOnly
                          value={patrimonio}
                          onChange={(e) => setPatrimonio(e.target.value)}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="linhaNumeroSerie">
                        <text className="identificadorSerie">Série:</text>
                        <Form.Control
                          className="campoNumeroSerie"
                          size="sm"
                          type="text"
                          placeholder={itemEdit.serial}
                          readOnly
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
                          onChange={(e) => setFabricante_id(e.target.value)}
                        >
                          <option value={itemEdit?.modelo?.fabricante?.id}>
                            {itemEdit?.modelo?.fabricante?.nome}
                          </option>
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
                          onChange={(e) => setTipo_id(e.target.value)}
                        >
                          <option value={itemEdit?.modelo?.tipo?.id}>
                            {itemEdit?.modelo?.tipo?.nome}
                          </option>
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
                          onChange={(e) => setModelo_id(e.target.value)}
                        >
                          <option value={itemEdit?.modelo?.id}>
                            {itemEdit?.modelo?.nome}
                          </option>
                        </Form.Select>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Col>

              <Col>
                <Col>
                  <Container className="modeloFiguraQuadro">
                    <Image src={itemEdit?.modelo?.imageuri} width={200} fluid />
                  </Container>
                </Col>
              </Col>
            </Row>
            <Row>
              <Col>
                <Container className="containerLocalItem">
                  <Form>
                    <Form.Group className="textAreaLocaItem">
                      <Form.Label>Descrição do Local do Item</Form.Label>
                      <Form.Control
                        maxLength={254}
                        as="textarea"
                        rows={2}
                        value={local}
                        onChange={(e) => setLocal(e.target.value)}
                      />
                      <Form.Control.Feedback
                        className="formCFeedback"
                        type="invalid"
                      ></Form.Control.Feedback>
                    </Form.Group>
                  </Form>
                </Container>
              </Col>
              <Col>
                <Container className="containerObservacaoItem">
                  <Form>
                    <Form.Group className="textAreaObservacaoItem">
                      <Form.Label>Observações sobre o Item</Form.Label>
                      <Form.Control
                        maxLength={254}
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
                      setTimeout(handleConsultar, 2000);
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
            <Row>
              <Col>
                <Container fluid className="containerTabelaHistorico">
                  <Row>
                    <Col>
                      <Button
                        className="btnConsultarHistorico"
                        variant="light"
                        size="sm"
                        onClick={handleConsultar}
                      >
                        Consultar
                      </Button>

                      <TableHistoricoDados dadosTab={dadosTab} />
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
}
export default EditarItem;
