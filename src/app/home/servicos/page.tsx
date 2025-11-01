"use client";
import styles from "./page.module.css";
import ModalService from "@/components/ModalService";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import TableServiceList from "@/components/TableServiceList";
import Service from "@/models/service";
import { Alert } from "react-bootstrap";
import SearchBarService from "@/components/SearchBarService";

export default function PageProdutos() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [IsAlertModal, setIsAlertOpenModal] = useState(false);

  
  const handleAlertOpenModal = () => setIsAlertOpenModal(true);
  const handleAlertCloseModal = () => setIsAlertOpenModal(false);

  function loadSucesso(response: AxiosResponse) {
    setServices(response.data as Service[]);
  };

  function loadFalha(error: AxiosError<any>) {
    const mensagem =
      typeof error.response?.data === "string"
        ? error.response.data
        : error.response?.data?.error || "Ocorreu um erro inesperado.";

    setError(mensagem);
    setIsAlertOpenModal(true)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let mensagemAlerta = null;

  if (error) {
    mensagemAlerta = <Alert variant="danger">{error}</Alert>;
  };

  function loadServices() {
    axios
      .get("http://localhost:3000/services", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(loadSucesso)
      .catch(loadFalha);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const filteredServices = services.filter((services) =>
    (services.nameService || "").toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <ModalService />
      <SearchBarService onSearch={setFilter}/>
      <TableServiceList services={filteredServices} />

      {IsAlertModal && (
        <div className={styles.modalOverlay} onClick={handleAlertCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={handleAlertCloseModal}>
              ×
            </button>

            <h2 className={styles.modalTitle}>Nenhum Serviço Cadastrado</h2>

            <p className={styles.modalDescription}>
              Você Não tem nenhum serviço cadastrado, feche o aviso e Cadastre.
            </p>

            <div className={styles.alert}>
            {mensagemAlerta}
            </div>

            <div className={styles.buttonGroup}>
          
              <button className={styles.buttonPrimary} onClick={handleAlertCloseModal}>
                FECHAR
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
