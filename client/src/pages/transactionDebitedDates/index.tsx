import { useEffect, useState } from "react";
import { Table } from "../../components/structure/table";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

import { ITransactions } from "../../interface";
import { api } from "../../lib/axios";

import "../transactionCreditedDates/styles.scss";

export function TransactionDebitedDate() {
  const [transactions, setTransactions] = useState<ITransactions[]>([]);

  async function TransactionsDebited() {
    await api
      .get("/transaction/find-many/debited/filter-date")
      .then((response) => {
        setTransactions(response.data.transaction);
      });
  }

  useEffect(() => {
    TransactionsDebited();
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
