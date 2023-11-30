import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import api from "./services/api";
import { Button } from "react-bootstrap";
import "./TableGenerica.css";

const TableUser = (props) => {
  const [dados, setDados] = useState([]);
  const [idusuario, setIdusuario] = useState();

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
    var exibeAdm = "Não";
    if (info.ativo) exibeAtivo = "Ativo";
    if (info.adm) exibeAdm = "Sim";
    return (
      <tr onClick={() => setIdusuario(info.id)}>
        <td>{checkbox}</td>
        <td>{info.id}</td>
        <td>{info.cpf}</td>
        <td>{info.nome}</td>
        <td>{exibeAdm}</td>
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
          href={"/editarusuario/undefined"}
        >
          Incluir
        </Button>
        <Button
          variant="light"
          size="sm"
          className="btnVisualizar"
          href={"/editarusuario/" + idusuario}
        >
          Alterar
        </Button>
      </div>
      <div className="divTableUser">
        <Table class="tableUser" striped bordered hover responsive="xl">
          <thead>
            <tr>
              <td></td>
              <td>Id</td>
              <td>CPF</td>
              <td>Nome</td>
              <td>Administrador</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </Table>
      </div>
    </div>
  );
};

TableUser.defaultProps = {
  pes: "/usuarios",
};

export default TableUser;
