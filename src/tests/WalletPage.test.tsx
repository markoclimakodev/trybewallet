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

describe('Add expenses tests', () => {
  it('should add an expense to the expense table', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT);
    const tagSelect = screen.getByTestId(TAG_SELECT);
    const valueInput = screen.getByTestId(VALUE_INPUT);
    const methodSelect = screen.getByTestId(METHOD_SELECT);
    const currencyInput = screen.getByTestId(CURRENCY_SELECT);
    const addExpenseBtn = screen.getByRole('button', {
      name: BTN_ADD,
    });
    const initialRowCount = screen.getAllByRole('row').length;

    await userEvent.type(descriptionInput, DESCRIPTION_TYPED_1);
    await userEvent.selectOptions(tagSelect, TAG_SELECTED_1);
    await userEvent.type(valueInput, VALUE_TYPED_1);
    await userEvent.selectOptions(methodSelect, METHOD_SELECTED_1);
    await userEvent.selectOptions(currencyInput, CURRENCY_SELECTED_1);

    expect(descriptionInput).toHaveValue(DESCRIPTION_TYPED_1);
    expect(tagSelect).toHaveValue(TAG_SELECTED_1);
    expect(valueInput).toHaveValue(VALUE_TYPED_1);
    expect(methodSelect).toHaveValue(METHOD_SELECTED_1);
    expect(currencyInput).toHaveValue(CURRENCY_SELECTED_1);

    await userEvent.click(addExpenseBtn);

    await waitFor(() => {
      const currentRowCount = screen.getAllByRole('row').length;
      expect(currentRowCount).toEqual(initialRowCount + 1);

      const addedRow = screen.getAllByRole('row')[currentRowCount - 1];
      expect(addedRow).toHaveTextContent(DESCRIPTION_TYPED_1);
      expect(addedRow).toHaveTextContent(TAG_SELECTED_1);
      expect(addedRow).toHaveTextContent(VALUE_TYPED_1);
      expect(addedRow).toHaveTextContent(METHOD_SELECTED_1);
      expect(addedRow).toHaveTextContent(CURRENCY_SELECTED_1);
    });
  });
});

describe('Delete expenses tests', () => {
  it('should delete an expense from the expense table', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT);
    const tagSelect = screen.getByTestId(TAG_SELECT);
    const valueInput = screen.getByTestId(VALUE_INPUT);
    const methodSelect = screen.getByTestId(METHOD_SELECT);
    const currencyInput = screen.getByTestId(CURRENCY_SELECT);
    const addExpenseBtn = screen.getByRole('button', {
      name: BTN_ADD,
    });
    const initialRowCount = screen.getAllByRole('row').length;

    await userEvent.type(descriptionInput, DESCRIPTION_TYPED_1);
    await userEvent.selectOptions(tagSelect, TAG_SELECTED_1);
    await userEvent.type(valueInput, VALUE_TYPED_1);
    await userEvent.selectOptions(methodSelect, METHOD_SELECTED_1);
    await userEvent.selectOptions(currencyInput, CURRENCY_SELECTED_1);

    expect(descriptionInput).toHaveValue(DESCRIPTION_TYPED_1);
    expect(tagSelect).toHaveValue(TAG_SELECTED_1);
    expect(valueInput).toHaveValue(VALUE_TYPED_1);
    expect(methodSelect).toHaveValue(METHOD_SELECTED_1);
    expect(currencyInput).toHaveValue(CURRENCY_SELECTED_1);

    await userEvent.click(addExpenseBtn);

    await waitFor(() => {
      const currentRowCount = screen.getAllByRole('row').length;
      expect(currentRowCount).toEqual(initialRowCount + 1);

      const addedRow = screen.getAllByRole('row')[currentRowCount - 1];
      expect(addedRow).toHaveTextContent(DESCRIPTION_TYPED_1);
      expect(addedRow).toHaveTextContent(TAG_SELECTED_1);
      expect(addedRow).toHaveTextContent(VALUE_TYPED_1);
      expect(addedRow).toHaveTextContent(METHOD_SELECTED_1);
      expect(addedRow).toHaveTextContent(CURRENCY_SELECTED_1);
    });

    const deleteExpenseBtn = screen.getByTestId('delete-btn');
    expect(deleteExpenseBtn).toBeInTheDocument();

    await userEvent.click(deleteExpenseBtn);

    await waitFor(() => {
      const addedRow = screen.queryByText(DESCRIPTION_TYPED_1);
      expect(addedRow).not.toBeInTheDocument();
    });
  });
});

describe('Edit xpense test', () => {
  it('should edit an expense from the expense table', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT);
    const tagSelect = screen.getByTestId(TAG_SELECT);
    const valueInput = screen.getByTestId(VALUE_INPUT);
    const methodSelect = screen.getByTestId(METHOD_SELECT);
    const currencyInput = screen.getByTestId(CURRENCY_SELECT);
    const addExpenseBtn = screen.getByRole('button', {
      name: BTN_ADD,
    });
    const initialRowCount = screen.getAllByRole('row').length;

    await userEvent.type(descriptionInput, DESCRIPTION_TYPED_1);
    await userEvent.selectOptions(tagSelect, TAG_SELECTED_1);
    await userEvent.type(valueInput, VALUE_TYPED_1);
    await userEvent.selectOptions(methodSelect, METHOD_SELECTED_1);
    await userEvent.selectOptions(currencyInput, CURRENCY_SELECTED_1);

    expect(descriptionInput).toHaveValue(DESCRIPTION_TYPED_1);
    expect(tagSelect).toHaveValue(TAG_SELECTED_1);
    expect(valueInput).toHaveValue(VALUE_TYPED_1);
    expect(methodSelect).toHaveValue(METHOD_SELECTED_1);
    expect(currencyInput).toHaveValue(CURRENCY_SELECTED_1);

    await userEvent.click(addExpenseBtn);

    await waitFor(() => {
      const currentRowCount = screen.getAllByRole('row').length;
      expect(currentRowCount).toEqual(initialRowCount + 1);

      const addedRow = screen.getAllByRole('row')[currentRowCount - 1];
      expect(addedRow).toHaveTextContent(DESCRIPTION_TYPED_1);
      expect(addedRow).toHaveTextContent(TAG_SELECTED_1);
      expect(addedRow).toHaveTextContent(VALUE_TYPED_1);
      expect(addedRow).toHaveTextContent(METHOD_SELECTED_1);
      expect(addedRow).toHaveTextContent(CURRENCY_SELECTED_1);
    });

    const editExpenseBtn = screen.getByTestId('edit-btn');

    await userEvent.click(editExpenseBtn);
    await userEvent.type(descriptionInput, DESCRIPTION_TYPED_2);

    waitFor(async () => {
      const saveExpenseEdited = screen.getByTestId('save_edit');
      expect(saveExpenseEdited).toBeInTheDocument();
      await userEvent.click(saveExpenseEdited);
      const addedRow = screen.queryByText(DESCRIPTION_TYPED_2);
      expect(addedRow).not.toBeInTheDocument();
    });
  });
});
