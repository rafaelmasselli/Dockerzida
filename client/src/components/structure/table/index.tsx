import { ITransactions } from "../../../interface";
import { formatDate } from "../../../utils/formatDate";
import { formatReal } from "../../../utils/formatMoney";

import "./styles.scss";

export function Table({ creditedId, date, debitedId, value }: ITransactions) {
  return (
    <tr className="table__transaction">
      <td>{creditedId}</td>
      <td>{date}</td>
      <td>{debitedId}</td>
      <td>R$ {formatReal(value)}</td>
    </tr>
  );
}
