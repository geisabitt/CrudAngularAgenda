export interface Number {
  id?: number;
  id_schedule?: number;
  number: number;
  type: string;
}

export interface Person {
  id?: number;
  name: string;
  numbers: number[];
  email: string;
  cpf: string;
  date_born: Date;
}
