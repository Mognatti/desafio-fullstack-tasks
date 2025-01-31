import { useSession } from "../../hooks/useSession";
import { useNavigate } from "react-router-dom";
import useTasks from "../../hooks/useTasks";
import { useState } from "react";
import Section from "../Section";
import Button from "../Button";
import Modal from "../Modal";
import Input from "../Input";
import * as S from "./styles";

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
            <Button onClick={(e: React.FormEvent) => handleCreateTask(e)}>Criar</Button>
          </form>
        </Modal>
      )}
      <Section>
        <div id="title">
          <h1>Bem vindo{`${user ? ", " + user.name : ""}`}. </h1>
          <span>Você já completou X tarefas.</span>
        </div>
        <div id="show-tasks-container">
          <h3>Minhas Tarefas</h3>
          <ul>
            {user?.tasks.map(
              (task) =>
                task.status === "pendente" && (
                  <S.CardContainer key={task.id}>
                    <div id="card-header">
                      <p id="task-title">{task.title}</p>
                      <span>{task.status}</span>
                    </div>
                    <S.CardBody id="card-body">
                      <p id="task-desc">{task.description}</p>
                      <span>{task.createdAt}</span>
                    </S.CardBody>
                    <S.CardFooter id="card-footer">
                      <Button>Concluir</Button>
                      <Button onClick={() => handleDeleteTask(user.id, task.id)}>Excluir</Button>
                    </S.CardFooter>
                  </S.CardContainer>
                )
            )}
          </ul>
        </div>
        <Button onClick={handleClick}>Criar nova tarefa</Button>
      </Section>
    </>
  );
}
