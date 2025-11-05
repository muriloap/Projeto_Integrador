"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import TxtField from "../TxtField";
import User from "@/models/user";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Alert } from "react-bootstrap";

type Props = {
  user?: User;
};

export default function DropDown(props: Props) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [document, setDocument] = useState("");
  const [stateRegistration, setStateRegistration] = useState("");
  const [corporateReason, setCorporateReason] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [site, setSite] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  function loadSucesso(response: AxiosResponse) {
    setUser(response.data as User[]);
  }

  function loadFalha(error: AxiosError<any>) {
    const mensagem =
      typeof error.response?.data === "string"
        ? error.response.data
        : error.response?.data?.error || "Ocorreu um erro inesperado.";

    setError(mensagem);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  let mensagemAlerta = null;

  if (error) {
    mensagemAlerta = <Alert variant="danger">{error}</Alert>;
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
      .catch(loadFalha);
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
          <span>Perfil e Preferências Pessoais</span>
        </button>

        <div className={`${styles.dropdownContent} ${open ? styles.open : ""}`}>
          <div className={styles.section}>
            <TxtField
              value={name}
              type="text"
              label="Nome"
              onChange={setName}
            />
          </div>

          <div className={styles.section}>
            <TxtField
              value={lastName}
              type="text"
              label="Sobrenome"
              onChange={setLastName}
            />
          </div>

          <div className={styles.section}>
            <TxtField
              value={document}
              type="text"
              label="CPF"
              onChange={setDocument}
              cpf
            />
          </div>

          <div className={styles.section}>
            <TxtField
              value={email}
              type="email"
              label="E-mail"
              onChange={setEmail}
            />
          </div>

          <div className={styles.section}>
            <TxtField
              value={companyName}
              type="text"
              label="Nome da empreza"
              onChange={setCompanyName}
            />
          </div>

          <div className={styles.section}>
            <TxtField
              value={cep}
              type="text"
              label="CEP"
              onChange={setCep}
              cep
            />
          </div>

          <div className={styles.section}>
            <TxtField
              value={address}
              type="text"
              label="Endereço"
              onChange={setAddress}
            />
          </div>

          <div className={styles.section}>
            <TxtField
              value={number}
              type="number"
              label="Número"
              onChange={setNumber}
            />
          </div>

          <div className={styles.section}>
            <TxtField
              value={neighborhood}
              type="text"
              label="Bairro"
              onChange={setNeighborhood}
            />
          </div>

          <div className={styles.section}>
            <TxtField
              value={state}
              type="text"
              label="Estado"
              onChange={setState}
            />
          </div>

          <div className={styles.section}>
            <TxtField
              value={city}
              type="text"
              label="Cidade"
              onChange={setCity}
            />
          </div>

          <div className={styles.section}>
            <TxtField
              value={phone}
              type="number"
              label="Telefone"
              onChange={setPhone}
              phone
            />
          </div>

          <div className={styles.section}>
            <TxtField
              value={site}
              type="text"
              label="Site"
              onChange={setSite}
            />
          </div>

          <div className={styles.section}>
            <TxtField
              value={email}
              type="email"
              label="E-mail"
              onChange={setEmail}
            />
          </div>

          <div className={styles.section}>
            <TxtField
              value={password}
              type="text"
              label="Senha"
              onChange={setPassword}
            />
          </div>

          <button className={styles.editButton}>Salvar e Sair</button>
        </div>
      </div>
    </div>
  );
}
