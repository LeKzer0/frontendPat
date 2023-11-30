import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./TableGenerica.css";

function TableRelatorio(props) {
  const [dados, setDados] = useState([]);
  const [resultado, setResultado] = useState(0);

  useEffect(() => {
    setDados(props.dadosTab);
    setResultado(dados.map.size);
  }, [props.dadosTab]);

  //Map para dados da tabela, desestruturando dados

  const DisplayData = dados.map((info) => {
    const {
      modelo: {
        fabricante: { nome: nomeFab },
      },
    } = info;
    const {
      modelo: {
        tipo: { nome: nomeTipo },
      },
    } = info;
    const {
      modelo: { nome: nomeModelo },
    } = info;
    const { id: idItem } = info;
    const { patrimonio: idPat } = info;
    const { serial: itemSerial } = info;
    const {
      historicos: [
        {
          setor: { nome: nomeSetor },
        },
      ],
    } = info;
    const {
      historicos: [
        {
          situacao: { nome: nomeSit },
        },
      ],
    } = info;
    const {
      historicos: [{ local: localH }],
    } = info;
    const {
      historicos: [{ dtAlteracao: dtH }],
    } = info;
    const {
      historicos: [{ observacao: obsH }],
    } = info;

    return (
      <tr>
        <td>{idPat}</td>
        <td>{itemSerial}</td>
        <td>{nomeFab}</td>
        <td>{nomeTipo}</td>
        <td>{nomeModelo}</td>
        <td>{nomeSetor}</td>
        <td>{nomeSit}</td>
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
        <td>{dtH}</td>
      </tr>
    );
  });

  //Returnando o cabeçalho da tabela e os dados {DisplayData}

  return (
    <div className="divTableRelatorio">
      <Table class="tableItem" striped bordered hover responsive="sm">
        <thead>
          <tr>
            <td>Patrimônio</td>
            <td>Serial</td>
            <td>Fabricante</td>
            <td>Tipo</td>
            <td>Modelo</td>
            <td>Setor</td>
            <td>Situção</td>
            <td>Local</td>
            <td>Observaçoes</td>
            <td>Data Inclusão </td>
          </tr>
        </thead>
        <tbody>{DisplayData.reverse()}</tbody>
      </Table>
    </div>
  );
}

export default TableRelatorio;
