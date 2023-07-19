import ExpenseForm from './ExpenseForm';
import FormHeader from './FormHeader';
import style from './wallet_form.module.css';

function WalletForm() {
  return (
    <section className={ style.wallet_form }>
      <FormHeader />
      <ExpenseForm />
    </section>
  );
}

export default WalletForm;
