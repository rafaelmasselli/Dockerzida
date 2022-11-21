import { useEffect, useState } from "react";
import { Table } from "../../components/structure/table";

import { ITransactions } from "../../interface";
import { api } from "../../lib/axios";

import "../transactionCreditedDates/styles.scss";

export function TransactionsDebited() {
  const [transactionsDebited, setTransactionsDebited] = useState<
    ITransactions[]
  >([]);

  async function TransactionsDebited() {
    await api.get("/transaction/find-many/debited").then((response) => {
      setTransactionsDebited(response.data.transaction);
    });
  }

  useEffect(() => {
    TransactionsDebited();
  }, []);

  return (
    <div className="container__transactions">
      {transactionsDebited.length == 0 ? (
        <div>
          <h1>Nao há transições </h1>
        </div>
      ) : (
        <>
          <h1 className="text__transaction">Transações Debitado</h1>
          <table>
            <tbody>
              <tr>
                <th>Creditado</th>
                <th>Data da transferência</th>
                <th>Debitado</th>
                <th>Valor</th>
              </tr>
              {transactionsDebited.map((response) => {
                return (
                  <Table
                    key={response.id}
                    creditedId={response.creditedId}
                    date={response.date}
                    debitedId={response.debitedId}
                    value={response.value}
                  />
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
