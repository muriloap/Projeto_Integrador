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
  
};

export default function DropDown(props: Props) {
  function buscarCep(valorCep: string) {
    const cep = valorCep.replace(/\D/g, "");

    if (cep.length !== 8) return;

    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => {
        if (res.data.erro) {
          setError("CEP inválido ou não encontrado!");
          return;
        }

        setAddress(res.data.logradouro || "");
        setNeighborhood(res.data.bairro || "");
        setCity(res.data.localidade || "");
        setState(res.data.uf || "");
        setError(null);
      })
      .catch(() => {
        setError("Erro ao buscar o CEP.");
      });
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [open, setOpen] = useState(false);

  const [emailCont, setEmailCont] = useState("");
  const [emailCad, setEmailCad] = useState("");
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
          <div className={styles.dadosp}>
            <Divisao title="Dados Pessoais" variant="default" />
            <TxtField
              value={name}
              label="Nome"
              type="text"
              onChange={setName}
              fullWidth
            />
            <TxtField
              value={lastName}
              label="Sobrenome"
              type="text"
              onChange={setLastName}
              fullWidth
            />
            <TxtField
              value={document}
              label="CPF"
              type="text"
              onChange={setDocument}
              cpf
              fullWidth
            />
            <TxtField
              value={companyName}
              label="Nome da Empresa"
              type="text"
              onChange={setCompanyName}
              fullWidth
            />
          </div>
          <div className={styles.end}>
            <Divisao title="Endereço" variant="default" />
            <TxtField
              value={cep}
              label="CEP"
              type="text"
              cep
              onChange={(valor) => {
                setCep(valor);
                if (valor.replace(/\D/g, "").length === 8) {
                  buscarCep(valor);
                }
              }}
              fullWidth
            />
            <TxtField
              value={address}
              label="Endereço"
              type="text"
              onChange={setAddress}
              fullWidth
            />
            <TxtField
              value={number}
              label="Número"
              type="text"
              onChange={setNumber}
              fullWidth
            />
            <TxtField
              value={neighborhood}
              label="Bairro"
              type="text"
              onChange={setNeighborhood}
              fullWidth
            />
            <TxtField
              value={state}
              label="Estado"
              type="text"
              onChange={setState}
              fullWidth
            />
            <TxtField
              value={city}
              label="Cidade"
              type="text"
              onChange={setCity}
              fullWidth
            />
          </div>

          <div className={styles.contato}>
            <Divisao title="Contato" variant="default" />
            <TxtField
              value={phone}
              label="Telefone"
              type="text"
              onChange={setPhone}
              phone
              fullWidth
            />
            <TxtField
              value={site}
              label="Site"
              type="text"
              onChange={setSite}
              fullWidth
            />
            <TxtField
              value={emailCont}
              label="Email"
              type="text"
              onChange={setEmailCont}
              fullWidth
            />
          </div>

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

          <button className={styles.editButton}>Salvar e Sair</button>
        </div>
      </div>
    </div>
  );
}
