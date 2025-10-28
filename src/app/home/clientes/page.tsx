'use client'
import ModalCliente from "@/components/ModalClients";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import TableClientList from "@/components/TableClientList";

export default function PageClientes() {
  const token = localStorage.getItem("token");

  const [clients, setClients] = useState([]);

  function sucesso(response: AxiosResponse) {
    setClients(response.data);
  }

  function falha(_error: AxiosError) {
    
  }

  function loadClients() {
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

  useEffect(loadClients, []);

  return (
    <>
      <div className={styles.container}>
        <ModalCliente />
        <TableClientList clients={clients}/>
      </div>
    </>
  );
}
