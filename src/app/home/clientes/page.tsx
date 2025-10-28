"use client";
import ModalCliente from "@/components/ModalClients";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import TableClientList from "@/components/TableClientList";
import Client from "@/models/client";
import BarraDePesquisa from "@/components/BarraDePesquisa";

export default function PageProdutos() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [products, setProducts] = useState<Client[]>([]);
  const [filter, setFilter] = useState("");

  function sucesso(response: AxiosResponse) {
    setProducts(response.data as Client[]);
  }

  function falha(error: AxiosError) {
    alert(error?.message ?? "Erro ao carregar produtos");
  }

  function loadProducts() {
    axios
      .get("http://localhost:3000/clients", {
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
    (product.name || "").toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <ModalCliente />

      <BarraDePesquisa onSearch={setFilter} />

      <TableClientList clients={filteredProducts} />
    </>
  );
}
