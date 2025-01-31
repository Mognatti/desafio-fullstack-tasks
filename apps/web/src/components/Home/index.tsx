import Section from "../Section";
import { useSession } from "../../hooks/useSession";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const { user } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Section>
      <div id="title">
        <h1>Bem vindo, {user!.name}. </h1>
      </div>
      <div></div>
    </Section>
  );
}
