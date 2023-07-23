import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { formInitalValues } from '../../types';
import {
  CURRENCY_SELECT_ID,
  EXPENSE_ADD_BUTTON,
  EXPENSE_CANCEL_EDIT_BUTTON,
  EXPENSE_DESCRIPTION_INPUT_ID,
  EXPENSE_METHOD_SELECT_ID,
  EXPENSE_SAVE_EDIT_BUTTON,
  EXPENSE_TAG_SELECT_ID, EXPENSE_VALUE_INPUT_ID,
} from './constantes';

type FormDataType = {
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
};

export const fillFormAndVerifyValues = async (formData: FormDataType) => {
  const description = screen.getByTestId(EXPENSE_DESCRIPTION_INPUT_ID);
  const tag = screen.getByTestId(EXPENSE_TAG_SELECT_ID);
  const value = screen.getByTestId(EXPENSE_VALUE_INPUT_ID);
  const method = screen.getByTestId(EXPENSE_METHOD_SELECT_ID);
  const currency = screen.getByTestId(CURRENCY_SELECT_ID);
  const addExpenseButton = screen.getByRole('button', { name: EXPENSE_ADD_BUTTON });

  await userEvent.type(description, formData.description);
  await userEvent.selectOptions(tag, formData.tag);
  await userEvent.type(value, formData.value);
  await userEvent.selectOptions(method, formData.method);
  await userEvent.selectOptions(currency, formData.currency);

  expect(description).toHaveValue(formData.description);
  expect(tag).toHaveValue(formData.tag);
  expect(value).toHaveValue(formData.value);
  expect(method).toHaveValue(formData.method);
  await waitFor(() => {
    expect(currency).toHaveValue(formData.currency);
  });

  await userEvent.click(addExpenseButton);
  await waitFor(() => {
    expect(description).toHaveValue(formInitalValues.description);
    expect(tag).toHaveValue(formInitalValues.tag);
    expect(value).toHaveValue(formInitalValues.value);
    expect(method).toHaveValue(formInitalValues.method);
    expect(currency).toHaveValue(formInitalValues.currency);
  });
  expect(addExpenseButton).toHaveTextContent(EXPENSE_ADD_BUTTON);
};

export const verifyFormDefaultValues = async (initialValues: FormDataType) => {
  const description = screen.getByTestId(EXPENSE_DESCRIPTION_INPUT_ID);
  const tag = screen.getByTestId(EXPENSE_TAG_SELECT_ID);
  const value = screen.getByTestId(EXPENSE_VALUE_INPUT_ID);
  const method = screen.getByTestId(EXPENSE_METHOD_SELECT_ID);
  const currency = screen.getByTestId(CURRENCY_SELECT_ID);
  const addExpenseButton = screen.getByRole('button', { name: EXPENSE_ADD_BUTTON });

  expect(description).toHaveValue(initialValues.description);
  expect(tag).toHaveValue(initialValues.tag);
  expect(value).toHaveValue(initialValues.value);
  expect(method).toHaveValue(initialValues.method);
  await waitFor(() => {
    expect(currency).toHaveValue(initialValues.currency);
  });

  expect(addExpenseButton).toHaveTextContent(EXPENSE_ADD_BUTTON);
};

export const verifyFormEditModeValues = async (initialValues: FormDataType) => {
  const description = screen.getByTestId(EXPENSE_DESCRIPTION_INPUT_ID);
  const tag = screen.getByTestId(EXPENSE_TAG_SELECT_ID);
  const value = screen.getByTestId(EXPENSE_VALUE_INPUT_ID);
  const method = screen.getByTestId(EXPENSE_METHOD_SELECT_ID);
  const currency = screen.getByTestId(CURRENCY_SELECT_ID);
  const editExepenseButton = screen
    .getByRole('button', { name: EXPENSE_SAVE_EDIT_BUTTON });
  const cancelExepenseButton = screen
    .getByRole('button', { name: EXPENSE_CANCEL_EDIT_BUTTON });

  expect(description).toHaveValue(initialValues.description);
  expect(tag).toHaveValue(initialValues.tag);
  expect(value).toHaveValue(initialValues.value);
  expect(method).toHaveValue(initialValues.method);
  await waitFor(() => {
    expect(currency).toHaveValue(initialValues.currency);
  });

  expect(editExepenseButton).toHaveTextContent(EXPENSE_SAVE_EDIT_BUTTON);
  expect(cancelExepenseButton).toHaveTextContent(EXPENSE_CANCEL_EDIT_BUTTON);
};
