export interface Contato {
  id?: number; // ID do contato (enviado na rota)
  name: string; // Nome do contato
  numbers: string[]; // Array de números de telefone do contato
  email: string; // E-mail do contato
  cpf: string; // CPF do contato
  date_born: string; // Data de nascimento do contato (formato YYYY-mm-dd)
}
