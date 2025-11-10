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
  function getUserIdFromToken(token: string | null): number | null {
    if (!token) return null;

    try {
      const payloadBase64 = token.split(".")[1];
      const payload = JSON.parse(atob(payloadBase64));
      console.log("🧩 Payload decodificado do token:", payload);
      return payload.id || payload.userId || payload.sub || null;
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      return null;
    }
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [email, setEmail] = useState("");
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

  function loadSucesso(response: AxiosResponse) {
    const data = response.data;

    setName(data.name || "");
    setLastName(data.lastName || "");
    setDocument(data.document || "");
    setEmail(data.email || "");
    setCompanyName(data.companyName || "");
    setPhone(data.phone || "");
    setSite(data.site || "");
    setCep(data.cep || "");
    setAddress(data.address || "");
    setNeighborhood(data.neighborhood || "");
    setCity(data.city || "");
    setState(data.state || "");
  }

  function loadFalha(error: AxiosError<any>) {
    const mensagem =
      typeof error.response?.data === "string"
        ? error.response.data
        : error.response?.data?.error || "Ocorreu um erro inesperado.";

    setError(mensagem);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function loadUser() {
    if (!token) {
      setError("Token não encontrado. Faça login novamente.");
      return;
    }

    const userId = getUserIdFromToken(token);
    if (!userId) {
      setError("ID do usuário não encontrado no token.");
      return;
    }

    axios
      .get(`http://localhost:3000/users/${userId}`, {
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

  function salvarSucesso(res: AxiosResponse<any>) {
    const mensagem =
      typeof res.data === "string"
        ? res.data
        : res.data?.message ||
          res.data?.success ||
          "Dados atualizados com sucesso!";
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
      email: email,
      lastName,
      companyName,
      document,
      cep,
      address,
      number,
      neighborhood,
      state,
      city,
      site,
      phone,
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
      {error && <Alert variant="danger">{error}</Alert>}

      <div className={styles.card}>
        <button
          onClick={() => setOpen(!open)}
          className={styles.dropdownButton}
        >
          <span>{props.label}</span>
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
              value={email}
              label="Email"
              type="text"
              onChange={setEmail}
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
