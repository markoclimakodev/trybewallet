import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrencies, updateExpenses } from '../../redux/actions';
import { fetchCurrencyExchangeRate } from '../../services/api';
import { ExpensesData, RootReducerState } from '../../types/redux';
import Button from '../Button';
import style from './wallet_form.module.css';

const formInitalValues = {
  value: '',
  description: '',
  currency: '',
  method: '',
  tag: '',
};

function ExpenseForm() {
  const currencies = useSelector((state: RootReducerState) => state.wallet.currencies);
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: formInitalValues,
  });

  useEffect(() => {
    dispatch(getCurrencies());
  }, [dispatch]);

  const getExchangeRate = async () => {
    const exchangeRateData = await fetchCurrencyExchangeRate();
    return exchangeRateData;
  };

  const handleSubmitExpensesData = async (data:ExpensesData) => {
    const newExpense = {
      id,
      ...data,
      exchangeRates: await getExchangeRate(),
    };
    dispatch(updateExpenses(newExpense));
    setId(id + 1);
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
            <option value="Alimentacao">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saude">Saúde</option>
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
            <option value="Cartão de debito">Cartão de débito</option>
          </select>
        </label>
        <label className={ style.expense_label } htmlFor="currency">
          Moeda
          <select
            id="currency"
            data-testid="currency-input"
            { ...register('currency') }
          >

            { currencies && currencies.map((currency) => (
              <option
                value={ `${currency}` }
                key={ `${currency}` }
              >
                { `${currency}`}

              </option>
            ))}

          </select>
        </label>
      </fieldset>
      <fieldset className={ style.expense_add_btn }>

        <Button
          title="Adicionar despesa"
          variantGreen
        />
      </fieldset>
    </form>
  );
}

export default ExpenseForm;
