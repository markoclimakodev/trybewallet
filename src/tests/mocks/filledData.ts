export interface FormData {
  value: string;
  description: string;
  currency: string;
  method: string;
  tag: string;
}

export type ExpectedFormData = string[];

export const initialValues:FormData = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

export const formData1:FormData = {
  value: '23.50',
  description: 'Academia',
  currency: 'USD',
  method: 'Cartão de crédito',
  tag: 'Saúde',
};

export const expectedFormData1:ExpectedFormData = [
  '23.50',
  'Academia',
  'USD',
  'Cartão de crédito',
  'Saúde',
];

export const formData2:FormData = {
  value: '13.60',
  description: 'Balada',
  currency: 'CAD',
  method: 'Cartão de débito',
  tag: 'Lazer',
};

export const expectedFormData2:ExpectedFormData = [
  '13.60',
  'Balada',
  'CAD',
  'Cartão de débito',
  'Lazer',
];
