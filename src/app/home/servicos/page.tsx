"use client";
import BotaoNovo from "@/components/ModalOs";
import styles from "./page.module.css";
import BarraDePesquisa from "@/components/BarraDePesquisa";
import ModalService from "@/components/ModalService";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import TableServiceList from "@/components/TableServiceList";

export default function PageServicos() {
  const token = localStorage.getItem("token");

  const [services, setServices] = useState([]);

  function sucesso(response: AxiosResponse) {
    setServices(response.data);
  }

  function falha(_error: AxiosError) {
    
  }

  function loadServices() {
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

  useEffect(loadServices, []);

  return (
    <>
      <div className={styles.containerp}>
        <ModalService/>
        <TableServiceList services={services} />
      </div>
      <BarraDePesquisa />
    </>
  );
}
