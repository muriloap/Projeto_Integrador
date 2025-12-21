'use client'
import styles from "./page.module.css";
import PrivateRoute from "@/components/PrivateRouter";
import axios, { AxiosError, AxiosResponse } from "axios";
import Order from "@/models/order";
import { useEffect, useState } from "react";
import Client from "@/models/client";
import Service from "@/models/service";
import Product from "@/models/product";
import AtOs from "@/components/AtOs";
import AtClient from "@/components/AtClient";
import AtProduct from "@/components/AtProduct";
import AtService from "@/components/AtService";
import Divisao from "@/components/Divisao";
import TableOsAndamentoList from "@/components/TableOsAndamentoList";
import TableOsAtrasoList from "@/components/TableOsAtrasoList";
import OsDashboard from "@/components/OsDashboard";
import ProductDashboard from "@/components/ProductDashboard";
import ClientDashboard from "@/components/ClientDashboard";
import ServiceDashboard from "@/components/ServiceDashboard";


export default function Home() {

  const [order, setOrder] = useState<Order[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [service, setService] = useState<Service[]>([]);
  const [product, setProduct] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [IsAlertModal, setIsAlertOpenModal] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  function loadClientSucesso(response: AxiosResponse) {
    setClients(response.data as Client[]);
  };

  function loadServiceSucesso(response: AxiosResponse) {
    setService(response.data as Service[]);
  };

  function loadProductSucesso(response: AxiosResponse) {
    setProduct(response.data as Product[]);
  };
  function loadOrderSucesso(response: AxiosResponse) {
    setOrder(response.data as Order[]);
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

  function loadClient() {
    axios
      .get("http://localhost:3000/clients", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(loadClientSucesso)
      .catch(loadFalha);
  };


  function loadService() {
    axios
      .get("http://localhost:3000/services", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(loadServiceSucesso)
      .catch(loadFalha);
  };


  function loadProduct() {
    axios
      .get("http://localhost:3000/products", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(loadProductSucesso)
      .catch(loadFalha);
  };


  function loadOrder() {
    axios
      .get("http://localhost:3000/orders", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(loadOrderSucesso)
      .catch(loadFalha);
  };

  useEffect(() => {
    loadOrder();
    loadClient();
    loadService();
    loadProduct();
  }, []);

  return (
    <>
      <PrivateRoute>
        <div className={styles.containerp}>
          <div className={styles.containers}>

            <div className={styles.osPt1}>

              <div className={styles.teste}>

                <a className={styles.atRapido}>Atalhos Rápidos</a>

                <div className={styles.atalhos}>


                  <div className={styles.atTop}>
                    <AtOs clients={clients} services={service} products={product} quantityos={0} />
                    <AtProduct />
                  </div>

                  <div className={styles.atDown}>
                    <AtClient />
                    <AtService />
                  </div>

                </div>

                <Divisao />
                <a className={styles.atRapido}>OS Em andamento</a>

                <TableOsAndamentoList orders={order} />
              </div>

            </div>

            <div className={styles.osPt2}>

              <div className={styles.teste}>

                <a className={styles.atRapido}>Visão Geral</a>

                <div className={styles.atalhos}>


                  <div className={styles.atTop}>
                    <OsDashboard quantityos={order.length} />
                    <ProductDashboard quantityop={product.length} />
                  </div>

                  <div className={styles.atDown}>
                    <ClientDashboard quantityc={clients.length} />
                    <ServiceDashboard quantitys={service.length} />
                  </div>

                </div>

                <Divisao />
                <a className={styles.atRapido}>OS Em Atraso</a>

                <TableOsAtrasoList orders={order} />
              </div>

            </div>




          </div>
        </div>

      </PrivateRoute>
    </>
  );
}

{/* <div className={styles.dashboard}>
  <Dashboard
    quantityc={clients.length}
    quantityp={product.length}
    quantityos={order.length}
    quantitys={service.length}
  />
</div> */}