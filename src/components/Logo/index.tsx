import LogoIcon from '../../assets/LogoIcon';
import style from './logo.module.css';

function Logo() {
  return (
    <section className={ style.logo_container }>
      <LogoIcon />
      <p>
        Trybe
        <strong>Wallet</strong>
      </p>
    </section>
  );
}
export default Logo;
