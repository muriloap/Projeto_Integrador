"use client";
import BarraDePesquisa from "@/components/BarraDePesquisa";
import ModalProduct from "@/components/ModalProduct";
import ProductList from "@/components/TableProductList";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

export default function PageProdutos() {
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);

  function sucesso(response: AxiosResponse) {
    setProducts(response.data);
  }

  function falha(error: AxiosError) {
    alert(error);
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

  useEffect(loadProducts, []);

  return (
    <>
      <ModalProduct />
      <ProductList products={products} />
      <BarraDePesquisa />
    </>
  );
}
