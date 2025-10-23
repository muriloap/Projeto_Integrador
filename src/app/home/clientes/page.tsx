'use client'
import BarraDePesquisa from "@/components/BarraDePesquisa";
import ModalCliente from "@/components/ModalCliente";
import styles from "./page.module.css";
import ClientList from "@/components/ClientList";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

export default function PageClientes() {
  const token = localStorage.getItem("token");

  const [clients, setClients] = useState([]);

  function sucesso(response: AxiosResponse) {
    setClients(response.data);
  }

  function falha(error: AxiosError) {
    alert(error);
  }

  function loadProdutos() {
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

  useEffect(loadProdutos, []);

  return (
    <>
      <div className={styles.container}>
        <ClientList clients={clients} />
        <ModalCliente />
        <BarraDePesquisa />
      </div>
    </>
  );
}
