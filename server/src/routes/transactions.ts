import { Router } from "express";

import { authHeader } from "../middleware/auth";

import { viewTransactionsController } from "../controller/transactions/viewTransactions.controller";
import { transactionsCashOutController } from "../controller/transactions/TransactionsCashOut.controller";
import { findManyTransactionsDebitedController } from "../controller/transactions/findManyTransactionsDebited.controller";
import { findManyTransactionsCreditedController } from "../controller/transactions/findManyTransactionsCredited.controller";
import { findManyFilterDateTransactionsCreditedController } from "../controller/transactions/findManyFilterDateTransactionsCredited.controller";
import { findManyFilterDateTransactionsDebitedController } from "../controller/transactions/findManyFilterDateTransactionsDebited.controller";

const router = Router();

const valideToken = new authHeader().handle;

router.get("/", valideToken, new viewTransactionsController().handle);

router.get(
  "/find-many/debited",
  valideToken,
  new findManyTransactionsDebitedController().handle
);
router.get(
  "/find-many/credited",
  valideToken,
  new findManyTransactionsCreditedController().handle
);
router.get(
  "/find-many/credited/filter-date",
  valideToken,
  new findManyFilterDateTransactionsCreditedController().handle
);

router.get(
  "/find-many/debited/filter-date",
  valideToken,
  new findManyFilterDateTransactionsDebitedController().handle
);

router.post(
  "/cash-out",
  valideToken,
  new transactionsCashOutController().handle
);

export default router;
