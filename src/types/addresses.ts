export interface Address {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
    cpf: string;
    phone: string;
  };
  postal_code: string;
  uf: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
}
