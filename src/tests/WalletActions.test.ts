import {
  REQUEST_CURRENCIES,
  requestCurrencies,
} from '../redux/actions';

describe('Api request actions', () => {
  it('should create the requestCurrencies action', () => {
    const action = requestCurrencies();
    expect(action).toEqual({ type: REQUEST_CURRENCIES });
  });
});
