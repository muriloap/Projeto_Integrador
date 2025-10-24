"use client";
import BotaoNovo from "@/components/ModalOs";
import styles from "./page.module.css";
import BarraDePesquisa from "@/components/BarraDePesquisa";
import ModalProduct from "@/components/ModalProduct";
import ProductList from "@/components/TableProductList";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

export default function PageProdutos() {
  const token = localStorage.getItem("token");

  const [produtos, setProdutos] = useState([]);

  function sucesso(response: AxiosResponse) {
    setProdutos(response.data);
  }

  function falha(error: AxiosError) {
    alert(error);
  }

  function loadProdutos() {
    axios
      .get("http://localhost:3000/products", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(sucesso)
      .catch(falha);
  }

  useEffect(loadProdutos, []);

  return (
    <>
      <div className={styles.container}>
        <ModalProduct />
        <ProductList produtos={produtos} />
      </div>
      <BarraDePesquisa />
    </>
  );
}
