"use client";
import { useState } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./styles.module.css";
import Divisao from "../Divisao";
import TxtField from "../TxtField";

export default function BotaoNovo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Fab
        variant="extended"
        onClick={handleOpenModal}
        disableRipple
        disableFocusRipple
        sx={{
          padding: "20px",
          fontSize: "20px",
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: "#304FFE !important",
          color: "white !important",
          fontWeight: "bold",
          textTransform: "none",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
          transition: "background-color 0.2s ease, transform 0.1s ease",
          "&:hover": {
            backgroundColor: "#1E40FF !important",
            transform: "scale(1.05)",
          },
          "&:focus": {
            backgroundColor: "#304FFE !important",
          },
          "&:active": {
            backgroundColor: "#1E3AFF !important",
            transform: "scale(0.98)",
          },
          "&:visited": {
            backgroundColor: "#304FFE !important",
          },
        }}
      >
        <AddIcon sx={{ fontSize: "20px", mr: 1, color: "white", backgroundColor: "#304FFE" }} />
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

            <h2 className={styles.modalTitle}>Nova Ordem de Serviço</h2>

            <p className={styles.modalDescription}>
              Preencha os dados abaixo para criar uma nova Ordem de Serviço.
            </p>

            <div className={styles.formGroup}>

              <select className={styles.formSelect}>
                <option value="">Selecione o Cliente</option>
                <option value="1">Cliente 1</option>
                <option value="2">Cliente 2</option>
              </select>


              <select className={styles.formSelect}>
                <option value="">Status da OS</option>
                <option value="1">Em Orçamento</option>
                <option value="2">Aguardando Material</option>
                <option value="3">Aprovado</option>
                <option value="4">Em Progresso</option>
                <option value="4">Cancelado</option>
                <option value="5">Finalizado</option>
                <option value="6">Faturado</option>
              </select>

              <div className={styles.data}>
                <a>Data da OS</a>
                <input
                  type="date"
                  className={styles.formData}
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  min="2025-01-01"
                  max="2070-12-31"
                />
              </div>

              <Divisao title="ITEMS"/>

              <select className={styles.formSelect}>
                <option value="">Selecione o Serviço</option>
                <option value="1">Cliente 1</option>
                <option value="2">Cliente 2</option>
              </select>

              <select className={styles.formSelect}>
                <option value="">Selecione o Produto</option>
                <option value="1">Cliente 1</option>
                <option value="2">Cliente 2</option>
              </select>

              <Divisao title="EQUIPAMENTO"/>

              <div className={styles.dataEquipamento}>
              <div className={styles.data}>
                <a>Data do Recebimento</a>
                <input
                  type="date"
                  className={styles.formData2}
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  min="2025-01-01"
                  max="2070-12-31"
                  />
              </div>

              <div className={styles.data}>
                <a>Data de Entrega</a>
                <input
                  type="date"
                  className={styles.formData2}
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  min="2025-01-01"
                  max="2070-12-31"
                  />
                  </div>
              </div>

              <div className={styles.dadosEquipamento}>
              <TxtField label="Equipamento" type="text"/>
              <TxtField label="Defeito Relatados" type="text"/>
              <TxtField label="Relatório Técnico" type="text"/>
              <TxtField label="Garantia" type="text"/>
              </div>

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
