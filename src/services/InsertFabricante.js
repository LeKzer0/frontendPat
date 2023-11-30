import toast from "react-hot-toast";
import api from "./api";

function InsertFabricante(Object) {
  toast.promise(
    api.post("/fabricantes", Object).then((response) => {
      console.log(response.statusText);
    }),
    {
      loading: "Salvando...",
      success: <b>Fabricante Salvo!</b>,
      error: <b> Erro ao salvar Fabricante</b>,

      duration: 6000,
    }
  );
}

export default InsertFabricante;
