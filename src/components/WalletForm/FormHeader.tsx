import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TotalExpensesIcon from '../../assets/TotalExpensesIcon';
import UserIcon from '../../assets/UserIcon';
import { ExpensesData, RootReducerState } from '../../types';
import Logo from '../Logo';
import style from './wallet_form.module.css';

function FormHeader() {
  const { email } = useSelector((state: RootReducerState) => state.user);
  const { expenses } = useSelector((state: RootReducerState) => state.wallet);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (expenses.length === 0) {
      setTotal(0);
      return;
    }
    const totalExpenses = async () => {
      let totalExpense = 0;
      expenses.forEach((expense:ExpensesData) => {
        if (expense.exchangeRates) {
          const exchangeRate: number = (
            Number(expense.value) * Number(expense.exchangeRates[expense.currency].ask)
          );
          totalExpense += exchangeRate;
        }
      });
      setTotal(totalExpense);
    };
    totalExpenses();
  }, [expenses]);
  return (
    <header
      className={ style.wallet_form_header }
      data-testid="expense-header"

    >
      <Logo />
      <section className={ style.wallet_header_section }>
        <TotalExpensesIcon />
        <p>Total de despesas:</p>
        <p
          data-testid="total-field"
          className={ style.expenses }
        >
          {total.toFixed(2)}

        </p>
        <span
          data-testid="header-currency-field"
          className={ style.expenses }
        >
          BRL
        </span>
      </section>
      <section className={ style.wallet_header_section }>
        <UserIcon />
        <h2
          className={ style.user_email }
          data-testid="email-field"
        >
          {email}
        </h2>
      </section>
    </header>
  );
}

export default FormHeader;
