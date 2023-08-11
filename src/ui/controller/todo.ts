import { todoRepository } from "@ui/repository/todo";

interface TodoControllerGetParams {
  page?: number;
}
async function get({ page }: TodoControllerGetParams = {}) {
  // Fazer a lógica para pegar os dados
  return todoRepository.get({
    page: page || 1,
    limit: 10,
  });
}

export const todoController = {
  get,
};
