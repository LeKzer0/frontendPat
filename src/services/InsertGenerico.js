import toast from "react-hot-toast";
import api from "./api";

function InsertGenerico(especificado, Object) {
  let substituir = "";

  if (especificado === "situacoes") {
    substituir = "Situação";
  } else if (especificado === "setores") {
    substituir = "Setor";
  } else {
    substituir = "Tipo";
  }
  toast.promise(
    api.post("/" + especificado + "", Object).then((response) => {}),
    {
      loading: "Salvando...",
      success: <b>{substituir} Salvo!</b>,
      error: <b> Erro ao salvar {substituir}</b>,

      duration: 6000,
    }
  );
}

export default InsertGenerico;
