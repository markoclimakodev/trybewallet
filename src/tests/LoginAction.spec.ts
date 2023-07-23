import '@testing-library/jest-dom/extend-expect';
import { userLogin } from '../redux/actions';
import { VALID_TEST_EMAIL, VALID_TEST_PASSWORD } from './utils/constantes';

describe('Login actions', () => {
  it('Should create the userLogin action', () => {
    const userLoginData = { email: VALID_TEST_EMAIL, password: VALID_TEST_PASSWORD };
    const action = userLogin(userLoginData);
    expect(action).toEqual({ type: 'USER_LOGIN', payload: userLoginData });
  });
});
