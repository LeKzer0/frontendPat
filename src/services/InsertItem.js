import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import api from "./api";
import toast from "react-hot-toast";
function InsertItem(Object) {
  toast.promise(
    api.post("/itens", Object).then((response) => {}),
    {
      loading: "Salvando...",
      success: <b>Item Salvo!</b>,
      error: <b>Erro ao salvar item</b>,
    }
  ).catch((error) => {
    console.log(error);
    // handle error
    if (error.response.status === 409) {
      toast.error(error.response.data.message);
    } else if (error.response.status === 400) {
      
    }
    console.log(error);
  });
}
export default InsertItem;
