import { FormEvent, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { api } from "../../lib/axios";

import "./styles.scss";
import { linkStyle } from "../../utils/linkStyle";

import { Input } from "../../components/structure/input";
import { Button } from "../../components/structure/button";
import { AlertModal } from "../../components/structure/alertModal";
import { Loading } from "../../components/structure/loading";

export function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { signIn } = useAuth();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    await api
      .post("/auth", {
        username,
        password,
      })
      .then((res) => {
        signIn(res.data.token);
      })
      .catch(() => {
        setDescription("O campo usuário ou senha esta incorreto");
        handleShow();
        setLoading(false);
      });
  }

  return (
    <div className="container__box__form">
      <AlertModal
        closeModal={handleClose}
        descriptionModal={description}
        modalIsOpen={show}
        titleModal={"Erro"}
      />
      <div className="box__form">
        {!loading ? (
          <>
            <h1>Entra na conta</h1>
            <form onSubmit={handleSubmit}>
              <Input
                label="Usuário"
                name="username"
                type="text"
                onChange={(event) => setUsername(event.target.value)}
              />
              <Input
                label="Senha"
                name="password"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button name="Entrar" type="submit" />
            </form>
            <div>
              <p>
                Caso não tenha uma conta<br></br> cadastre-se{" "}
                <Link to="/register" style={linkStyle}>
                  aqui
                </Link>
              </p>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
