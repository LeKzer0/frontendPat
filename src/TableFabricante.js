import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import api from "./services/api";
import { Button } from "react-bootstrap";
import "./TableGenerica.css";
const TableFabricante = (props) => {
  const [dados, setDados] = useState([]);
  const [idfabricante, setIdfabricante] = useState();

  useEffect(() => {
    api
      .get(props.pes)
      .then((response) => {
        console.log(response.data);
        setDados(response.data);
      })
      .catch((erro) => console.log(erro));
  }, [props.pes]);

  console.log(dados);

  const checkbox = <Form.Check type="radio" name="slctGenerico" />;

  const DisplayData = dados.map((info) => {
    var exibeAtivo = "Inativo";
    if (info.ativo) exibeAtivo = "Ativo";
    return (
      <tr onClick={() => setIdfabricante(info.id)}>
        <td>{checkbox}</td>
        <td>{info.id}</td>
        <td>{info.cnpj}</td>
        <td>{info.nome}</td>
        <td>{exibeAtivo}</td>
      </tr>
    );
  });

  return (
    <div>
      <div className="btnListTable">
        <Button
          variant="light"
          size="sm"
          className="btnIncluir"
          href={"/editarfabricante/undefined"}
        >
          Incluir
        </Button>
        <Button
          variant="light"
          size="sm"
          className="btnVisualizar"
          href={"/editarfabricante/" + idfabricante}
        >
          Alterar
        </Button>
      </div>
      <div className="divTableFab">
        <Table class="tableUser" striped bordered hover responsive="xl">
          <thead>
            <tr>
              <td></td>
              <td>Id</td>
              <td>CNPJ</td>
              <td>Nome</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </Table>
      </div>
    </div>
  );
};
TableFabricante.defaultProps = {
  pes: "/fabricantes",
};
export default TableFabricante;
