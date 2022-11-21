import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import useAuth from "../../hooks/useAuth";

import "./styles.scss";

import { Input } from "../../components/structure/input";
import { Button } from "../../components/structure/button";
import { AlertModal } from "../../components/structure/alertModal";
import { Loading } from "../../components/structure/loading";

export function UserRegistro() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const { signIn } = useAuth();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    if (username.indexOf(" ") >= 0) {
      setLoading(false);  
      handleShow();
      setDescription("O campo usuário nao pode conter espaços");
    } else if (username.length < 3) {
      setLoading(false);
      handleShow();
      setDescription("O campo usuário deve ter mais de 3 letra");
    } else if (confirmPassword != password) {
      setLoading(false);
      handleShow();
      setDescription("O campo confirma senha esta incorreta");
    } else if (!/^(?=.*[A-Z])(?=.*[a-z])/.test(password)) {
      setLoading(false);
      handleShow();
      setDescription(
        "Use letras maiúsculas e letras minusculas no campo senha"
      );
    } else if (!/^(?=.*[$*&@#])/.test(password)) {
      setLoading(false);
      handleShow();
      setDescription("Use caracteres especias no campo senha");
    } else {
      await api
        .post("/user/create", {
          username,
          password,
          confirmPassword,
        })
        .then(() => {
          signIn(username, password);
        })
        .catch(() => {
          setLoading(false);
          setDescription("Nome de usuário ja foi cadastrado");
          handleShow();
        });
    }
  }

  return (
    <div className="container__box__form__register">
      <AlertModal
        closeModal={handleClose}
        descriptionModal={description}
        modalIsOpen={show}
        titleModal={"Erro"}
      />
      <div className="box__form">
        {!loading ? (
          <>
            <form onSubmit={handleSubmit}>
              <h1>Cadastrar novo usuário </h1>
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
              <Input
                label="Confirma senha"
                name="confirmPassword"
                type="password"
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <Button name="Cadastrar" type="submit" />
              <div className="container__securePassword">
                <p>
                  Para uma senha mais segura use letras minusculas e letras
                  maiúsculas. <br></br> e algum caractere especial $*&@#
                </p>
              </div>
            </form>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
