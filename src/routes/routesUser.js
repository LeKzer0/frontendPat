import React from "react";
import PathConstants from "./pathConstants";

const CadastroItem = React.lazy(() => import("../CadastroItem"));
const EditarItem = React.lazy(() => import("../EditarItem"));
const TelaListaItem = React.lazy(() => import("../TelaListaItens"));
const RelatorioHist = React.lazy(() => import("../RelatorioHist"));


const routesUser = [
  { path: PathConstants.LISTAITENS, element: <TelaListaItem /> },
  { path: PathConstants.CADASTROITENS, element: <CadastroItem /> },
  { path: PathConstants.EDITARITEM, element: <EditarItem /> },
  { path: PathConstants.RELATORIOHIST, element: <RelatorioHist /> },
];

export default routesUser;
