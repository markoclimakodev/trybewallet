import FormHeader from './FormHeader';
import style from './wallet_form.module.css';

function WalletForm() {
  return (
    <form className={ style.wallet_form }>
      <FormHeader />
    </form>
  );
}

export default WalletForm;
