import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import Wallet from '../pages/Wallet';
import { formInitalValues } from '../types';
import { dataOnScreen1, dataOnScreen2, formFilledData1, formFilledData2 } from './mocks/filledData';
import { EXPENSEFORM_UI_ELEMENTS, EXPENSE_ADD_BUTTON, EXPENSE_CANCEL_EDIT_BUTTON, EXPENSE_DELETE_BUTTON, EXPENSE_EDIT_BUTTON, EXPENSE_SAVE_EDIT_BUTTON, FORMHEADER_ELEMENTS } from './utils/constantes';
import { fillFormAndVerifyValues, verifyFormDefaultValues, verifyFormEditModeValues } from './utils/helperFunctions';

describe('Test UI Elements on Wallet Page', () => {
  it('should have a header with logo, total expense and user email', () => {
    renderWithRouterAndRedux(<Wallet />);

    FORMHEADER_ELEMENTS.forEach((uiElement) => {
      const element = screen.getByTestId(uiElement);
      expect(element).toBeInTheDocument();
    });
  });

  it('should have the description, value, method, tag, currency field, add button and a table', () => {
    renderWithRouterAndRedux(<Wallet />);

    EXPENSEFORM_UI_ELEMENTS.forEach((uiElement) => {
      const element = screen.getByTestId(uiElement);
      expect(element).toBeInTheDocument();
    });

    const addExpenseButton = screen.getByRole('button', { name: EXPENSE_ADD_BUTTON });
    const expenseTable = screen.getByRole('table');

    expect(addExpenseButton).toBeInTheDocument();
    expect(expenseTable).toBeInTheDocument();
  });
});

describe('Test ExpenseForm default values', () => {
  it('should have the fields filled with initial values', async () => {
    renderWithRouterAndRedux(<Wallet />);
    await verifyFormDefaultValues(formInitalValues);
  });
});

describe('User Actions on ExpenseForm', () => {
  it('should fill in the fields with typed text and selected options and the form return to default value when clicked to add expense', async () => {
    renderWithRouterAndRedux(<Wallet />);
    await fillFormAndVerifyValues(formFilledData1);
  });
});

describe('User can add exmpenses', () => {
  it('should allow the user to add a new expense when clicked the button "adicionar despesa"', async () => {
    renderWithRouterAndRedux(<Wallet />);
    await fillFormAndVerifyValues(formFilledData1);

    dataOnScreen1.forEach(async (expenseData) => {
      const expenseInfo = await screen.findByText(expenseData);
      expect(expenseInfo).toBeInTheDocument();
    });
  });

  it('should allow the user to add  various expenses"', async () => {
    renderWithRouterAndRedux(<Wallet />);
    await fillFormAndVerifyValues(formFilledData1);
    await fillFormAndVerifyValues(formFilledData2);

    dataOnScreen1.forEach(async (expenseData) => {
      const expenseInfo = await screen.findByText(expenseData);
      expect(expenseInfo).toBeInTheDocument();
    });

    dataOnScreen2.forEach(async (expenseData) => {
      const expenseInfo = await screen.findByText(expenseData);
      expect(expenseInfo).toBeInTheDocument();
    });
  });
});

describe('User can delete exmpenses', async () => {
  it('should allow the user to delete an expense when clicked the delete button', async () => {
    renderWithRouterAndRedux(<Wallet />);
    await fillFormAndVerifyValues(formFilledData1);
    const deleteExpenseButton = screen.getByTestId(EXPENSE_DELETE_BUTTON);

    dataOnScreen1.forEach(async (expenseData) => {
      const expenseInfo = await screen.findByText(expenseData);
      expect(expenseInfo).toBeInTheDocument();
    });

    expect(deleteExpenseButton).toBeInTheDocument();
    await userEvent.click(deleteExpenseButton);
  });
});

describe('Test  Wallet Page on edit mode', () => {
  it('should change the ExpenseForm to edit mode', async () => {
    renderWithRouterAndRedux(<Wallet />);
    await fillFormAndVerifyValues(formFilledData1);

    dataOnScreen1.forEach(async (expenseData) => {
      const expenseInfo = await screen.findByText(expenseData);
      expect(expenseInfo).toBeInTheDocument();
    });

    const enableEditModeButton = screen.getByTestId(EXPENSE_EDIT_BUTTON);

    await userEvent.click(enableEditModeButton);

    await waitFor(() => {
      const addExpenseButton = screen.queryByRole('button', { name: EXPENSE_ADD_BUTTON });
      expect(addExpenseButton).not.toBeInTheDocument();
    });

    const editExepenseButton = screen.getByRole('button', { name: EXPENSE_SAVE_EDIT_BUTTON });
    const cancelExepenseButton = screen.getByRole('button', { name: EXPENSE_CANCEL_EDIT_BUTTON });

    expect(editExepenseButton).toBeInTheDocument();
    expect(cancelExepenseButton).toBeInTheDocument();
  });

  it('should change the ExpenseForm to register mode if clicked the cancel button', async () => {
    renderWithRouterAndRedux(<Wallet />);
    await fillFormAndVerifyValues(formFilledData1);

    dataOnScreen1.forEach(async (expenseData) => {
      const expenseInfo = await screen.findByText(expenseData);
      expect(expenseInfo).toBeInTheDocument();
    });

    const enableEditModeButton = screen.getByTestId(EXPENSE_EDIT_BUTTON);

    await userEvent.click(enableEditModeButton);

    await waitFor(() => {
      const addExpenseButton = screen.queryByRole('button', { name: EXPENSE_ADD_BUTTON });
      expect(addExpenseButton).not.toBeInTheDocument();
    });

    const editExepenseButton = screen.getByRole('button', { name: EXPENSE_SAVE_EDIT_BUTTON });
    const cancelExepenseButton = screen.getByRole('button', { name: EXPENSE_CANCEL_EDIT_BUTTON });

    expect(editExepenseButton).toBeInTheDocument();
    expect(cancelExepenseButton).toBeInTheDocument();

    await userEvent.click(cancelExepenseButton);

    await waitFor(() => {
      const addExpenseButton = screen.getByRole('button', { name: EXPENSE_ADD_BUTTON });
      expect(addExpenseButton).toBeInTheDocument();
      expect(editExepenseButton).not.toBeInTheDocument();
    });
  });

  it('The ExpenseForm should be filled with the expense selected to edit', async () => {
    renderWithRouterAndRedux(<Wallet />);
    await fillFormAndVerifyValues(formFilledData1);

    dataOnScreen1.forEach(async (expenseData) => {
      const expenseInfo = await screen.findByText(expenseData);
      expect(expenseInfo).toBeInTheDocument();
    });

    const enableEditModeButton = screen.getByTestId(EXPENSE_EDIT_BUTTON);
    await userEvent.click(enableEditModeButton);

    await verifyFormEditModeValues(formFilledData1);
  });
});
