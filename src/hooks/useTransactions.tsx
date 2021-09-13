import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface ITransaction {
  id: number;
  title: string;
  amount: number;
  type: 'withdraw' | 'deposit';
  category: string;
  createdAt: string;
}

type TTransactionInput = Omit<ITransaction, 'id' | 'createdAt'>;

// type TTransactionInput = Pick<ITransaction, 'title' | 'amount' | 'type' | 'category'>;

interface ITransactionsProviderProps {
  children: ReactNode;
}

interface ITransactionsContextData {
  transactions: ITransaction[];
  createTransaction: (transaction: TTransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<ITransactionsContextData>({} as any);

export function TransactionsProvider({ children }: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    api.get('/transactions').then(({ data }) => {
      setTransactions(data.transactions);
    });
  }, []);

  async function createTransaction(transactionInput: TTransactionInput) {
    const res = await api.post('transactions', { ...transactionInput, createdAt: new Date() });

    const { transaction } = res.data;

    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>{children}</TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
