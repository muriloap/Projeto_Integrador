'use client'
import ModalOS from '@/components/ModalOs'
import styles from './page.module.css'
import BarraDePesquisa from '@/components/SearchBarService'
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Client from '@/models/client';
import Service from '@/models/service';
import Product from '@/models/product';


export default function HomeOs() {

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

    function loadSercieSucesso(response: AxiosResponse) {
        setService(response.data as Service[]);
    };

    function loadProductSucesso(response: AxiosResponse) {
        setProduct(response.data as Product[]);
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

     useEffect(() => {
        loadClient();
      }, []);

    function loadService() {
        axios
            .get("http://localhost:3000/services", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(loadSercieSucesso)
            .catch(loadFalha);
    };

     useEffect(() => {
        loadService();
      }, []);
      
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

     useEffect(() => {
        loadProduct();
      }, []);


    return (
        <>
            <div className={styles.containerp}>
                <ModalOS clients={clients} services={service} products={product}/>
                <BarraDePesquisa onSearch={() => { }} />
            </div>
        </>
    )
}