import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { BTN_ADD, CURRENCY_INPUT, DESCRIPTION_INPUT, EMAIL_FIELD, EMAIL_INPUT, HEADER_CURRENCY_FIELD, LOGIN_BUTTON, METHOD_INPUT, PASSWORD_INPUT, TAG_INPUT, VALID_TEST_EMAIL, VALID_TEST_PASSWORD, VALUE_INPUT } from './utils/constantes';

describe('Wallet page Component Tests', () => {
  it('Renders the wallet page with all ui elements', async () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const loginBtn = screen.getByRole('button', { name: LOGIN_BUTTON });

    await userEvent.type(email, VALID_TEST_EMAIL);
    await userEvent.type(password, VALID_TEST_PASSWORD);

    expect(loginBtn).toBeEnabled();

    await userEvent.click(loginBtn);

    const userEmailField = screen.getByTestId(EMAIL_FIELD);
    const headerCurrencyField = screen.getByTestId(HEADER_CURRENCY_FIELD);

    expect(userEmailField).toHaveTextContent(VALID_TEST_EMAIL);
    expect(headerCurrencyField).toHaveTextContent('0.00');

    const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT);
    const tagInput = screen.getByTestId(TAG_INPUT);
    const valueInput = screen.getByTestId(VALUE_INPUT);
    const methodInput = screen.getByTestId(METHOD_INPUT);
    const currencyInput = screen.getByTestId(CURRENCY_INPUT);
    const expenseTable = screen.getByRole('table');
    const addExpenseBtn = screen.getByRole('button', {
      name: BTN_ADD,
    });
    const uiElementes = [descriptionInput, tagInput, valueInput, methodInput, currencyInput, addExpenseBtn, expenseTable];
    uiElementes.forEach((uiElement) => expect(uiElement).toBeInTheDocument());
  });

  it('Renders the ExpenseForm with default values', () => {
    renderWithRouterAndRedux(<Wallet />);

    const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT);
    const tagInput = screen.getByTestId(TAG_INPUT);
    const valueInput = screen.getByTestId(VALUE_INPUT);
    const methodInput = screen.getByTestId(METHOD_INPUT);

    expect(descriptionInput).toHaveValue('');
    expect(tagInput).toHaveValue('Alimentação');
    expect(valueInput).toHaveValue('');
    expect(methodInput).toHaveValue('Dinheiro');
  });
});
