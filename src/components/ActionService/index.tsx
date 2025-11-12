"use client";
import styles from "./styles.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import TxtField from "../TxtField";
import Divisao from "../Divisao";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Alert } from "react-bootstrap";
import Service from "@/models/service";

type Props = {
  service: Service;
};

export default function ActionService(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [IsDeleteModal, setIsDeleteOpenModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [nameService, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [observations, setObservations] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleDeletOpenModal = () => setIsDeleteOpenModal(true);
  const handleDeleteCloseModal = () => setIsDeleteOpenModal(false);
  const handleCloseModal = () => setIsModalOpen(false);

  const unmaskMoeda = (value: string): number => {
        if (!value) return 0;
        // Remove "R$ ", pontos e troca vírgula por ponto
        const numeric = value.replace(/[R$\s.]/g, "").replace(",", ".");
        return parseFloat(numeric) || 0;
    };

  
  useEffect(() => {
    if (isModalOpen && props.service) {
        const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(props.service.price);
      setName(props.service.nameService || "");
      setPrice(formatted);
      setDescription(props.service.description || "");
      setObservations(props.service.observations || "");
      setError(null);
      setSuccess(null);
    }
  }, [isModalOpen, props.service]);

  const token = localStorage.getItem("token");

  function salvarSucesso(res: AxiosResponse<any>) {
    const mensagem =
      typeof res.data === "string"
        ? res.data
        : res.data?.message || res.data?.success;

    setSuccess(mensagem);
    setError(null);
    setTimeout(() => {
      handleCloseModal();
      window.location.reload();
    }, 1000);
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

  function deletarSucesso(res: AxiosResponse<any>) {
    const mensagem =
      typeof res.data === "string"
        ? res.data
        : res.data?.message || res.data?.success;

    setError(null);
    setSuccess(mensagem);
    setTimeout(() => {
      handleCloseModal();
      window.location.reload();
    }, 1000);
  }

  function deletarFalha(error: AxiosError<any>) {
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
      nameService,
      description,
      price: unmaskMoeda(price),
      observations,
      isActive: true,
    };

    console.log(body);

    axios
      .put(
        `http://localhost:3000/services/${props.service.id}`,
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

  function deletar() {
    axios
      .delete(`http://localhost:3000/services/ ${props.service.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(deletarSucesso)
      .catch(deletarFalha);
  }

  return (
    <>
      <div className={styles.containerp}>
        <div className={styles.edit}>
          <div className={styles.icon} onClick={handleOpenModal}>
            <EditIcon sx={{ fontSize: "auto", background: "transparent" }} />
          </div>
        </div>
        <div className={styles.delete}>
          <div className={styles.icon} onClick={handleDeletOpenModal}>
            <DeleteForeverIcon
              className={styles.icon2}
              sx={{ fontSize: "auto", background: "transparent" }}
            />
          </div>
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

            <h2 className={styles.modalTitle}>Editar Serviço</h2>

            <p className={styles.modalDescription}>
              Modifique os campos abaixo para Editar um Serviço.
            </p>

            {mensagemAlerta}

            <div className={styles.formGroup}>
              <Divisao title="Serviço" />
              <div className={styles.dadosProduto}>
                <TxtField
                  label="Nome do Serviço"
                  value={nameService}
                  type="text"
                  fullWidth
                  onChange={setName}
                />
              </div>
              <TxtField
                label="Descrição"
                value={description}
                type="text"
                fullWidth
                onChange={setDescription}
                multiline
              />

              <TxtField
                label="Observações"
                value={observations}
                type="text"
                fullWidth
                onChange={setObservations}
                multiline
              />
              <div className={styles.price}>
                <TxtField
                  label="Preço do Serviço"
                  value={price}
                  onChange={setPrice}
                  type="text"
                  fullWidth
                />
              </div>

              <div className={styles.dataEquipamento}></div>
            </div>

            <div className={styles.buttonGroup}>
              <button
                className={styles.buttonSecondary}
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
              <button className={styles.buttonPrimary} onClick={save}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {IsDeleteModal && (
        <div className={styles.modalOverlay} onClick={handleDeleteCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              onClick={handleDeleteCloseModal}
            >
              ×
            </button>

            <h2 className={styles.modalTitle}>Deletar Produto</h2>

            <p className={styles.modalDescription}>
              Selecione a opção deletar para DELETAR o Produto.
            </p>

            {mensagemAlerta}

            <div className={styles.formGroup}>
              <div className={styles.dadosProduto}>
                <Alert variant="warning">
                  Você Realmente deseja DELETAR esse Produto?
                </Alert>
              </div>

              <div className={styles.dataEquipamento}></div>
            </div>

            <div className={styles.buttonGroup}>
              <button
                className={styles.buttonSecondary}
                onClick={handleDeleteCloseModal}
              >
                NÃO
              </button>
              <button className={styles.buttonPrimary} onClick={deletar}>
                SIM
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
