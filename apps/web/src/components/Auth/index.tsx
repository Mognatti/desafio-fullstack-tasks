import { useEffect, useState } from "react";
import { useSession } from "../../hooks/useSession";
import Section from "../Section";
import * as S from "./styles";
import Button from "../Button";
import Input from "../Input";
import Snackbar from "../Snackbar";

export default function Auth() {
  const { login, register } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [snackbar, setSnackbar] = useState<{ message: string; type: "success" | "error" } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.checkValidity();
    if (isLogin) {
      const res = await login(email, password);
      setSnackbar({ message: res.message, type: "error" });
    } else {
      const res = await register(name, email, password);
      setSnackbar({ message: res.message, type: "error" });
    }
  }

  useEffect(() => {
    if (snackbar) {
      const timer = setTimeout(() => {
        setSnackbar(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [snackbar]);

  return (
    <Section>
      <S.AuthContainer>
        <S.AuthForm onSubmit={handleSubmit}>
          <h1>{isLogin ? "Login" : "Cadastro"}</h1>
          <p>{isLogin ? "Entre com suas credenciais" : "Cadastre-se para criar uma nova conta"}</p>
          {!isLogin && (
            <Input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
          )}
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button variant="outline" type="submit">
            {isLogin ? "Entrar" : "Cadastrar"}
          </Button>

          <p>
            {isLogin ? (
              <>
                Ainda não tem uma conta? <S.changeMethod onClick={() => setIsLogin(false)}>Cadastrar</S.changeMethod>
              </>
            ) : (
              <>
                Já tem uma conta? <S.changeMethod onClick={() => setIsLogin(true)}>Entrar</S.changeMethod>
              </>
            )}
          </p>
        </S.AuthForm>
        <br />
        <S.AuthFooter>
          <p>Crie, edite e controle os seus lembretes, salvando tudo na sua conta pessoal!</p>
          <span>
            Não quer se cadastrar? Então entre com o email: <b>user@email.com</b> e senha: <b>1234</b>
          </span>
          {snackbar && <Snackbar type={snackbar.type} message={snackbar.message} />}
        </S.AuthFooter>
      </S.AuthContainer>
    </Section>
  );
}
