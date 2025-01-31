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

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useSession();
  const { createTask, deleteTask } = useTasks();
  const navigate = useNavigate();

  function handleClick() {
    setShowModal((prev) => !prev);
  }

  async function handleCreateTask(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      navigate("/login");
    } else {
      const res = await createTask(title, description, user.id);
      if (res.status !== 201) {
        console.log(res);
      } else {
        setShowModal(false);
      }
    }
  }

  async function handleDeleteTask(userId: number, taskId: number) {
    const res = await deleteTask(userId, taskId);
    console.log(res.message);
  }

  return (
    <>
      {showModal && (
        <Modal {...{ setShowModal, title: "Criar nova tarefa" }}>
          <form>
            <Input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input
              type="text"
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button onClick={(e: React.FormEvent) => handleCreateTask(e)} variant="text">
              Criar
            </Button>
          </form>
        </Modal>
      )}
      <Section>
        <div id="title">
          <h1>Bem vindo{`${user ? ", " + user.name : ""}`} </h1>
        </div>
        <S.HomeContainer id="show-tasks-container">
          <S.TasksHeader>
            <h3>Minhas tarefas</h3>
            <S.AddTaskButton onClick={handleClick}>
              <S.AddTaskIcon size={20}></S.AddTaskIcon>
              Criar nova tarefa
            </S.AddTaskButton>
          </S.TasksHeader>
          <S.TaskList>
            {user?.tasks.map(
              (task) =>
                task.status === "pendente" && (
                  <S.CardContainer key={task.id}>
                    <S.CardHeader id="card-header">
                      <S.CardTitle id="task-title">{toTitle(task.title)}</S.CardTitle>
                      <Button customStyle={{ padding: "8px" }} variant="text">
                        <S.EditTaskIcon size={16} />
                        Editar
                      </Button>
                    </S.CardHeader>
                    <S.CardBody id="card-body">
                      <p id="task-desc">{task.description}</p>
                    </S.CardBody>
                    <S.CardFooter id="card-footer">
                      <S.CardDate style={{ position: "absolute", left: "16px" }}>
                        criado em: {formatDate(task.createdAt)}
                      </S.CardDate>
                      <Button variant="outline">Concluir</Button>
                      <Button onClick={() => handleDeleteTask(user.id, task.id)} variant="outline">
                        Excluir
                      </Button>
                    </S.CardFooter>
                  </S.CardContainer>
                )
            )}
          </S.TaskList>
        </S.HomeContainer>
      </Section>
    </>
  );
}
