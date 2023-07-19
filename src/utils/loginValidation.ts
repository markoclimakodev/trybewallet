import * as Yup from 'yup';

export const loginValidation = Yup.object().shape({
  email: Yup
    .string()
    .email('Insira um endereço de e-mail válido')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'e-mail inválido')
    .required('Campo obrigatório'),
  password: Yup
    .string()
    .min(6)
    .matches(/^.{6,18}$/)
    .required('Campo obrigatório'),
});
