import "./TelaListaGenerica.css";
import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import api from "./services/api";
import Button from "react-bootstrap/Button";

function TelaListaModelo() {
  const inputGen = useRef();
  const [generico, setGenerico] = useState("/modelos");
  const [idgenerico, setIdgenerico] = useState();
  const [dados, setDados] = useState([]);

  //Função botão Pesquisar e define dados a pesquisar
  const handlerPesquisar = (e) => {
    if (inputGen.current.value) {
      setGenerico("/modelos/nome/" + inputGen.current.value);
    } else {
      setGenerico("/modelos");
    }
  };

  //atualiza dados da tabela
  useEffect(() => {
    api
      .get(generico)
      .then((response) => {
        console.log(response.data);
        setDados(response.data);
      })
      .catch((erro) => console.log(erro));
  }, [generico]);

  const checkbox = <Form.Check type="radio" name="slctGenerico" />;

  const DisplayData = dados.map((info) => {
    var exibeAtivo = "Inativo";
    if (info.ativo) exibeAtivo = "Ativo";
    return (
      <tr onClick={() => setIdgenerico(info.id)}>
        <td>{checkbox}</td>
        <td>{info.id}</td>
        <td>{info.nome}</td>
        <td>{exibeAtivo}</td>
      </tr>
    );
  });

  return (
    <section className="componentesList">
      <div className="barraFiltroGenerico">
        <Form.Label className="NomeGenericoLabel">Nome do Modelo</Form.Label>
        <Form.Control
          className="campoNomeGenericoFiltro"
          ref={inputGen}
          size="sm"
          type="text"
          placeholder={"Insira Modelo"}
        />

        <Button
          variant="light"
          size="sm"
          className="btnPesquisarGenerico"
          onClick={handlerPesquisar}
        >
          Pesquisar
        </Button>
      </div>

      <div className="quadroListaGenerico">
        <div>
          <div className="btnListTable">
            <Button
              variant="light"
              size="sm"
              className="btnIncluir"
              href={"/cadastromodelos/modelos"}
            >
              Incluir
            </Button>
            <Button
              variant="light"
              size="sm"
              className="btnVisualizar"
              href={"/editarmodelos/" + idgenerico}
            >
              Alterar
            </Button>
          </div>
          <div className="divTableGen">
            <Table class="tableSimples" striped bordered hover responsive="xl">
              <thead>
                <tr>
                  <td></td>
                  <td>Id</td>
                  <td>Nome</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>{DisplayData}</tbody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TelaListaModelo;
