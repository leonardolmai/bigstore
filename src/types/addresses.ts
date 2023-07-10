export interface Address {
  id: number;
  user: {
    id: number;
    name: string; // Defina um valor específico, caso contrário, deixe como opcional: name?: string;
    email: string;
    cpf: string; // Defina um valor específico, caso contrário, deixe como opcional: cpf?: string;
    phone: string; // Defina um valor específico, caso contrário, deixe como opcional: phone?: string;
  };
  postal_code: string;
  uf: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
}
