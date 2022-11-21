import { Route, Routes } from "react-router-dom";
import { AllTransactions } from "../pages/allTransactions";
import { CashOut } from "../pages/cashOut";

import { Home } from "../pages/home";
import { Transaction } from "../pages/transaction";
import { TransactionCreditedDate } from "../pages/transactionCreditedDates";
import { TransactionsDebited } from "../pages/transactionDebited";
import { TransactionDebitedDate } from "../pages/transactionDebitedDates";
import { TransactionsCredited } from "../pages/transactionsCredited";
import { UndefinedPage } from "../pages/undefinedPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<UndefinedPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route
        path="/transactions/date-debited"
        element={<TransactionDebitedDate />}
      />
      <Route
        path="/transactions/date-credited"
        element={<TransactionCreditedDate />}
      />
      <Route path="/transactions/credited" element={<TransactionsCredited />} />
      <Route path="/transactions/debited" element={<TransactionsDebited />} />
      <Route path="/all-transactions" element={<AllTransactions/>} />
      <Route path="/new-transaction" element={<CashOut />} />
    </Routes>
  );
}
