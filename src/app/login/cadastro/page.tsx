"use client";
import Selection from "@/components/Selection";
import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

import styles from "./styles.module.css";

import Divisao from "@/components/Divisao";
import TxtField from "@/components/TxtField";
import Btn from "@/components/Btn";
import { Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function Home() {
  const [emailCont, setEmailCont] = useState("");
  const [emailCad, setEmailCad] = useState("");
  const [password, setPassword] = useState("");
  const [selection, setSelection] = useState("PJ");
  const [name, setNome] = useState("");
  const [lastName, setLastName] = useState("");
  const [document, setDocument] = useState("");
  const [stateRegistration, setStateRegistration] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [corporateReason, setCorporateReason] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [site, setSite] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  function sucesso(res: AxiosResponse<any>) {
    const mensagem =
      typeof res.data === "string"
        ? res.data
        : res.data?.success;

    setSuccess(mensagem);


    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  }
  
  function falha(error: AxiosError<any>) {
    const mensagem =
    typeof error.response?.data === "string"
    ? error.response.data
    : error.response?.data?.error || "Ocorreu um erro inesperado.";
    
    setError(mensagem);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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

  function limpaCampos() {
    setNome("");
    setLastName("");
    setDocument("");
    setStateRegistration("");
    setCompanyName("");
    setCorporateReason("");
    setCep("");
    setAddress("");
    setNumber("");
    setNeighborhood("");
    setState("");
    setCity("");
    setSite("");
    setPhone("");
    setEmailCont("");
    setEmailCad("");
    setPassword("");
  }

  function pfClick() {
    setError(null);
    setSuccess(null);
    limpaCampos();
    setSelection("PF");
  }

  function pjClick() {
    setError(null);
    setSuccess(null);
    limpaCampos();
    setSelection("PJ");
  }

  function cadastro() {
    const body = {
      name,
      lastName,
      email: emailCad,
      password,
      companyName,
      corporateReason,
      document,
      stateRegistration,
      cep,
      address,
      number: Number(number),
      neighborhood,
      state,
      city,
      phone,
      site,
    };

    axios
      .post(
        "http://localhost:3000/users",
        body,

        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(sucesso)
      .catch(falha);
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
        <div className={styles.sel}>
          <Selection
            variant="PF"
            selected={selection === "PF"}
            onClick={pfClick}
            label="Pessoa Física"
          />
          <Selection
            variant="PJ"
            selected={selection === "PJ"}
            onClick={pjClick}
            label="Pessoa Juridica"
          />
        </div>

        <div className={styles.containers}>
          {selection === "PF" ? (
            <>
              <h1 className={styles.textModo}>
                PREENCHA ESSES CAMPOS COMO PESSOA FÍSICA
              </h1>
              {mensagemAlerta}
              <div className={styles.dadosp}>
                <Divisao title="Dados Pessoais" variant="default" />
                <TxtField
                  value={name}
                  label="Nome"
                  type="text"
                  onChange={setNome}
                />
                <TxtField
                  value={lastName}
                  label="Sobrenome"
                  type="text"
                  onChange={setLastName}
                />
                <TxtField
                  value={document}
                  label="CPF"
                  type="text"
                  onChange={setDocument}
                  cpf={true}
                />
                <TxtField
                  value={companyName}
                  label="Nome da Empresa"
                  type="text"
                  onChange={setCompanyName}
                />
              </div>

              <div className={styles.end}>
                <Divisao title="Endereço" variant="default" />
                <TxtField
                  value={cep}
                  label="CEP"
                  type="text"
                  onChange={(valor) => {
                    setCep(valor);
                    if (valor.replace(/\D/g, "").length === 8) {
                      buscarCep(valor);
                    }
                  }}
                  cep
                />
                <TxtField
                  value={address}
                  label="Endereço"
                  type="text"
                  onChange={setAddress}
                />
                <TxtField
                  value={number}
                  label="Número"
                  type="text"
                  onChange={setNumber}
                />
                <TxtField
                  value={neighborhood}
                  label="Bairro"
                  type="text"
                  onChange={setNeighborhood}
                />
                <TxtField
                  value={state}
                  label="Estado"
                  type="text"
                  onChange={setState}
                />
                <TxtField
                  value={city}
                  label="Cidade"
                  type="text"
                  onChange={setCity}
                />
              </div>

              <div className={styles.contato}>
                <Divisao title="Contato" variant="default" />
                <TxtField
                  value={phone}
                  label="Telefone"
                  type="text"
                  onChange={setPhone}
                  phone={true}
                />
                <TxtField
                  value={site}
                  label="Site"
                  type="text"
                  onChange={setSite}
                />
                <TxtField
                  value={emailCont}
                  label="Email"
                  type="text"
                  onChange={setEmailCont}
                />
              </div>

              <div className={styles.cadastro}>
                <Divisao title="Cadastro" variant="default" />
                <TxtField
                  value={emailCad}
                  label="Email"
                  type="text"
                  onChange={setEmailCad}
                />
                <TxtField
                  value={password}
                  label="Senha"
                  type="password"
                  onChange={setPassword}
                />
                {/* <TxtField value={} label="Confirmar senha" type="password" onChange={setEmail} /> */}
              </div>

              <div className={styles.btn}>
                <Btn variant="outline" onClick={cadastro} label="ENVIAR" />
              </div>
            </>
          ) : (
            <>
              <h1 className={styles.textModo}>
                PREENCHA ESSES CAMPOS COMO PESSOA JURÍDICA
              </h1>
              {mensagemAlerta}

              <div className={styles.dadosp}>
                <Divisao title="Dados Pessoais" variant="default" />
                <TxtField label="Nome" type="text" onChange={setNome} />
                <TxtField
                  value={lastName}
                  label="Sobrenome"
                  type="text"
                  onChange={setLastName}
                />
                <TxtField
                  value={companyName}
                  label="Nome da Empresa"
                  type="text"
                  onChange={setCompanyName}
                />
                <TxtField
                  value={corporateReason}
                  label="Razão Social"
                  type="text"
                  onChange={setCorporateReason}
                />
                <TxtField
                  value={document}
                  label="CNPJ"
                  type="text"
                  onChange={setDocument}
                  cnpj={true}
                />
                <TxtField
                  value={stateRegistration}
                  label="Incrisção Estadual"
                  type="text"
                  onChange={setStateRegistration}
                />
              </div>

              <div className={styles.end}>
                <Divisao title="Endereço" variant="default" />
                <TxtField
                  value={cep}
                  label="CEP"
                  type="text"
                  onChange={(valor) => {
                    setCep(valor);
                    if (valor.replace(/\D/g, "").length === 8) {
                      buscarCep(valor);
                    }
                  }}
                  cep={true}
                />
                <TxtField
                  value={number}
                  label="Número"
                  type="text"
                  onChange={setNumber}
                />
                <TxtField
                  value={address}
                  label="Endereço"
                  type="text"
                  onChange={setAddress}
                />
                <TxtField
                  value={neighborhood}
                  label="Bairro"
                  type="text"
                  onChange={setNeighborhood}
                />
                <TxtField
                  value={state}
                  label="Estado"
                  type="text"
                  onChange={setState}
                />
                <TxtField
                  value={city}
                  label="Cidade"
                  type="text"
                  onChange={setCity}
                />
              </div>

              <div className={styles.contato}>
                <Divisao title="Contato" variant="default" />
                <TxtField
                  value={phone}
                  label="Telefone"
                  type="text"
                  onChange={setPhone}
                  phone={true}
                />
                <TxtField
                  value={site}
                  label="Site"
                  type="text"
                  onChange={setSite}
                />
                <TxtField
                  value={emailCont}
                  label="Email"
                  type="text"
                  onChange={setEmailCont}
                />
              </div>

              <div className={styles.cadastro}>
                <Divisao title="Cadastro " variant="default" />
                <TxtField
                  value={emailCad}
                  label="Email"
                  type="text"
                  onChange={setEmailCad}
                />
                <TxtField
                  value={password}
                  label="Senha"
                  type="password"
                  onChange={setPassword}
                />
                {/* <TxtField value={} label="Confirmar senha" type="password" onChange={setEmail} /> */}
              </div>

              <div className={styles.btn}>
                <Btn variant="outline" onClick={cadastro} label="ENVIAR" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
