import React from "react";
import PathConstants from "./pathConstants";

const EditarUsuario = React.lazy(() => import("../EditarUsuario"));

const EditarFabricante = React.lazy(() => import("../EditarFabricante"));

const CadastroItem = React.lazy(() => import("../CadastroItem"));

const EditarItem = React.lazy(() => import("../EditarItem"));

const TelaEditar = React.lazy(() => import("../TelaEditar"));

const EditarModelo = React.lazy(() => import("../EditarModelo"));

const TelaLogin = React.lazy(() => import("../TelaLogin"));

const TelaListaItem = React.lazy(() => import("../TelaListaItens"));

const CadastroModelo = React.lazy(() => import("../CadastroModelo"));

const TelaListaSituacao = React.lazy(() => import("../TelaListaSituacao"));

const TelaListaTipo = React.lazy(() => import("../TelaListaTipo"));

const TelaListaSetor = React.lazy(() => import("../TelaListaSetor"));

const TelaListaModelo = React.lazy(() => import("../TelaListaModelo"));

const TelaListaFabricante = React.lazy(() => import("../TelaListaFabricantes"));

const TelaListaUsuario = React.lazy(() => import("../TelaListaUsuario"));

const RelatorioHist = React.lazy(() => import("../RelatorioHist"));

const routesAdm = [
  { path: PathConstants.LISTAITENS, element: <TelaListaItem /> },
  { path: PathConstants.LISTASITUACAO, element: <TelaListaSituacao /> },
  { path: PathConstants.LISTAMODELOS, element: <TelaListaModelo /> },
  { path: PathConstants.LISTASETOR, element: <TelaListaSetor /> },
  { path: PathConstants.LISTATIPO, element: <TelaListaTipo /> },
  { path: PathConstants.LISTAFABRICANTES, element: <TelaListaFabricante /> },
  { path: PathConstants.LISTAUSUARIO, element: <TelaListaUsuario /> },
  { path: PathConstants.CADASTROITENS, element: <CadastroItem /> },
  { path: PathConstants.CADASTROMODELOS, element: <CadastroModelo /> },
  { path: PathConstants.EDITARITEM, element: <EditarItem /> },
  { path: PathConstants.EDITARSETOR, element: <TelaEditar /> },
  { path: PathConstants.EDITARSITUACAO, element: <TelaEditar /> },
  { path: PathConstants.EDITARTIPO, element: <TelaEditar /> },
  { path: PathConstants.EDITARMODELO, element: <EditarModelo /> },
  { path: PathConstants.EDITARFABRICANTE, element: <EditarFabricante /> },
  { path: PathConstants.EDITARUSUARIO, element: <EditarUsuario /> },
  { path: PathConstants.RELATORIOHIST, element: <RelatorioHist /> },
];

export default routesAdm;
