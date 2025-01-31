import { useSession } from "../../hooks/useSession";
import useTasks from "../../hooks/useTasks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Section from "../Section";
import Button from "../Button";
import Modal from "../Modal";
import Input from "../Input";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useSession();
  const { createTask } = useTasks();
  const navigate = useNavigate();
  console.log(user?.tasks);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  function handleClick() {
    setShowModal((prev) => !prev);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      navigate("/login");
    } else {
      const res = await createTask(title, description, user.id);
      if (res.status !== 200) {
        alert(res.message);
      } else {
        window.location.reload();
        setShowModal(false);
      }
    }
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
            <Button onClick={(e: React.FormEvent) => handleSubmit(e)}>Criar</Button>
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
            <li>
              <p id="task-title">Fazer X</p>
              <p id="task-desc">bla bla bla bla bla</p>
            </li>
            <li>
              <p id="task-title">Fazer Y</p>
              <p id="task-desc"></p>
            </li>
            <li>
              <p id="task-title">Fazer X</p>
              <p id="task-desc">bla bla bla bla bla</p>
            </li>
          </ul>
        </div>
        <Button onClick={handleClick}>Criar nova tarefa</Button>
      </Section>
    </>
  );
}
