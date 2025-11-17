"use client";
import { useState } from "react";
import InventoryIcon from "@mui/icons-material/Inventory";
import styles from "./styles.module.css";
import Divisao from "../Divisao";
import TxtField from "../TxtField";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Alert } from "react-bootstrap";

export default function AtProduct() {
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
  const [quantity, setQuantity] = useState("");

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
      name,
      category,
      description,
      salesUnit,
      purchasePrice: unmaskMoeda(purchasePrice),
      salePrice: unmaskMoeda(salePrice),
      observations,
      quantity
    };

    console.log(body);

    axios
      .post(
        "http://localhost:3000/products",
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
      <div className={styles.atBtnProduct} onClick={handleOpenModal}> 
            <InventoryIcon className={styles.icon} sx={{ fontSize: 35 }} />
            <div className={styles.nameProduct}>
                Novo Produto
            </div>
        </div>

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

            <h2 className={styles.modalTitle}>Novo Produto</h2>

            <p className={styles.modalDescription}>
              Preencha os dados abaixo para adicionar um novo Produto.
            </p>

            {mensagemAlerta}

            <div className={styles.formGroup}>

              <Divisao title="PRODUTO" />

              <div className={styles.dadosProduto}>
                <TxtField value={name} label="Nome do Produto" type="text" fullWidth onChange={setName} />
                <TxtField value={category} label="Categoria" type="text" fullWidth onChange={setCategory} />
                <TxtField value={description} label="Descrição" type="text" fullWidth onChange={setDescription} multiline />
                <TxtField value={salesUnit} label="Unidade de venda" type="text" fullWidth onChange={setsalesUnit} />

                <div className={styles.ProductPrice}>
                  <div className={styles.price}>

                    <TxtField value={purchasePrice} label="Preço de Compra" onChange={setPurchasePrice} moeda type="text" fullWidth />
                  </div>

                  <div className={styles.price}>

                    <TxtField value={salePrice} label="Preço de Venda" onChange={setSalePrice} moeda type="text" fullWidth />

                  </div>
                </div>

                <TxtField value={quantity} label="Quantidade" type="text" onChange={setQuantity}/>
                <TxtField value={observations} label="Observações" type="text" fullWidth onChange={setObservations} multiline />

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
