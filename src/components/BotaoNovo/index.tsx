'use client'
import { useState } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./styles.module.css";

export default function BotaoNovo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Fab
        variant="extended"
        color="primary"
        onClick={handleOpenModal}
        sx={{
          padding: "20px",
          fontSize: "20px",
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: "#304FFE",
          color: "white",
          fontWeight: "bold",
          textTransform: "none",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
          "&:hover": {
            backgroundColor: "#1E40FF",
          },
        }}
      >
        <AddIcon
          sx={{
            fontSize: "20px",
            backgroundColor: "#304FFE",
            color: "white",
            mr: 1,
          }}
        />
        Novo
      </Fab>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={handleCloseModal}>
              ×
            </button>

            <h2 className={styles.modalTitle}>Criar Nova Ordem de Serviço</h2>

            <p className={styles.modalDescription}>
              Preencha os dados abaixo para criar uma nova ordem de serviço.
            </p>

            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Título da OS"
                className={styles.formInput}
              />
              <select className={styles.formSelect}>
                <option value="">Selecione o cliente</option>
                <option value="1">Cliente 1</option>
                <option value="2">Cliente 2</option>
              </select>
              <select className={styles.formSelect}>
                <option value="">Selecione o serviço</option>
                <option value="1">Manutenção Preventiva</option>
                <option value="2">Reparo Corretivo</option>
                <option value="3">Instalação</option>
              </select>
              <textarea
                placeholder="Descrição do serviço..."
                className={styles.formTextarea}
              />
            </div>

            <div className={styles.buttonGroup}>
              <button
                className={styles.buttonSecondary}
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
              <button
                className={styles.buttonPrimary}
                onClick={() => {
                  // Lógica para salvar a OS
                  console.log("Salvar OS");
                  handleCloseModal();
                }}
              >
                Criar OS
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
