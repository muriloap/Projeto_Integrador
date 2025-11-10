"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import TxtField from "../TxtField";
import User from "@/models/user";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Alert } from "react-bootstrap";
import Divisao from "../Divisao";

type Props = {
  user?: User;
  label: string;
};

export default function DropDownPS(props: Props) {
  const [open, setOpen] = useState(false);
  const [emailCad, setEmailCad] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (props.user) {
      setEmailCad(props.user.email || "");
      setPassword("");
      setError(null);
      setSuccess(null);
    }
  }, [props.user]);

  function salvarSucesso(res: AxiosResponse<any>) {
    const mensagem =
      typeof res.data === "string"
        ? res.data
        : res.data?.message || res.data?.success || "Dados atualizados com sucesso!";
    setSuccess(mensagem);
    setError(null);
  }

  function salvarFalha(error: AxiosError<any>) {
    const mensagem =
      typeof error.response?.data === "string"
        ? error.response.data
        : error.response?.data?.error || "Ocorreu um erro inesperado.";
    setSuccess(null);
    setError(mensagem);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function save() {
    if (!props.user?.id || !token) return;

    const body = {
      email: emailCad,
      password,
    };

    console.log("Salvando alterações:", body);

    axios
      .put(`http://localhost:3000/users/${props.user.id}`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(salvarSucesso)
      .catch(salvarFalha);
  }

  let mensagemAlerta = null;
  if (error) {
    mensagemAlerta = <Alert variant="danger">{error}</Alert>;
  } else if (success) {
    mensagemAlerta = <Alert variant="success">{success}</Alert>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <button
          onClick={() => setOpen(!open)}
          className={styles.dropdownButton}
        >
          <span>{props.label}</span>
        </button>

        <div className={`${styles.dropdownContent} ${open ? styles.open : ""}`}>
          {mensagemAlerta}

          <div className={styles.cadastro}>
            <Divisao title="Cadastro" variant="default" />

            {/* Email (já preenchido do backend) */}
            <TxtField
              value={emailCad}
              label="Email"
              type="email"
              onChange={setEmailCad}
              fullWidth
            />

            {/* Campo de senha (opcional para troca) */}
            <TxtField
              value={password}
              label="Senha"
              type="password"
              onChange={setPassword}
              fullWidth
            />
          </div>

          <button onClick={save} className={styles.editButton}>
            Salvar e Sair
          </button>
        </div>
      </div>
    </div>
  );
}
