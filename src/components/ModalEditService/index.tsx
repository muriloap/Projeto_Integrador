"use client";
import { useState } from "react";
import { Fab } from "@mui/material";
import styles from "./styles.module.css";
import Divisao from "../Divisao";
import TxtField from "../TxtField";
import axios from "axios";
import { Alert } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";

export default function ModalEditProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [salesUnit, setsalesUnit] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [observations, setObservations] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const token = localStorage.getItem("token");

  function cadastroSucesso() {
    setError(null);
    setSuccess("Produto cadastrado com sucesso!");
  }

  function cadastroFalha(error: string) {
    setSuccess(null);
    setError("Não foi possível cadastrar o Produto!");
  }

  let mensagemAlerta = null;

  if (error) {
    mensagemAlerta = <Alert variant="danger">{error}</Alert>;
  } else if (success) {
    mensagemAlerta = <Alert variant="success">{success}</Alert>;
  }

  function cadastro() {
    const body = {
      name,
      category,
      description,
      salesUnit,
      purchasePrice: Number(purchasePrice),
      salePrice: Number(salePrice),
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
  }

  return (
    <>
      <Fab
        variant="extended"
        onClick={handleOpenModal}
        disableRipple
        disableFocusRipple
        sx={{
          padding: "20px",
          fontSize: "15px",
          gap: "10px",
          color: "black !important",
          fontWeight: "bold",
          textTransform: "none",
        }}
      >
        <EditIcon sx={{ background: "transparent" }} /> Editar
      </Fab>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={handleCloseModal}>
              ×
            </button>

            <h2 className={styles.modalTitle}>Editar Produto</h2>

            <p className={styles.modalDescription}>
              Modifique os campos abaixo para adicionar um Editar o Produto.
            </p>

            {mensagemAlerta}

            <div className={styles.formGroup}>
              <Divisao title="PRODUTO" />
              <div className={styles.dadosProduto}>
                <TxtField
                  label="Nome do Produto"
                  type="text"
                  fullWidth
                  onChange={setName}
                />
                <TxtField
                  label="Categoria"
                  type="text"
                  fullWidth
                  onChange={setCategory}
                />
                <TxtField
                  label="Descrição"
                  type="text"
                  fullWidth
                  onChange={setDescription}
                />
                <TxtField
                  label="Unidade de venda"
                  type="text"
                  fullWidth
                  onChange={setsalesUnit}
                />
                <div className={styles.ProductPrice}>
                  <div className={styles.price}>
                    <a>Preço de compra</a>
                    <TxtField
                      onChange={setPurchasePrice}
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className={styles.price}>
                    <a>Preço de venda</a>
                    <TxtField onChange={setSalePrice} type="text" fullWidth />
                  </div>
                </div>
                <TxtField
                  label="Observações"
                  type="text"
                  fullWidth
                  onChange={setObservations}
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
              <button className={styles.buttonPrimary} onClick={cadastro}>
                Cadastrar Produto
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
