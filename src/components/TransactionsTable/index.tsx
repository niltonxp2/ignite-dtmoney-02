import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Container } from './styles';

interface ITransaction {
  id: number;
  title: string;
  amount: number;
  type: 'withdraw' | 'deposit';
  category: string;
  createdAt: string;
}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    api.get('/transactions').then(({ data }) => {
      setTransactions(data.transactions);
    });
  }, []);

  console.log(transactions);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(({ id, title, category, amount, type, createdAt }) => (
            <tr key={id}>
              <td>{title}</td>
              <td className={type}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(amount)}
              </td>
              <td>{category}</td>
              <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(createdAt))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
