interface IUser {
  id?: string;
  username: string;
  password: string;
  accounts?: IAccounts;
}

interface IUserFindUnique {
  id: string;
  username: string;

  accounts: {
    id: string
    balance: any;
    transactionsDebited: ITransactions[];
    transactionsCredited: ITransactions[];
  };
}

interface IAuthUser {
  id: string;
  password: string;
}

interface TokenUser {
  user_id: string;
  username: string;
}

interface IAccounts {
  id: string;
  balance: any;
  TransactionsDebited?: ITransactions[];
  transactionsCredited?: ITransactions[];
}

interface IAccountAndTransfers {
  id?: string;
  balance: number;
  transactionsDebited: ITransactions[];
  transactionsCredited: ITransactions[];
}

interface ITransactions {
  id?: string;
  value: number;
  createdAt?: any;
  debitedAccountId: string;
  creditedAccountId: string;
}

export {
  IUser,
  ITransactions,
  IAccounts,
  IAccountAndTransfers,
  IAuthUser,
  TokenUser,
  IUserFindUnique,
};
