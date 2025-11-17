"use client";
import { useState } from "react";
import BuildIcon from "@mui/icons-material/Build";
import styles from "./styles.module.css";
import Divisao from "../Divisao";
import TxtField from "../TxtField";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Alert } from "react-bootstrap";
import { Build } from "@mui/icons-material";

export default function AtService() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [nameService, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [observations, setObservations] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const unmaskMoeda = (value: string): number => {
        if (!value) return 0;
        // Remove "R$ ", pontos e troca vírgula por ponto
        const numeric = value.replace(/[R$\s.]/g, "").replace(",", ".");
        return parseFloat(numeric) || 0;
    };

  const token = localStorage.getItem("token");

  function cadastroSucesso(res: AxiosResponse) {

    const mensagem = res.data?.message
    setError(null);
    setSuccess(mensagem);
    setTimeout(() => {
      handleCloseModal();
      window.location.reload();
    }, 1000);
  };

  function cadastroFalha(error: AxiosError<any>) {
    const mensagem =
      typeof error.response?.data === "string"
        ? error.response.data
        : error.response?.data?.error || "Ocorreu um erro inesperado.";

    setError(mensagem);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let mensagemAlerta = null;

  if (error) {
    mensagemAlerta = <Alert variant="danger">{error}</Alert>;
  } else if (success) {
    mensagemAlerta = <Alert variant="success">{success}</Alert>;
  }

  function cadastro() {
    const body = {
      nameService,
      description,
      price: unmaskMoeda(price),
      observations,
      isActive: true,
    };

    console.log(body);

    axios
      .post(
        "http://localhost:3000/services",
        body,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(cadastroSucesso)
      .catch(cadastroFalha);
  };

  return (
    <>
      <div className={styles.atBtnService} onClick={handleOpenModal}> 
            <Build className={styles.icon} sx={{ fontSize: 35 }} />
            <div className={styles.nameService}>
                Novo Serviço
            </div>
        </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={handleCloseModal}>
              ×
            </button>

            <h2 className={styles.modalTitle}>Novo Serviço</h2>

            <p className={styles.modalDescription}>
              Preencha os dados abaixo para adicionar um novo Serviço.
            </p>

            {mensagemAlerta}

            <div className={styles.formGroup}>

              <Divisao title="Serviço" />

              <TxtField value={nameService} label="Nome do Serviço" type="text" onChange={setName} fullWidth />
              <TxtField value={description} label="Descrição" type="text" fullWidth onChange={setDescription} multiline />
              <TxtField value={observations} label="Observações" type="text" fullWidth onChange={setObservations} multiline />

              <div className={styles.price}>
                <TxtField value={price} label="Preço do Serviço" onChange={setPrice} moeda type="text" fullWidth />
              </div>

            </div>

            <div className={styles.buttonGroup}>
              <button
                className={styles.buttonSecondary}
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
              <button className={styles.buttonPrimary} onClick={cadastro}>
                Cadastrar Serviço
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
