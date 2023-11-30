import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import api from "./services/api";
import Button from "react-bootstrap/Button";
import PathConstants from "./routes/pathConstants";
import "./TableGenerica.css";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";

function TableItem(props) {
  const [dados, setDados] = useState([]);
  const [idItemSelected, setIdItemSelected] = useState();
  const [patItemSelected, setPatItemSelected] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Deletar = () => {
    toast.promise(
      api.delete("/itens/" + idItemSelected + "").then((response) => {}),
      {
        loading: "Deletando...",
        success: <b>Item excluido!</b>,
        error: <b>Erro ao excluir item</b>,
      }
    );
    setTimeout(handleConsultar, 2000);
  };

  //Requisitando itens a api atraves do axios
  const handleConsultar = () => {
    api
      .get("" + props.pat + "")
      .then((response) => {
        setDados(response.data);
      })
      .catch((erro) => console.log(erro));
  };

  useEffect(() => {
    api
      .get("" + props.pat + "")
      .then((response) => {
        setDados(response.data);
      })
      .catch((erro) => console.log(erro));
  }, [props.pat]);

  //Map para tabela
  const DisplayData = dados.map((info) => {
    //Desestruturando objeto para aferir nomes do Tipo e Fabricante

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
    const { id: idItem } = info;
    const { patrimonio: idPat } = info;
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

    const checkbox = <Form.Check type="radio" name="slctItem" id={idItem} />;

    return (
      <tr
        onClick={() => {
          setIdItemSelected(idItem);
          setPatItemSelected(idPat);
        }}
      >
        <td>{checkbox}</td>
        <td>{idItem}</td>
        <td>{idPat}</td>
        <td>{nomeSetor}</td>
        <td>{nomeTipo}</td>
        <td>{nomeFab}</td>
        <td>{nomeSit}</td>
      </tr>
    );
  });

  //Retornando o cabeçalho da tabela e os dados {DisplayData}
  return (
    <div>
      <div className="btnListTable">
        <Button
          variant="light"
          size="sm"
          className="btnIncluir"
          href={PathConstants.CADASTROITENS}
        >
          Incluir
        </Button>
        <Button
          variant="light"
          size="sm"
          className="btnVisualizar"
          href={"/editaritem/" + idItemSelected}
        >
          Alterar
        </Button>
        <Button
          variant="light"
          size="sm"
          className="btnExcluir"
          onClick={() => {
            if (secureLocalStorage.getItem("adm")) {
              handleShow();
            } else toast.error("Solicite a exclusão a um administrador.");
          }}
        >
          Excluir
        </Button>
      </div>
      <div className="divTableIens">
        <Table className="tableItem" striped bordered hover responsive="xl">
          <thead>
            <tr>
              <td></td>
              <td>Id</td>
              <td>Patrimônio</td>
              <td>Setor</td>
              <td>Tipo</td>
              <td>Fabricante</td>
              <td>Situação</td>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </Table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deseja deletar Item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Pressione confirmar para remover o item de patrimônio
          {" " + patItemSelected}.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              Deletar();
              handleClose();
            }}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

//Especifica o que sera exibido por padrão, no caso todos os itens
TableItem.defaultProps = {
  pat: "/itens",
};

export default TableItem;
