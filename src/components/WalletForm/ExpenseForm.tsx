import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelEditingExpense,
  editExpensionMode,
  getCurrencies,
  updateEditedExpense,
  updateExpenses,
} from '../../redux/actions';
import { fetchCurrencyExchangeRate } from '../../services/api';
import { RootReducerState, formInitalValues } from '../../types';
import { expenseValidation } from '../../utils/loginValidation';
import Button from '../Button';
import style from './wallet_form.module.css';

function ExpenseForm() {
  const currencies = useSelector((state: RootReducerState) => state.wallet.currencies);
  const editMode = useSelector((state: RootReducerState) => state.wallet.editMode);
  const expenseToEdit = useSelector(
    (state: RootReducerState) => state.wallet.expenseToEdit,
  );

  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: formInitalValues,
    resolver: yupResolver(expenseValidation),
  });

  useEffect(() => {
    dispatch(getCurrencies());
  }, [dispatch]);

  useEffect(() => {
    if (editMode && expenseToEdit) {
      setValue('description', expenseToEdit.description);
      setValue('tag', expenseToEdit.tag);
      setValue('value', expenseToEdit.value);
      setValue('method', expenseToEdit.method);
      setValue('currency', expenseToEdit.currency);
    }
  }, [editMode, expenseToEdit, setValue]);

  const getExchangeRate = async () => {
    const exchangeRateData = await fetchCurrencyExchangeRate();
    return exchangeRateData;
  };

  const handleSubmitExpensesData = async (data: any) => {
    const newExpense = {
      id: editMode ? expenseToEdit.id : id,
      ...data,
      exchangeRates: await getExchangeRate(),
    };

    if (editMode) {
      dispatch(updateEditedExpense(newExpense));
      dispatch(editExpensionMode(false));
    } else {
      dispatch(updateExpenses(newExpense));
      setId((prevId) => prevId + 1);
    }

    reset();
  };

  const handleCancelEditing = () => {
    dispatch(cancelEditingExpense());
    reset();
  };

  return (
    <form
      onSubmit={ handleSubmit(handleSubmitExpensesData) }
      className={ style.expense_form }
    >
      <fieldset className={ style.expense_container }>
        <label className={ style.expense_label } htmlFor="description">
          Descrição da despesa
          <input
            id="description"
            type="text"
            data-testid="description-input"
            required
            { ...register('description') }
          />
        </label>
        <label className={ style.expense_label } htmlFor="tag">
          Categoria da despesa
          <select
            id="tag"
            data-testid="tag-input"
            { ...register('tag') }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label className={ style.expense_label } htmlFor="value">
          Valor
          <input
            id="value"
            type="text"
            data-testid="value-input"
            { ...register('value') }
          />
        </label>
        <label className={ style.expense_label } htmlFor="method">
          Método de pagamento
          <select
            id="method"
            data-testid="method-input"
            { ...register('method') }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label className={ style.expense_label } htmlFor="currency">
          Moeda
          <select
            id="currency"
            data-testid="currency-input"
            { ...register('currency') }
          >

            {currencies && currencies.map((currency) => (
              <option
                value={ `${currency}` }
                key={ `${currency}` }
              >
                {`${currency}`}

              </option>
            ))}

          </select>
        </label>
      </fieldset>
      <fieldset className={ style.expense_add_edit_btn }>
        {editMode ? (
          <>
            <Button
              title="Cancelar"
              onClick={ handleCancelEditing }
              className={ style.cancel_editing }
            />
            <Button
              title="Salvar edição"
              variantGreen
            />
          </>
        ) : (
          <Button
            title="Adicionar despesa"
            variantGreen
          />
        )}

      </fieldset>
    </form>
  );
}

export default ExpenseForm;
