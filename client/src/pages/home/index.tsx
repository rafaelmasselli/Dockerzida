import { FaMoneyBillAlt } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { formatReal } from "../../utils/formatMoney";
import useAuth from "../../hooks/useAuth";

import { Card } from "../../components/structure/card";

import "./styles.scss";

export function Home() {
  const { user } = useAuth();

  return (
    <div className="container__home">
      <div className="container__name">
        <h2>
          Seja bem vindo! <strong>{user?.user}</strong>
          <br></br>
          Seu saldo e de <strong>R$ {formatReal(user?.balance)}</strong>
          <br></br>
        </h2>
      </div>
      <div className="container__cards">
        <Card title="Transações" link="/transaction" icon={<GrTransaction />} />
        <Card
          title="Fazer uma nova transação"
          link="/new-transaction"
          icon={<FaMoneyBillAlt />}
        />
      </div>
    </div>
  );
}
