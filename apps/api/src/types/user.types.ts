// Achei melhor criar um tipo base para os métodos de criação e atualização de usuários, para evitar repetição de código
type UserBaseProps = {
  email: string;
  name: string;
  password: string;
};

// Caso novos tipos sejam necessários, basta adicionar em cada um
export type CreateUserProps = UserBaseProps & {};

export type UpdateUserProps = UserBaseProps & {};

export type User = {
  id: number;
  name: string;
  email: string;
};

export type Result = {
  status: number;
  success: boolean;
  error: boolean;
  message: string;
  data: User | null;
};
