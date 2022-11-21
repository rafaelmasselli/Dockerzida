import { useEffect, useState } from "react";
import { Table } from "../../components/structure/table";

import { ITransactions } from "../../interface";
import { api } from "../../lib/axios";

import "../transactionCreditedDates/styles.scss";

export function TransactionsCredited() {
  const [transactions, setTransactions] = useState<ITransactions[]>([]);

  async function TransactionsCredited() {
    await api.get("/transaction/find-many/credited").then((response) => {
      setTransactions(response.data.transaction);
    });
  }

  useEffect(() => {
    TransactionsCredited();
  }, []);

  return (
    <div className="container__transactions">
      {transactions.length == 0 ? (
        <div>
          <h1>Nao há transições</h1>
        </div>
      ) : (
        <>
          <div className="text__transaction">
            <h1>Transações creditado</h1>
          </div>
          <table>
            <tbody>
              <tr>
                <th>Creditado</th>
                <th>Data da transferência</th>
                <th>Debitado</th>
                <th>Valor</th>
              </tr>
              {transactions.map((response) => {
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
