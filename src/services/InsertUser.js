import toast from "react-hot-toast";
import api from "./api";

function insertUser(Object) {
  toast.promise(
    api.post("/usuarios", Object).then((response) => {}),
    {
      loading: "Salvando...",
      success: <b>Usuário Salvo!</b>,
      error: <b> Erro ao salvar usuário</b>,

      duration: 6000,
    }
  );
}

export default insertUser;
