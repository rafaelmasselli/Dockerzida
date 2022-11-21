import { useEffect, useState } from "react";
import { Table } from "../../components/structure/table";

import { ITransactions } from "../../interface";
import { api } from "../../lib/axios";

import "../transactionCreditedDates/styles.scss";

export function AllTransactions() {
  const [transactionsCredited, setTransactionsCredited] = useState<
    ITransactions[]
  >([]);
  const [transactionsDebitado, setTransactionsDebitado] = useState<
    ITransactions[]
  >([]);

  async function Transactions() {
    await api.get("/transaction").then((response) => {
      setTransactionsCredited(response.data.transactionsCredited);
      setTransactionsDebitado(response.data.TransactionsDebited);
    });
  }

  useEffect(() => {
    Transactions();
  }, []);

  return (
    <div className="container__transactions">
      {transactionsCredited.length == 0 ? (
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
              {transactionsCredited.map((response) => {
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
          <div className="text__transaction">
            <h1>Transações debitado</h1>
          </div>
          <table>
            <tbody>
              <tr>
                <th>Creditado</th>
                <th>Data da transferência</th>
                <th>Debitado</th>
                <th>Valor</th>
              </tr>
              {transactionsDebitado.map((response) => {
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
