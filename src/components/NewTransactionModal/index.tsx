import { FormEvent, useState } from 'react';
import ReactModal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { api } from '../../services/api';
import { Container, RadioBox, TransactionTypeContainer } from './styles';

ReactModal.setAppElement('#root');

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

type Types = 'deposit' | 'withdraw';

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const [type, setType] = useState<Types>('deposit');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    const data = {
      type,
      value,
      category,
      title,
    };

    api.post('transactions', data);
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <button className='react-modal-close' type='button' onClick={onRequestClose}>
        <img src={closeImg} alt='fechar modal' />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input placeholder='Título' value={title} onChange={(e) => setTitle(e.target.value)} />

        <input type='number' placeholder='Valor' value={value} onChange={(e) => setValue(+e.target.value)} />

        <TransactionTypeContainer>
          <RadioBox type='button' onClick={() => setType('deposit')} isActive={type === 'deposit'} activeColor='green'>
            <img src={incomeImg} alt='Entrada' />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox type='button' onClick={() => setType('withdraw')} isActive={type === 'withdraw'} activeColor='red'>
            <img src={outcomeImg} alt='Saída' />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input placeholder='Categoria' value={category} onChange={(e) => setCategory(e.target.value)} />

        <button type='submit'>Cadastrar</button>
      </Container>
    </ReactModal>
  );
}
