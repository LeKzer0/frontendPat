import toast from "react-hot-toast";
import api from "./api";

function Autenticar(credencial) {
  api
    .post("/autenticar", credencial)
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data);
      } else if (response.status === 201) {
        console.log(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 500) {
      
      toast.error("Usuário ou senha incorretos")}
    });
}
export default Autenticar;
