import * as Yup from 'yup';

const fieldRequired = 'Campo obrigatório';

export const loginValidation = Yup.object().shape({
  email: Yup
    .string()
    .email('Insira um endereço de e-mail válido')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'e-mail inválido')
    .required(fieldRequired),
  password: Yup
    .string()
    .min(6)
    .matches(/^.{6,18}$/)
    .required(fieldRequired),
});

export const expenseValidation = Yup.object().shape({
  description: Yup
    .string()
    .required(fieldRequired),
  value: Yup
    .string()
    .required(fieldRequired),
  currency: Yup
    .string()
    .required(fieldRequired),
  method: Yup
    .string()
    .required(fieldRequired),
  tag: Yup
    .string()
    .required(fieldRequired),
});
