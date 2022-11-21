import { FormEvent, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { api } from "../../lib/axios";

import { currency } from "../../utils/currency";
import { formatReal } from "../../utils/formatMoney";

import { AlertModal } from "../../components/structure/alertModal";
import { Button } from "../../components/structure/button";
import { Loading } from "../../components/structure/loading";

import "./styles.scss";

export function CashOut() {
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useAuth();

  async function handleCashOut(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    if (user) {
      if (user?.user === username) {
        setLoading(false);
        setDescription("Você nao pode fazer transferência para você mesmo ");
        setTitle("Erro");
        handleShow();
      } else if (user.balance < parseInt(balance)) {
        setLoading(false);
        setDescription("Saldo insuficiente");
        setTitle("Erro");
        handleShow();
      } else {
        const result = balance.toString().replaceAll(".", "");
        const result2 = result.toString().replace(",", "");
        const value = parseInt(result2);
        await api
          .post("/transaction/cash-out", {
            username: username,
            value: value,
          })
          .then(() => {
            setLoading(false);
            setDescription("Transação feita com sucesso");
            setTitle("Sucesso!");
            handleShow();
          })
          .catch(() => {
            setLoading(false);
            setDescription("Usuário não encontrado");
            setTitle("Erro");
            handleShow();
          });
      }
    } else {
      setLoading(false);
      setDescription("Tente novamente mais tarde");
      setTitle("Erro");
      handleShow();
      setLoading(false);
    }
  }

  useEffect(() => {}, [user?.balance]);

  return (
    <div className="container__cash__out">
      <AlertModal
        closeModal={handleClose}
        descriptionModal={description}
        modalIsOpen={show}
        titleModal={title}
      />
      <div className="box__form">
        {!loading ? (
          <>
            <h1>Nova transação</h1>
            <form onSubmit={handleCashOut}>
              <input
                className="input__cashOut"
                placeholder="nome do usuário"
                name="username"
                type="text"
                required
                onChange={(event) => setUsername(event.target.value)}
              />
              <input
                className="input__cashOut"
                name="balance"
                onKeyUp={currency}
                placeholder="Valor da transferência"
                required
                onChange={(event) => setBalance(event.target.value)}
              />
              <Button name="Finalizar" type="submit" />
            </form>

            <div className="container__balance">
              <h4>
                Seu saldo: <strong>R$ {formatReal(user?.balance)}</strong>
              </h4>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
