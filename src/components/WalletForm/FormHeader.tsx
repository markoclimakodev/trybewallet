import { useSelector } from 'react-redux';
import TotalExpensesIcon from '../../assets/TotalExpensesIcon';
import UserIcon from '../../assets/UserIcon';
import { RootReducerState } from '../../types/redux';
import Logo from '../Logo';
import style from './wallet_form.module.css';

function FormHeader() {
  const { email } = useSelector((state: RootReducerState) => state.user);

  return (
    <header className={ style.wallet_form_header }>
      <Logo />
      <section className={ style.wallet_header_section }>
        <TotalExpensesIcon />
        <p>Total de despesas:</p>
        <span
          data-testid="total-field"
          className={ style.expenses }
        >
          0

        </span>
        <span
          data-testid="header-currency-field"
          className={ style.expenses }
        >
          BRL

        </span>
      </section>
      <section className={ style.wallet_header_section }>
        <UserIcon />
        <span
          className={ style.user_email }
          data-testid="email-field"
        >
          {email}
        </span>
      </section>
    </header>
  );
}

export default FormHeader;
