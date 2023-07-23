import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { EMAIL_INITAL_STATE, EMAIL_INPUT, INVALID_TEST_EMAIL, INVALID_TEST_PASSWORD, LOGIN_BUTTON, PASSWORD_INITAL_STATE, PASSWORD_INPUT, VALID_TEST_EMAIL, VALID_TEST_PASSWORD } from './utils/constantes';

describe('LoginForm Component Tests', () => {
  it('Renders the login form with initial state', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const loginBtn = screen.getByRole('button', { name: LOGIN_BUTTON });

    expect(email).toHaveValue(EMAIL_INITAL_STATE);
    expect(password).toHaveValue(PASSWORD_INITAL_STATE);

    expect(loginBtn).toBeDisabled();
  });

  it('The login button is disabled when the email and password are invalid', async () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const loginBtn = screen.getByRole('button', { name: LOGIN_BUTTON });

    expect(loginBtn).toBeDisabled();

    await userEvent.type(email, INVALID_TEST_EMAIL);
    await userEvent.type(password, VALID_TEST_PASSWORD);

    expect(loginBtn).toBeDisabled();

    userEvent.clear(email);
    userEvent.clear(password);

    await userEvent.type(email, VALID_TEST_EMAIL);
    await userEvent.type(password, INVALID_TEST_PASSWORD);

    expect(loginBtn).toBeDisabled();
  });

  it('The login button is enable when the email and password are valid', async () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const loginBtn = screen.getByRole('button', { name: LOGIN_BUTTON });

    expect(loginBtn).toBeDisabled();

    await userEvent.type(email, VALID_TEST_EMAIL);
    await userEvent.type(password, VALID_TEST_PASSWORD);

    expect(loginBtn).toBeEnabled();
  });

  it('Redirects to "/carteira" when the login button is clicked', async () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const loginBtn = screen.getByRole('button', { name: LOGIN_BUTTON });

    await userEvent.type(email, VALID_TEST_EMAIL);
    await userEvent.type(password, VALID_TEST_PASSWORD);

    expect(loginBtn).toBeEnabled();

    await userEvent.click(loginBtn);

    const userEmail = screen.getByRole('heading', { name: /alguem@email\.com/i });
    expect(userEmail).toBeInTheDocument();
  });
});
