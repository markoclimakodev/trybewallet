import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoIcon from '../../assets/LogoIcon';
import { userLogin } from '../../redux/actions';
import { UserLoginData } from '../../types/redux';
import { loginValidation } from '../../utils/loginValidation';
import Button from '../Button';
import style from './login_form.module.css';

function LoginForm() {
  const { register, handleSubmit, formState, reset } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(loginValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { errors, isValid } = formState;

  const handleSubmitData = (data:UserLoginData) => {
    dispatch(userLogin(data));
    reset();
    navigate('/carteira');
  };
  return (
    <form
      onSubmit={ handleSubmit(handleSubmitData) }
      className={ style.form_login }
    >
      <header className={ style.form_header }>
        <LogoIcon />
        <p>
          Trybe
          <strong>Wallet</strong>
        </p>
      </header>
      <fieldset className={ style.input_container }>
        <label htmlFor="email-input" className={ style.label }>
          <input
            { ...register('email') }
            data-testid="email-input"
            id="email-input"
            placeholder="E-mail"
            type="text"
            className={ style.input }
          />
          {errors.email && <p>{errors.email.message}</p>}
        </label>
        <label htmlFor="password-input" className={ style.label }>

          <input
            { ...register('password') }
            data-testid="password-input"
            id="password-input"
            placeholder="Senha"
            type="text"
            className={ style.input }
          />
          {errors.password && <p>{errors.password.message}</p>}
        </label>

      </fieldset>
      <Button
        id="login-btn"
        title="Entrar"
        disabled={ !isValid }
      />
    </form>
  );
}

export default LoginForm;