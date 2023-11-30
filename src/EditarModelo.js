import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import InsertModelo from "./services/InsertModelo";
import Button from "react-bootstrap/Button";
import "./CadastroModelo.css";
import api from "./services/api";
import { FaTrashCan } from "react-icons/fa6";
import PathConstants from "./routes/pathConstants";
import { useParams } from "react-router-dom";

const EditarModelo = () => {
  let { idgenerico } = useParams();
  const [nome, setNome] = useState("");
  const [listaFab, setListaFab] = useState([]);
  const [listatipo, setListaTipo] = useState([]);
  const [listaMod, setListaMod] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [tipo_id, setTipo_id] = useState();
  const [fabricante_id, setFabricante_id] = useState();
  const [imageuri, setImageuri] = useState();
  const [ativo, setAtivo] = useState();
  // Quando a imagem mudar essa função será usada
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setImageuri("/" + e.target.files[0].name + "");
    }
  };

  // Função acionada ao clicar no botão remover imagem
  const removeSelectedImage = () => {
    setSelectedImage();
    setImageuri();
  };

  //Salvando imagem
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", selectedImage);
    if (formData !== "undefined") {
      enviarArquivoApi(formData)
        .then((resposta) => console.log("arquivo enviado: " + resposta))
        .catch((erro) => console.log("erro: " + erro));
    }
  };

  const headers = { "Content-Type": "multipart/form-data" };
  const enviarArquivoApi = (arquivo) =>
    api.post("/files", arquivo, { headers: headers });

  useEffect(() => {
    api
      .get("/modelos/" + idgenerico)
      .then((response) => {
        const modelos = response.data;
        setListaMod(modelos);
        setNome(modelos.nome);
        setFabricante_id(modelos.fabricante.id);
        setTipo_id(modelos.tipo.id);
        setImageuri(modelos.imageuri);
        setAtivo(modelos.ativo);
      })
      .catch((erro) => console.log(erro));
  }, []);
  console.log(nome);
  console.log(listaMod);
  console.log(fabricante_id);
  console.log(tipo_id);
  console.log(imageuri);
  console.log(ativo);

  useEffect(() => {
    api
      .get("/fabricantes")
      .then((response) => {
        setListaFab(response.data);
      })
      .catch((erro) => console.log(erro));
  }, []);

  useEffect(() => {
    api
      .get("/tipos")
      .then((response) => {
        setListaTipo(response.data);
      })
      .catch((erro) => console.log(erro));
  }, []);

  const handleConfirmar = (e) => {
    e.preventDefault();
    const modelo = {
      id: idgenerico,
      nome: nome,
      imageuri: imageuri,
      fabricante: { id: fabricante_id },
      tipo: { id: tipo_id },
      ativo: ativo,
    };
    console.log(modelo);
    InsertModelo(modelo);
  };

  return (
    <section className="componentesList">
      <div className="barraFiltroEditarModelo">
        <div className="menusModeloEditar">
          <Row>
            <Col>
              <Row>
                <Form.Label className="nomeModeloEditarLabel">
                  Nome Modelo
                </Form.Label>
                <Form.Control
                  className="campoEditarNomeModelo"
                  required
                  minLength={3}
                  maxLength={32}
                  type="text"
                  size="sm"
                  placeholder="Nome de 3 a 32 caracteres"
                  id="nomeModelo"
                  name="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  isValid={nome.length >= 3 && nome.length <= 32}
                  isInvalid={nome.length < 3}
                />
                <Form.Control.Feedback className="formCFeedback" type="invalid">
                  Nome de 3 a 32 caracteres
                </Form.Control.Feedback>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="fabLabelEditaModelo">
                    Fabricante
                  </Form.Label>
                  <Form.Select
                    className="dropDownFabricanteEditaModelo"
                    aria-label="Selecione o Fabricante"
                    size="sm"
                    value={fabricante_id}
                    isInvalid={
                      fabricante_id === 0 ||
                      fabricante_id === "Selecione o Fabricante"
                    }
                    isValid={
                      fabricante_id !== 0 ||
                      fabricante_id !== "Selecione o Fabricante"
                    }
                    onChange={(e) => setFabricante_id(e.target.value)}
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
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="tipoLableEditarModelo">
                    Tipo
                  </Form.Label>
                  <Form.Select
                    className="dropDownTipoEditaModelo"
                    aria-label="Selecione o Tipo"
                    size="sm"
                    value={tipo_id}
                    isInvalid={tipo_id === 0 || tipo_id === "Selecione o Tipo"}
                    isValid={tipo_id !== 0 || tipo_id !== "Selecione o Tipo"}
                    onChange={(e) => setTipo_id(e.target.value)}
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
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="labelStatusEditarModelo">
                    Status
                  </Form.Label>
                  <Form.Select
                    className="seletorStatusModeloEditar"
                    size="sm"
                    id="status"
                    value={ativo}
                    onChange={(e) => setAtivo(e.target.value)}
                    validated
                  >
                    <option value={true}>Ativo</option>
                    <option value={false}>Inativo</option>
                  </Form.Select>
                </Col>
              </Row>
            </Col>
            <Col>
              <div className="colunaMeio"></div>
            </Col>
            <Col>
              <Container className="modeloEditFiguraQuadro">
                <Image src={listaMod?.imageuri} width={200} />
              </Container>
            </Col>
          </Row>
          <Row>
            <Col>
              Imagem
              <Container className="modeloFiguraCadastro">
                <div className="imgPlace">
                  <Form.Group controlId="formFileSm" className="mb-3">
                    <Form.Control
                      accept="image/*"
                      type="file"
                      onChange={imageChange}
                      size="sm"
                    />
                  </Form.Group>
                  {selectedImage && (
                    <div>
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Thumb"
                        width={300}
                        fluid
                      />
                      <div
                        className="iconeRemove "
                        onClick={removeSelectedImage}
                      >
                        <FaTrashCan size="25px" color="gray" />
                      </div>
                    </div>
                  )}
                </div>
              </Container>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <div className="btnListEditModelo">
              <Button
                type="submit"
                variant="light"
                size="sm"
                className="btnConfirmar"
                onClick={(e) => {
                  handleSubmit();
                  handleConfirmar(e);
                }}
              >
                Confirmar
              </Button>
              <Button
                variant="light"
                size="sm"
                className="btnVoltar"
                href={PathConstants.LISTAMODELOS}
              >
                Voltar
              </Button>
            </div>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default EditarModelo;
