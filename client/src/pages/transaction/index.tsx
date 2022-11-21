import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

import { CardTransaction } from "../../components/structure/cardTransaction";

import { linkStyle } from "../../utils/linkStyle";
import "./styles.scss";

export function Transaction() {
  const { user } = useAuth();

  useEffect(() => {}, [user?.countCredited, user?.countDebited]);
  return (
    <div className="container__transactions">
      {user?.countCredited == 0 && user.countDebited == 0 ? (
        <div className="erro__text">
          <div className="name__erro">
            <h2>Você não fez nenhuma transação ainda</h2>
            <h1>
              <Link to="/new-transaction" style={linkStyle}>
                faça uma transação aqui
              </Link>
            </h1>
          </div>
        </div>
      ) : (
        <>
          {user?.countDebited == 0 ? null : (
            <>
              <CardTransaction
                link="/transactions/date-debited"
                title="Ver as transações de debitado por data decrescente"
              />
              <CardTransaction
                link="/transactions/debited"
                title="Ver as transações creditado por data decrescente"
              />
            </>
          )}
          {user?.countCredited == 0 ? null : (
            <>
              <CardTransaction
                link="/transactions/date-credited"
                title="Ver as transações creditado por data decrescente"
              />
              <CardTransaction
                link="/transactions/credited"
                title="Ver as transações creditado por data crescente"
              />
            </>
          )}
          {user?.countCredited &&
          user.countDebited &&
          user.countCredited > 0 &&
          user.countDebited > 0 ? (
            <CardTransaction
              link="/all-transactions"
              title="Ver Todas as transações"
            />
          ) : null}
        </>
      )}
    </div>
  );
}
