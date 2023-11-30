import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import React from "react";
import api from "./api";
import TelaSucesso from "../TelaSucesso";

const GetFabricantes = () => {
  const [lista, setLista] = useState([]);
  api
    .get("/fabricante")
    .then((response) => {
      console.log(response.data._embedded.fabricanteModelList);

      if (response.status === 200) {
        setLista(response.data._embedded.fabricanteModelList);
      } else if (response.status === 201) {
        setLista(response.data._embedded.fabricanteModelList);
      }
    })
    .catch((error) => {
      console.log(error);
      // handle error
      if (error.response.status === 400) {
        // handle bad request error...
      } else if (error.response.status === 404) {
        // handle not found error...
      }
      console.log(error);
    });
  return lista;
};

export default GetFabricantes;
