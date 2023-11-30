import "./TelaListaGenerica.css";
import { useState } from "react";
import React from "react";
import { useRef } from "react";
import TableItem from "./TableItem";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function TelaListaItens() {
  const [patrimonio, setPatrimonio] = useState();
  const inputPat = useRef(null);

  const handlerPesquisar = (e) => {
    //filtro para tabela itens de patrimonio
    if (inputPat.current.value) {
      setPatrimonio("/itens/patrimonio/" + inputPat.current.value);
    } else {
      setPatrimonio("/itens");
    }
  };

  return (
    <section className="componentesList">
      <div className="barraFiltroGenerico">
        <Form.Label className="NomeGenericoLabel">
          Número de Patrimônio
        </Form.Label>
        <Form.Control
          className="campoNomeGenericoFiltro"
          ref={inputPat}
          size="sm"
          type="text"
          placeholder="Insira patrimônio"
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
        <TableItem pat={patrimonio} />
      </div>
    </section>
  );
}

export default TelaListaItens;
