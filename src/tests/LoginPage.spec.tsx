import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { EMAIL_INPUT, INVALID_TEST_EMAIL, INVALID_TEST_PASSWORD, LOGIN_BUTTON, PASSWORD_INPUT, VALID_TEST_EMAIL, VALID_TEST_PASSWORD } from './utils/constantes';
import { checkLoginButtonIsDisabled, checkLoginButtonIsEnabled, simulateUserTyping } from './utils/helperFunctions';

describe('User Actions on Login Page', () => {
  it('should renders the LoginForm with the initial state', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);

    expect(email).toHaveValue('');
    expect(password).toHaveValue('');

    checkLoginButtonIsDisabled();
  });

  it('the login button should be disabled if both email and password are invalid.', async () => {
    renderWithRouterAndRedux(<Login />);
    checkLoginButtonIsDisabled();
    await simulateUserTyping(INVALID_TEST_EMAIL, INVALID_TEST_PASSWORD);
    checkLoginButtonIsDisabled();
  });

  it('the login button should be disabled if email or password are invalid.', async () => {
    renderWithRouterAndRedux(<Login />);
    checkLoginButtonIsDisabled();
    await simulateUserTyping(INVALID_TEST_EMAIL, INVALID_TEST_PASSWORD);
    checkLoginButtonIsDisabled();
  });

  it('the login button should be enabled if both email and password are valid.', async () => {
    renderWithRouterAndRedux(<Login />);
    checkLoginButtonIsDisabled();
    await simulateUserTyping(VALID_TEST_EMAIL, VALID_TEST_PASSWORD);
    checkLoginButtonIsEnabled();
  });

  it('should redirects to "/carteira" when the login button is clicked', async () => {
    renderWithRouterAndRedux(<App />);

    const loginBtn = screen.getByRole('button', { name: LOGIN_BUTTON });

    checkLoginButtonIsDisabled();

    await simulateUserTyping(VALID_TEST_EMAIL, VALID_TEST_PASSWORD);

    checkLoginButtonIsEnabled();

    await userEvent.click(loginBtn);

    const userEmail = screen.getByRole('heading', { name: /alguem@email\.com/i });
    expect(userEmail).toBeInTheDocument();
  });
});
