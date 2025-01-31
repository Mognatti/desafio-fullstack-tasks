import { useSession } from "../../hooks/useSession";
import { useNavigate } from "react-router-dom";
import useTasks from "../../hooks/useTasks";
import { useState } from "react";
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
  const { user } = useSession();
  const { createTask, deleteTask, updateTask } = useTasks();
  const navigate = useNavigate();

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
    if (res.status !== 200) {
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
      if (res.status !== 201) {
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
          <form onSubmit={(e) => handleSubmit(e)}>
            <Input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <Input
              type="text"
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              type="submit"
              variant="text"
              disabled={title === targetEditTask?.title && description === targetEditTask.description}
            >
              {modalType === "create" ? "Criar" : "Salvar"}
            </Button>
          </form>
        </Modal>
      )}
      <Section>
        <div id="title">
          <h1>Bem vindo{`${user ? ", " + user.name : ""}`}! </h1>
        </div>
        <S.HomeContainer id="show-tasks-container">
          <S.TasksHeader>
            <h3>Minhas tarefas</h3>
            <S.AddTaskButton onClick={showModalCreate}>
              <S.AddTaskIcon size={20}></S.AddTaskIcon>
              Criar nova tarefa
            </S.AddTaskButton>
          </S.TasksHeader>
          <S.TaskList>
            {user?.tasks.map((task) => (
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
                  <Button onClick={() => handleDeleteTask(user.id, task.id)} variant="outline">
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
