"use client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useState } from "react";
import { Login } from "@mui/icons-material";
import axios from "axios";
import styles from "./styles.module.css";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import TxtField from "@/components/TxtField";
import Btn from "@/components/Btn";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Alert } from "react-bootstrap";

export default function Home() {
  const router = useRouter();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function entrarSucesso() {
    setError(null);
    setSuccess("Login Realizado Com Sucesso!");

    setTimeout(() => {
      router.push("/home");
    }, 1500);
  }

  function entrarFalha(error: string) {
    setSuccess(null);
    setError("Usuário ou senha inválidos!");
  }

  function entrar(): void {
    auth
      .login(email, password)
      .then(entrarSucesso)
      .catch(entrarFalha);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Evita o reload da página
    entrar();
  }

  let mensagemAlerta = null;

  if (error) {
    mensagemAlerta = <Alert variant="danger">{error}</Alert>;
  } else if (success) {
    mensagemAlerta = <Alert variant="success">{success}</Alert>;
  }

  return (
    <>
      <div className={styles.containerp}>
        <div className={styles.containers}>
          <AccountCircleIcon sx={{ fontSize: 100, color: "Black" }} />

          <span className={styles.textBV}>
            Seja Bem - Vindo ao nosso sistema de Ordem de Serviço
          </span>
          <span className={styles.textLogin}>
            Faça Login ou Cadastre-se para continuar
          </span>

          {mensagemAlerta}

          <form className={styles.camposlogin} onSubmit={handleSubmit}>
            <TxtField label="Email" type="email" onChange={setEmail} />
            <TxtField label="Senha" type="password" onChange={setPassword} />
            <Btn variant="primary" onClick={entrar} type='submit' label="LOGIN" />
            <Link className={styles.btn} href="/login/cadastro">
              CADASTRE - SE
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}