import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import { dataOnScreen1, formFilledData1, initalValues } from './mocks/filledData';
import { BTN_CANCEL_EDIT, BTN_DELETE, BTN_EDIT_EXPENSE } from './utils/constantes';
import {
  assertExpensesWereAdded,
  assertExpensesWereDeleted,
  assertFormValues,
  checkUIElementsArePresent,
  simulateUserActivingEditMode,
  simulateUserClickingOnAddExpenseButton,
  simulateUserTypingOnExpenseForm,
} from './utils/helperFunctions';

beforeEach(async () => {
  renderWithRouterAndRedux(<Wallet />);
  await assertFormValues(initalValues);
});

describe('Test Wallet Page in Register Mode', () => {
  it('should renders the wallet page with all ui elements', async () => {
    checkUIElementsArePresent();
  });

  it('should fill in the fields with typed text and selected options', async () => {
    await simulateUserTypingOnExpenseForm(formFilledData1);
    await assertFormValues(formFilledData1);
  });

  it('should fill in the fields with typed text and selected options', async () => {
    await simulateUserTypingOnExpenseForm(formFilledData1);
    await assertFormValues(formFilledData1);
  });

  it('the user can add a new expense when clicked the button "adicionar despesa', async () => {
    await simulateUserTypingOnExpenseForm(formFilledData1);
    await assertFormValues(formFilledData1);
    await simulateUserClickingOnAddExpenseButton();
    await assertExpensesWereAdded(dataOnScreen1);
  });

  it('the user can delete an expense when clicked the delete button', async () => {
    await simulateUserTypingOnExpenseForm(formFilledData1);
    await assertFormValues(formFilledData1);
    await simulateUserClickingOnAddExpenseButton();
    await assertExpensesWereAdded(dataOnScreen1);

    const deleteExpenseBtn = await screen.findByTestId(BTN_DELETE);
    expect(deleteExpenseBtn).toBeInTheDocument();

    await userEvent.click(deleteExpenseBtn);
    await assertExpensesWereDeleted(formFilledData1.description);
  });
});

describe('Test Wallet Page in Register Mode', () => {
  it('should change the ExpenseForm to edit mode', async () => {
    await simulateUserTypingOnExpenseForm(formFilledData1);
    await assertFormValues(formFilledData1);
    await simulateUserClickingOnAddExpenseButton();
    await assertExpensesWereAdded(dataOnScreen1);
    await simulateUserActivingEditMode();
    await assertFormValues(formFilledData1);

    const editeExpenseBtn = await screen.findByRole('button', { name: BTN_EDIT_EXPENSE });
    const cancelEditBtn = await screen.findByRole('button', { name: BTN_CANCEL_EDIT });

    await waitFor(() => {
      expect(editeExpenseBtn).toBeInTheDocument();
      expect(cancelEditBtn).toBeInTheDocument();
    });
  });
});
