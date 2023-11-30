import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import api from "./api";
import TelaSucesso from "../TelaSucesso";
function InsertHistorico(Object) {
  api
    .post("/historicos", Object)
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
      } else if (response.status === 201) {
        //mensagem de sucesso
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
}

export default InsertHistorico;
