import WalletForm from '../../components/WalletForm';
import style from './wallet.module.css';

function Wallet() {
  return (
    <section className={ style.wallet_page_container }>
      <WalletForm />
    </section>
  );
}

export default Wallet;
