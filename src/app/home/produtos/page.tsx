"use client";
import styles from "./page.module.css";
import ModalProduct from "@/components/ModalProduct";
import ProductList from "@/components/TableProductList";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import Product from "@/models/product";
import { Alert } from "react-bootstrap";
import SearchBarProduct from "@/components/SearchBarProduct";

export default function PageProdutos() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [IsAlertModal, setIsAlertOpenModal] = useState(false);

  const handleAlertOpenModal = () => setIsAlertOpenModal(true);
  const handleAlertCloseModal = () => setIsAlertOpenModal(false);

  function loadSucesso(response: AxiosResponse) {
    setProducts(response.data as Product[]);
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

  function loadProducts() {
    axios
      .get("http://localhost:3000/products", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(loadSucesso)
      .catch(loadFalha);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    (product.name || "").toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <ModalProduct />

      <SearchBarProduct onSearch={setFilter}/>
      <ProductList products={filteredProducts} />

      {IsAlertModal && (
        <div className={styles.modalOverlay} onClick={handleAlertCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={handleAlertCloseModal}>
              ×
            </button>

            <h2 className={styles.modalTitle}>Nenhum Produto Cadastrado</h2>

            <p className={styles.modalDescription}>
              Você Não tem nenhum Produto cadastrado, feche o aviso e Cadastre.
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
