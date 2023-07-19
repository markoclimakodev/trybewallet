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
    mode: 'onSubmit',
    defaultValues: formInitalValues,
  });

  useEffect(() => {
    const fetchCurrencyData = async () => {
      dispatch(getCurrencies());
    };
    fetchCurrencyData();
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
      className={ style.expense_container }
      onSubmit={ handleSubmit(handleSubmitExpensesData) }
    >
      <label htmlFor="description-input">
        Descrição da despesa
        <input
          id="description-input"
          type="text"
          data-testid="description-input"
          { ...register('description') }
        />
      </label>
      <label htmlFor="tag-input">
        Categoria da despesa
        <select
          id="tag-input"
          data-testid="tag-input"
          { ...register('tag') }
        >
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
      </label>
      <label htmlFor="value-input">
        Valor
        <input
          id="value-input"
          type="text"
          data-testid="value-input"
          { ...register('value') }
        />
      </label>
      <label htmlFor="method-input">
        Método de pagamento
        <select
          id="method-input"
          data-testid="method-input"
          { ...register('method') }
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="credito">Cartão de crédito</option>
          <option value="debito">Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="currency-input">
        Moeda
        <select
          id="currency-input"
          data-testid="currency-input"
          { ...register('currency') }
        >

          { currencies && currencies.map((currency) => (
            <option
              value={ String(currency) }
              key={ String(currency) }
            >
              {String(currency)}

            </option>
          ))}

        </select>
      </label>
      <Button
        id="expenses-btn"
        title="Adicionar despesa"
      />
    </form>
  );
}

export default ExpenseForm;
