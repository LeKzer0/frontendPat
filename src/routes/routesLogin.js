import React from "react";
import PathConstants from "./pathConstants";

const TelaLogin = React.lazy(() => import("../TelaLogin"));

const routesLogin = [{ path: PathConstants.TELALOGIN, element: <TelaLogin /> }];

export default routesLogin;
