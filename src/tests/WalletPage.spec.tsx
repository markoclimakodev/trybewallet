import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { CURRENCY_SELECT, DESCRIPTION_INPUT, EMAIL_FIELD, HEADER_CURRENCY_FIELD, LOGIN_BUTTON, METHOD_SELECT, TAG_SELECT, VALID_TEST_EMAIL, VALID_TEST_PASSWORD, VALUE_INPUT } from './utils/constantes';
import { checkLoginButtonIsEnabled, checkUIElementsArePresent, simulateUserTypingOnLoginPage } from './utils/helperFunctions';

describe('Wallet page Component Tests', () => {
  it('Renders the wallet page with all ui elements', async () => {
    renderWithRouterAndRedux(<App />);

    const loginBtn = screen.getByRole('button', { name: LOGIN_BUTTON });
    await simulateUserTypingOnLoginPage(VALID_TEST_EMAIL, VALID_TEST_PASSWORD);
    checkLoginButtonIsEnabled();

    await userEvent.click(loginBtn);

    const userEmailField = screen.getByTestId(EMAIL_FIELD);
    const headerCurrencyField = screen.getByTestId(HEADER_CURRENCY_FIELD);

    expect(userEmailField).toHaveTextContent(VALID_TEST_EMAIL);
    expect(headerCurrencyField).toHaveTextContent('0.00');

    checkUIElementsArePresent();
  });

  it('Renders the ExpenseForm with default values', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT);
    const tagSelect = screen.getByTestId(TAG_SELECT);
    const valueInput = screen.getByTestId(VALUE_INPUT);
    const methodSelect = screen.getByTestId(METHOD_SELECT);
    const currencySelect = screen.getByTestId(CURRENCY_SELECT);

    expect(descriptionInput).toHaveValue('');
    expect(tagSelect).toHaveValue('Alimentação');
    expect(valueInput).toHaveValue('');
    expect(methodSelect).toHaveValue('Dinheiro');
    await waitFor(() => {
      expect(currencySelect).toBeInTheDocument();
    });
  });
});
