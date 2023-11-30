import "./App.css";
import React from "react";
import { useState } from "react";
import api from "./services/api";
import App from "./App";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";

function TelaLogin() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [userlogado, setUserlogado] = useState();

  async function loginHandler() {
    const dados = { username: username, pass: pass };

    await api
      .post("/autenticar", dados)
      .then(async (response) => {
        if (response.status === 200) {
          setUserlogado(response.data);
          console.log(userlogado);
        } else if (response.status === 201) {
          setUserlogado(response.data);
        }
      })
      .catch((error) => {
        toast.error("Usuário ou senha incorretos");
        setUserlogado(null);
      });
  }

  if (userlogado && userlogado.ativo === true) {
    secureLocalStorage.clear();
    secureLocalStorage.setItem("ativo", userlogado.ativo);
    secureLocalStorage.setItem("adm", userlogado.adm);
    secureLocalStorage.setItem("nome", userlogado.nome);
    secureLocalStorage.setItem("iduser", userlogado.id);

    console.log(secureLocalStorage.getItem("iduser"));
    return <App />;
  } else {
    return (
      <article className="containerLogin">
        <Toaster position="top-center" />
        <input
          type="text"
          className="tfusername"
          name="name"
          placeholder="Usuário"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />

        <input
          type="password"
          className="tfsenha"
          name="passwd"
          placeholder="Senha"
          onChange={(e) => setPass(e.target.value)}
          value={pass}
        />

        <button className="btentrar" onClick={loginHandler}>
          Entrar
        </button>
      </article>
    );
  }
}
export default TelaLogin;
