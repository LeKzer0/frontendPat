import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import api from "./services/api";
import "./RelatorioHist.css";
import "moment/locale/pt-br";
import TableRelatorio from "./TableRelatorio";
import secureLocalStorage from "react-secure-storage";

function RelatorioHist() {
  const [patrimonio, setPatrimonio] = useState("");
  const [serial, setSerial] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [tipo_id, setTipo_id] = useState(0);
  const [setor_id, setSetor_id] = useState(0);
  const [situacao_id, setSituacao_id] = useState(0);
  const [fabricante_id, setFabricante_id] = useState(0);
  const [modelo_id, setModelo_id] = useState(0);
  const [local, setLocal] = useState("");
  const [observacao, setObserv] = useState("");
  const [listaFab, setListaFab] = useState([]);
  const [listatipo, setListaTipo] = useState([]);
  const [listaSituacao, setListaSituacao] = useState([]);
  const [listaSetor, setListaSetor] = useState([]);
  const [listaModelo, setListaModelo] = useState([]);
  const [dadosTab, setDadosTab] = useState([]);
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

  //ações botão Emitir

  const handleEmitir = (e) => {
    api
      .get(
        "/itens/relatorio/" +
          patrimonio +
          "&" +
          fabricante_id +
          "&" +
          tipo_id +
          "&" +
          modelo_id +
          "&" +
          setor_id +
          "&" +
          situacao_id
      )
      .then((response) => {
        setDadosTab(response.data);
      })
      .catch((erro) => console.log(erro));
    console.log(dadosTab);
  };

  return (
    <>
      <section className="componentesList">
        <div className="barraFiltroCadastroItem">
          <Container fluid>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <div className="linhaNumeroPat">
                      <text className="identificadorPat">Patrimônio:</text>
                      <Form.Control
                        className="campoNumeroPat"
                        size="sm"
                        type="text"
                        placeholder="Número do Patrimônio"
                        value={patrimonio}
                        onChange={(e) => setPatrimonio(e.target.value)}
                      />
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
                        onChange={(e) => {
                          setTipo_id(e.target.value);
                          CarregaModelos(fabricante_id, e.target.value);
                          console.log(e.target.value);
                        }}
                      >
                        <option value={0}>Selecione o Tipo</option>
                        {listatipo.map((tip) => {
                          return <option value={tip.id}>{tip.nome}</option>;
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
                        onChange={(e) => setSetor_id(e.target.value)}
                      >
                        <option value={0}>Selecione o Setor</option>
                        {listaSetor.map((set) => {
                          return <option value={set.id}>{set.nome}</option>;
                        })}
                      </Form.Select>
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
                        onChange={(e) => {
                          setFabricante_id(e.target.value);
                          CarregaModelos(e.target.value, tipo_id);
                        }}
                      >
                        <option value={0}>Selecione o Fabricante</option>
                        {listaFab.map((fab) => {
                          return <option value={fab.id}>{fab.nome}</option>;
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
                        onChange={(e) => setSituacao_id(e.target.value)}
                      >
                        <option value={0}>Selecione a Situação</option>
                        {listaSituacao.map((sit) => {
                          return <option value={sit.id}>{sit.nome}</option>;
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
                        defaultValue={0}
                        value={modelo_id}
                        onChange={(e) => {
                          setModelo_id(e.target.value);
                          setFabricante_id(0);
                          setTipo_id(0);
                        }}
                      >
                        <Form.Control.Feedback
                          className="formCFeedback"
                          type="invalid"
                        ></Form.Control.Feedback>
                        <option value={0}>Selecione o Modelo</option>
                        {listaModelo.map((mod) => {
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
                        })}
                      </Form.Select>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="btnItens">
                      <Button
                        variant="light"
                        size="sm"
                        className="btnPesquisarGenerico"
                        onClick={handleEmitir}
                      >
                        Emitir
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Col>
                  <Container className="modeloFiguraQuadro">
                    <Image src={imageuri} width={200} />
                  </Container>
                </Col>
              </Col>
            </Row>
            <Row>
              <Col>
                <Container fluid className="containerTabelaRelatorio">
                  <Row>
                    <Col>
                      <TableRelatorio dadosTab={dadosTab} />
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
export default RelatorioHist;
