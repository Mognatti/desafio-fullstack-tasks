export default function useTasks() {
  const url = import.meta.env.VITE_API_BASE_URL;

  async function createTask(title: string, description: string, userId: number) {
    if (title.length < 3) {
      return { status: 400, message: "O título da tarefa precisa ter pelo menos 3 caracteres" };
    }

    if (!userId) return { status: 400, message: "Usuário nao encontrado" };

    try {
      const response = await fetch(`${url}/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          userId,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return { status: 500, message: "Erro ao criar tarefa" };
    }
  }

  return { createTask };
}
