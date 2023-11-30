import "./MenuOpcoes.css";
import * as React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import PathConstants from "./routes/pathConstants";
import { FaArrowRightToBracket, FaUser } from "react-icons/fa6";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import secureLocalStorage from "react-secure-storage";

function MenuOpcoes() {
  console.log(secureLocalStorage.getItem("nome"));
  function LogoffHandler() {
    secureLocalStorage.clear();
  }

  return (
    <Navbar className="bg-body-tertiary">
      <Container className="containerMenuOpcoes">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="BarraMenu">
            <NavDropdown
              className="cadastroDropdown"
              title="Cadastros"
              id="cadastro-dropdown"
            >
              <NavDropdown.Item href={PathConstants.LISTASETOR}>
                Setor
              </NavDropdown.Item>
              <NavDropdown.Item href={PathConstants.LISTATIPO}>
                Tipo
              </NavDropdown.Item>
              <NavDropdown.Item href={PathConstants.LISTAFABRICANTES}>
                Fabricante
              </NavDropdown.Item>
              <NavDropdown.Item href={PathConstants.LISTAMODELOS}>
                Modelo
              </NavDropdown.Item>
              <NavDropdown.Item href={PathConstants.LISTASITUACAO}>
                Situação
              </NavDropdown.Item>
              <NavDropdown.Item href={PathConstants.LISTAITENS}>
                Item
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              className="relatorioDropdown"
              title="Relatórios"
              id="relatorio-dropdown"
            >
              <NavDropdown.Item href={PathConstants.RELATORIOHIST}>
                Relatório
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              className="usuarioDropdown"
              title="Usuários"
              id="usuario-dropdown"
            >
              <NavDropdown.Item href={PathConstants.LISTAUSUARIO}>
                Usuário
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Col className="colIconUser">
        <div className="iconUser">
          {" "}
          <FaUser size="20px" color="gray" />
        </div>
      </Col>
      <Col className="colNomeDeUsuario">
        <div className="nomeLogado ">{secureLocalStorage.getItem("nome")}</div>
      </Col>
      <Col className="colIconSair">
        <OverlayTrigger
          placement="left"
          overlay={
            <Tooltip>
              <strong>Sair</strong>
            </Tooltip>
          }
        >
          <div className="btSair" onClick={LogoffHandler}>
            <a href="/">
              <FaArrowRightToBracket size="20px" color="gray" />
            </a>
          </div>
        </OverlayTrigger>
      </Col>
    </Navbar>
  );
}

export default MenuOpcoes;
