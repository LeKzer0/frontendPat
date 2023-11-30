import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TelaLogin from "./TelaLogin";
import Layout from "./Layout";
import routesAdm from "./routes/routesAdm";
import routesUser from "./routes/routesUser";
import routesLogin from "./routes/routesLogin";
import secureLocalStorage from "react-secure-storage";

export default function App() {
  const routerLogin = createBrowserRouter([
    {
      path: "/",
      element: <TelaLogin />,
      children: routesLogin,
      errorElement: <TelaLogin />,
    },
  ]);

  const routerAdm = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: routesAdm,
      errorElement: <Layout />,
    },
  ]);

  const routerUser = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: routesUser,
      errorElement: <Layout />,
    },
  ]);

  if (
    secureLocalStorage.getItem("adm") === true &&
    secureLocalStorage.getItem("ativo") === true
  ) {
    console.log("rota adm");
    return <RouterProvider router={routerAdm} />;
  } else if (secureLocalStorage.getItem("ativo") === true) {
    console.log("rota user");
    return <RouterProvider router={routerUser} />;
  }
  console.log(secureLocalStorage.getItem("adm"));
  console.log(secureLocalStorage.getItem("ativo"));
}
