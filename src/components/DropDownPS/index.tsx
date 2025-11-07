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

export default function DropDownPP(props: Props) {
  useEffect(() => {
    if (props.user) {
      setEmailCad(props.user.email || "");
      setPassword(props.user.password || "");
      setError(null);
      setSuccess(null);
    }
  }, [props.user]);

  const [open, setOpen] = useState(false);

  const [emailCad, setEmailCad] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  function loadSucesso(response: AxiosResponse) {
    setUser(response.data as User[]);
  }

  function salvarSucesso(res: AxiosResponse<any>) {
    const mensagem =
      typeof res.data === "string"
        ? res.data
        : res.data?.message || res.data?.success;

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

  let mensagemAlerta = null;

  if (error) {
    mensagemAlerta = <Alert variant="danger">{error}</Alert>;
  } else if (success) {
    mensagemAlerta = <Alert variant="success">{success}</Alert>;
  }

  function save() {
    const body = {
      emailCad,
      password
    };

    console.log(body);

    axios
      .put(
        `http://localhost:3000/users/${props.user?.id}`,
        body,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(salvarSucesso)
      .catch(salvarFalha);
  }

  function loadUser() {
    axios
      .get("http://localhost:3000/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(loadSucesso)
  }

  useEffect(() => {
    loadUser();
  }, []);

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
          <div className={styles.cadastro}>
            <Divisao title="Cadastro" variant="default" />
            <TxtField
              value={emailCad}
              label="Email"
              type="text"
              onChange={setEmailCad}
              fullWidth
            />
            <TxtField
              value={password}
              label="Senha"
              type="password"
              onChange={setPassword}
              fullWidth
            />
          </div>

          <button onClick={save} className={styles.editButton}>Salvar e Sair</button>
        </div>
      </div>
    </div>
  );
}
