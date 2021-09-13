import { useTransactions } from '../../hooks/useTransactions';
import { currency, formatDate } from '../../utils/format';

import { Container } from './styles';

export function TransactionsTable() {
  const { transactions } = useTransactions();

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
              <td className={type}>{currency(amount)}</td>
              <td>{category}</td>
              <td>{formatDate(createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
