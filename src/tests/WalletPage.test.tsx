import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { BTN_ADD, CURRENCY_SELECT, CURRENCY_SELECTED_1, DESCRIPTION_INPUT, DESCRIPTION_TYPED_1, DESCRIPTION_TYPED_2, EMAIL_FIELD, EMAIL_INPUT, HEADER_CURRENCY_FIELD, LOGIN_BUTTON, METHOD_SELECT, METHOD_SELECTED_1, PASSWORD_INPUT, TAG_SELECT, TAG_SELECTED_1, VALID_TEST_EMAIL, VALID_TEST_PASSWORD, VALUE_INPUT, VALUE_TYPED_1 } from './utils/constantes';

describe('Wallet page component tests', () => {
  it('should render the wallet page with all UI elements', async () => {
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
    const tagInput = screen.getByTestId(TAG_SELECT);
    const valueInput = screen.getByTestId(VALUE_INPUT);
    const methodInput = screen.getByTestId(METHOD_SELECT);
    const currencyInput = screen.getByTestId(CURRENCY_SELECT);
    const expenseTable = screen.getByRole('table');
    const addExpenseBtn = screen.getByRole('button', {
      name: BTN_ADD,
    });
    const uiElementes = [descriptionInput, tagInput, valueInput, methodInput, currencyInput, addExpenseBtn, expenseTable];
    uiElementes.forEach((uiElement) => expect(uiElement).toBeInTheDocument());
  });

  it('should render the ExpenseForm with default values', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT);
    const tagInput = screen.getByTestId(TAG_SELECT);
    const valueInput = screen.getByTestId(VALUE_INPUT);
    const methodInput = screen.getByTestId(METHOD_SELECT);
    const currencyInput = screen.getByTestId(CURRENCY_SELECT);

    expect(descriptionInput).toHaveValue('');
    expect(tagInput).toHaveValue(TAG_SELECTED_1);
    expect(valueInput).toHaveValue('');
    expect(methodInput).toHaveValue('Dinheiro');
    await waitFor(() => {
      expect(currencyInput).toHaveValue(CURRENCY_SELECTED_1);
    });
  });
});
