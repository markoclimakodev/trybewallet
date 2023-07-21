import { BiEdit, BiTrash } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { RootReducerState } from '../../types';
import style from './expense_table.module.css';

function Table() {
  const expenses = useSelector((state:RootReducerState) => state.wallet.expenses);

  return (
    <table className={ style.expense_table }>
      <thead className={ style.table_header }>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody className={ style.table_body }>
        {expenses.length > 0 && expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{Number(expense.value).toFixed(2)}</td>
            <td>{expense.exchangeRates[expense.currency].name}</td>
            <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
            <td>
              {(
                Number(expense.value)
                * Number(expense.exchangeRates[expense.currency].ask)
              ).toFixed(2)}
            </td>

            <td>{expense.currency}</td>
            <td>
              <BiEdit role="button" color="#2FC18C" />
              <BiTrash role="button" color="#DF3C6D" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
