import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./TableGenerica.css";

function TableHistoricoDados(props) {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    setDados(props.dadosTab);
  }, [props.dadosTab]);

  //Map para dados da tabela, desestruturando dados
  const DisplayData = dados.map((info) => {
    const {
      usuario: { nome: nomeUser },
    } = info;
    const {
      situacao: { nome: nomeSit },
    } = info;
    const {
      setor: { nome: nomeSetor },
    } = info;
    const { local: localH } = info;
    const { dtAlteracao: dtH } = info;
    const { observacao: obsH } = info;

    return (
      <tr>
        <td>{dtH}</td>
        <td>{nomeUser}</td>
        <td>{nomeSit}</td>
        <td>{nomeSetor}</td>
        <OverlayTrigger
          placement="left"
          overlay={
            <Tooltip>
              Descrição do Local do Item: <strong>{localH}</strong>.
            </Tooltip>
          }
        >
          <td>{localH.slice(0, 20)}</td>
        </OverlayTrigger>
        <OverlayTrigger
          placement="left"
          overlay={
            <Tooltip>
              Observações sobre o item: <strong>{obsH}</strong>.
            </Tooltip>
          }
        >
          <td>{obsH.slice(0, 20)} </td>
        </OverlayTrigger>
      </tr>
    );
  });

  //Returnando o cabeçalho da tabela e os dados {DisplayData}

  return (
    <div className="divTableHist">
      <Table class="tableItem" striped bordered hover responsive="sm">
        <thead>
          <tr>
            <td>Data de Alteração</td>
            <td>Cadastrador</td>
            <td>Situação</td>
            <td>Setor</td>
            <td>Local</td>
            <td>Observação</td>
          </tr>
        </thead>
        <tbody>{DisplayData.reverse()}</tbody>
      </Table>
    </div>
  );
}

export default TableHistoricoDados;
