import { useSession } from "../../hooks/useSession";
import { useNavigate } from "react-router-dom";
import useTasks from "../../hooks/useTasks";
import { useEffect, useState } from "react";
import Section from "../Section";
import Button from "../Button";
import Modal from "../Modal";
import Input from "../Input";
import * as S from "./styles";
import { toTitle } from "../../utils/title";
import { formatDate } from "../../utils/formatDate";
import { Task } from "../../types/task.type";
import Tag from "../Tag";
import Snackbar from "../Snackbar";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [targetEditTask, setTargetEditTask] = useState<Task | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [snackbar, setSnackbar] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { createTask, deleteTask, updateTask } = useTasks();
  const { user, logout } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.tasks) {
      if (statusFilter === "all") {
        setFilteredTasks(user.tasks);
      } else {
        const filtered = user.tasks.filter((task) => task.status === statusFilter);
        setFilteredTasks(filtered);
        console.log(user.tasks[0].status);
      }
    }
  }, [statusFilter, user]);

  function showModalCreate() {
    setModalType("create");
    setShowModal(true);
  }

  function showMessage(message: string, type: "success" | "error") {
    setSnackbar({ message, type });
    setTimeout(() => {
      setSnackbar(null);
    }, 3000);
  }

  function handleEditClick(task: Task) {
    setTargetEditTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setModalType("edit");
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.checkValidity();
    if (modalType === "create") {
      await handleCreateTask();
    } else if (modalType === "edit" && targetEditTask) {
      await handleUpdateTask(targetEditTask);
    }
    setShowModal(false);
  }

  async function handleUpdateTask(task: Task) {
    const res = await updateTask({ ...task, title, description });
    if (res.status !== 201 || res.message == "O título da tarefa precisa ter pelo menos 3 caracteres") {
      showMessage(res.message, "error");
    }
    showMessage(res.message, "success");
    setShowModal(false);
  }

  async function handleCompleteTask(task: Task) {
    const res = await updateTask({ ...task, status: "concluida" });
    if (res.status !== 200) {
      showMessage(res.message, "error");
    }
    showMessage(res.message, "success");
  }

  async function handleCreateTask() {
    if (!user) {
      navigate("/login");
    } else {
      const res = await createTask(title, description, user.id);
      if (res.status !== 201 || res.message == "O título da tarefa precisa ter pelo menos 3 caracteres") {
        showMessage(res.message, "error");
      } else {
        showMessage(res.message, "success");
        setShowModal(false);
      }
    }
  }

  async function handleDeleteTask(userId: number, taskId: number) {
    const res = await deleteTask(userId, taskId);
    if (res.status !== 200) {
      showMessage(res.message, "error");
    }
    showMessage(res.message, "success");
  }
  return (
    <>
      {showModal && (
        <Modal {...{ setShowModal, title: modalType === "create" ? "Criar nova tarefa" : "Editar tarefa" }}>
          <S.EditForm onSubmit={(e) => handleSubmit(e)}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <label htmlFor="title">Título</label>
              <Input
                id="title"
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <label htmlFor="description">Descrição</label>
              <Input
                type="text"
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              variant="text"
              disabled={title === targetEditTask?.title && description === targetEditTask.description}
            >
              {modalType === "create" ? "Criar" : "Salvar"}
            </Button>
          </S.EditForm>
        </Modal>
      )}
      <Section>
        <S.HomeTitle id="title">
          <h1>Bem vindo{`${user ? ", " + user.name : ""}`}! </h1>
          <Button variant="text" onClick={logout}>
            Sair
          </Button>
        </S.HomeTitle>
        <S.HomeContainer id="show-tasks-container">
          <S.TasksHeader>
            <h3>Minhas tarefas</h3>
            <S.AddTaskButton onClick={showModalCreate}>
              <S.AddTaskIcon size={20}></S.AddTaskIcon>
              Criar nova tarefa
            </S.AddTaskButton>
            <S.FilterIcon size={20} />
            <S.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">Todas</option>
              <option value="pendente">Pendentes</option>
              <option value="concluida">Concluídas</option>
            </S.Select>
          </S.TasksHeader>
          <S.TaskList>
            {filteredTasks.map((task) => (
              <S.CardContainer key={task.id}>
                <S.CardHeader id="card-header">
                  <S.CardTitle id="task-title">{toTitle(task.title)}</S.CardTitle>
                  <Button customStyle={{ padding: "8px" }} variant="text" onClick={() => handleEditClick(task)}>
                    <S.EditTaskIcon size={16} />
                    Editar
                  </Button>
                </S.CardHeader>
                <S.CardBody id="card-body">
                  <p id="task-desc">{task.description}</p>
                </S.CardBody>
                <S.CardFooter id="card-footer">
                  <S.CardDate>
                    <Tag variant={task.status} /> - criada em {formatDate(task.createdAt)}
                  </S.CardDate>
                  <Button variant="outline" onClick={() => handleCompleteTask(task)}>
                    Concluir
                  </Button>
                  <Button onClick={() => handleDeleteTask(user!.id, task.id)} variant="outline">
                    Excluir
                  </Button>
                </S.CardFooter>
              </S.CardContainer>
            ))}
          </S.TaskList>
        </S.HomeContainer>
      </Section>
      {snackbar && <Snackbar message={snackbar.message} type={snackbar.type} />}
    </>
  );
}
