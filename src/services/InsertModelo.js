import api from "./api";
import toast from "react-hot-toast";
function InsertModelo(Object) {
  toast.promise(
    api.post("/modelos", Object).then((response) => {}),
    {
      loading: "Salvando...",
      success: <b>Modelo Salvo!</b>,
      error: <b> Erro ao salvar Modelo</b>,
      duration: 6000,
    }
  );
}

export default InsertModelo;
