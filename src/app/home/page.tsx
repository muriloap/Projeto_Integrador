'use client'
import styles from "./page.module.css";
import Dashboard from "@/components/Dashboard";
import PrivateRoute from "@/components/PrivateRouter";
import axios, { AxiosError, AxiosResponse } from "axios";
import Order from "@/models/order";
import { useEffect, useState } from "react";
import Client from "@/models/client";
import Service from "@/models/service";
import Product from "@/models/product";
import OsStatus from "@/components/OsStatus";


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
          <div className={styles.parteTop}>

            <div className={styles.dashboard}>
              <Dashboard
                quantityc={clients.length}
                quantityp={product.length}
                quantityos={order.length}
                quantitys={service.length}
              />
            </div>

            <div className={styles.osStatus}>
              {/* <OsStatus orders={order}/> */}
            </div>

          </div>
        </div>

      </PrivateRoute>
    </>
  );
}
