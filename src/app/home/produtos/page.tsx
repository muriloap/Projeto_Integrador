"use client";
import BarraDePesquisa from "@/components/BarraDePesquisa";
import ModalProduct from "@/components/ModalProduct";
import ProductList from "@/components/TableProductList";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import Product from "@/models/product";

export default function PageProdutos() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("");

  function sucesso(response: AxiosResponse) {
    setProducts(response.data as Product[]);
  }

  function falha(error: AxiosError) {
    alert(error?.message ?? "Erro ao carregar produtos");
  }

  function loadProducts() {
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

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    (product.name || "").toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <ModalProduct />

      {/* Barra de pesquisa primeiro (melhor UX) */}
      <BarraDePesquisa onSearch={setFilter} />

      {/* Lista com os produtos já filtrados */}
      <ProductList products={filteredProducts} />
    </>
  );
}
