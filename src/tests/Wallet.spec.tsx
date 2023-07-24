import { screen } from '@testing-library/dom';
import { vi } from 'vitest';

import Wallet from '../pages/Wallet';
import { mockData } from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { expectedFormData1, expectedFormData2, formData1, formData2, initialValues } from './mocks/filledData';
import { BTN_ADD } from './utils/constantes';
import { assertFormTypedValues, assertFormValues, checkIfTableIsPresent, simulateUserAddingAnExpense, simulateUserCancelExpenseEdit, simulateUserDeletingAnExpense, simulateUserEditingAnExpense, simulateUserSaveAnEditedExpense, simulateUserTyping } from './utils/helperFunctions';

afterEach(() => {
  vi.clearAllMocks();
});

beforeEach(async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => (mockData),
  });
  renderWithRouterAndRedux(<Wallet />);
  expect(global.fetch).toBeCalledTimes(1);
});

describe('Wallet page tests', () => {
  it('The ExpenseForm  should be present with defaul values', async () => {
    await assertFormValues(initialValues);
    const addExpenseBtn = screen.getByRole('button', { name: BTN_ADD });
    expect(addExpenseBtn).toHaveTextContent(/adicionar despesa/i);
  });

  it('The Table elements should be present', () => {
    checkIfTableIsPresent();
  });

  it('The user can add an expense', async () => {
    await assertFormValues(initialValues);
    await simulateUserTyping(formData1);
    await assertFormTypedValues(formData1);
    await simulateUserAddingAnExpense(expectedFormData1);
    await assertFormValues(initialValues);
  });

  it('the use can cancel an edit', async () => {
    await assertFormValues(initialValues);
    await simulateUserTyping(formData1);
    await assertFormTypedValues(formData1);
    await simulateUserAddingAnExpense(expectedFormData1);
    await assertFormValues(initialValues);
    await simulateUserEditingAnExpense();
    await simulateUserCancelExpenseEdit();
    await assertFormValues(initialValues);
  });

  it('the user can edit an expense', async () => {
    await assertFormValues(initialValues);
    await simulateUserTyping(formData1);
    await assertFormTypedValues(formData1);
    await simulateUserAddingAnExpense(expectedFormData1);
    await assertFormValues(initialValues);
    await simulateUserEditingAnExpense();
    await assertFormValues(formData1);
    await simulateUserTyping(formData2);
    await simulateUserSaveAnEditedExpense(expectedFormData2);
  });

  it('the user can delete an expense', async () => {
    await assertFormValues(initialValues);
    await simulateUserTyping(formData1);
    await assertFormTypedValues(formData1);
    await simulateUserAddingAnExpense(expectedFormData1);
    await assertFormValues(initialValues);
    await simulateUserDeletingAnExpense(expectedFormData1);
  });
});
