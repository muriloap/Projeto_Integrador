"use client";
import BotaoNovo from "@/components/ModalOs";
import styles from "./page.module.css";
import BarraDePesquisa from "@/components/BarraDePesquisa";
import ModalService from "@/components/ModalService";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import TableServiceList from "@/components/TableServiceList";
import Service from "@/models/service";

export default function PageProdutos() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [products, setProducts] = useState<Service[]>([]);
  const [filter, setFilter] = useState("");

  function sucesso(response: AxiosResponse) {
    setProducts(response.data as Service[]);
  }

  function falha(error: AxiosError) {
    alert(error?.message ?? "Erro ao carregar produtos");
  }

  function loadProducts() {
    axios
      .get("http://localhost:3000/services", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(sucesso)
      .catch(falha);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    (product.nameService || "").toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <ModalService />

      <BarraDePesquisa onSearch={setFilter} />

      <TableServiceList services={filteredProducts} />
    </>
  );
}
