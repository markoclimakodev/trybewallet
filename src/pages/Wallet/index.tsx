import Table from '../../components/Table';
import WalletForm from '../../components/WalletForm';
import style from './wallet.module.css';

function Wallet() {
  return (
    <section className={ style.wallet_page_container }>
      <WalletForm />
      <Table />
    </section>
  );
}

export default Wallet;
