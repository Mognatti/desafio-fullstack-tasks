import { Task } from "../types/task.type";
import { useSession } from "./useSession";

export default function useTasks() {
  const url = `${import.meta.env.VITE_API_BASE_URL}/task`;
  const { user, updateUserTasks } = useSession();

  async function createTask(title: string, description: string, userId: number) {
    if (title.length < 3) {
      return { status: 400, message: "O título da tarefa precisa ter pelo menos 3 caracteres" };
    }

    if (!userId) return { status: 400, message: "Usuário nao encontrado" };

    try {
      const response = await fetch(`${url}`, {
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

      const res = await response.json();

      if (res.success === true && user) {
        updateUserTasks([...user.tasks, res.data]);
      }

      return {
        status: res.status,
        message: res.message,
      };
    } catch (error) {
      console.error(error);
      return { status: 500, message: "Erro ao criar tarefa" };
    }
  }

  async function deleteTask(userId: number, id: number) {
    try {
      const response = await fetch(`${url}/${userId}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success === true && user) {
        updateUserTasks(user.tasks.filter((task) => task.id !== id));
      }
      return {
        status: data.status,
        message: data.message,
      };
    } catch (error) {
      console.error(error);
      return { status: 500, message: "Erro ao deletar tarefa" };
    }
  }

  async function getTasks(userId: number) {
    try {
      const response = await fetch(`${url}/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return { status: 500, message: "Erro ao buscar tarefas" };
    }
  }

  async function updateTask(task: Task) {
    if (!task.id) return { status: 400, message: "Tarefa nao encontrada" };
    if (!task.title || task.title.length < 3)
      return { status: 400, message: "O título da tarefa precisa ter pelo menos 3 caracteres" };
    try {
      const response = await fetch(`${url}/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await response.json();
      if (data.success === true && user) {
        updateUserTasks(
          user.tasks.map((t) => {
            if (t.id === task.id) {
              return task;
            }
            return t;
          })
        );
      }
      return {
        status: data.status,
        message: data.message,
      };
    } catch (error) {
      console.error(error);
      return { status: 500, message: "Erro ao atualizar tarefa" };
    }
  }

  return { createTask, deleteTask, getTasks, updateTask };
}
