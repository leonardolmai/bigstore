export interface Cards {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
    cpf: string;
    phone: string;
  };
  name: string;
  number: string;
  expiration_month: string;
  expiration_year: string;
  cvc: string;
}
