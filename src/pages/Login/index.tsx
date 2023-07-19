import LoginForm from '../../components/LoginForm';
import style from './login.module.css';

function Login() {
  return (
    <section className={ style.login_page_container }>
      <LoginForm />
    </section>
  );
}

export default Login;
