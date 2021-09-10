import { useEffect } from 'react';
import { api } from '../../services/api';
import { Container } from './styles';

export function TransactionsTable() {
  useEffect(() => {
    api.get('/transactions').then(({ data }) => console.log(data));
  }, []);

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
          <tr>
            <td>Teste</td>
            <td className='deposit'>R$ 2,00</td>
            <td>Entrada</td>
            <td>16/08/2021</td>
          </tr>
          <tr>
            <td>Teste 2</td>
            <td className='withdraw'>- R$ 2,00</td>
            <td>Entrada</td>
            <td>16/08/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
