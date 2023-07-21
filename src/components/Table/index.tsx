import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteExpense,
  editExpensionMode,
  startEditingExpense,
} from '../../redux/actions';
import { RootReducerState } from '../../types';
import style from './expense_table.module.css';

function Table() {
  const expenses = useSelector((state:RootReducerState) => state.wallet.expenses);
  const dispatch = useDispatch();

  const handleExpenseDelete = (id:number) => {
    dispatch(deleteExpense(id));
  };

  const handleExpenseToEdit = (expenseId: number) => {
    dispatch(editExpensionMode(true));
    dispatch(startEditingExpense(expenseId));
  };

  console.log();
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
              <button
                type="button"
                data-testid="edit-btn"
                className={ style.action_btn }
                onClick={ () => handleExpenseToEdit(expense.id) }
              >
                <FiEdit color="#31c28d" />
              </button>
              <button
                type="button"
                data-testid="delete-btn"
                className={ style.action_btn }
                onClick={ () => handleExpenseDelete(expense.id) }
              >
                <FiTrash2 fill="#DF3C6D" color="#b92727" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
