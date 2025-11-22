'use client'
import EmDev from '@/components/EmDev'
import styles from './page.module.css'
import Dashboard from '@/components/Dashboard'
import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Order from '@/models/order';
import Product from '@/models/product';
import Service from '@/models/service';
import Client from '@/models/client';
import GraphicPizza from '@/components/GraphicPizza';

export default function PageRelatorios() {

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

    const hoje = new Date().toISOString().split("T")[0];

    const filteredOrdersAtrasdo = order.filter((order) => {
        const dataEntrega = order.dateDelivery;

        return (
            order.status !== "Finalizado" &&
            order.status !== "Cancelado" &&
            dataEntrega < hoje
        );

    });

    const filteredOrdersAndamento = order.filter((order) => {
        const dataEntrega = order.dateDelivery;

        return (
            order.status !== "Finalizado" &&
            dataEntrega >= hoje
        );

    });

    const filteredOrdersFinalizado = order.filter((order) => {

        return (
            order.status === "Finalizado"
        );

    });

    const filteredOrdersCancelados = order.filter((order) => {

        return (
            order.status === "Cancelado"
        );

    });




    return (
        <>
            <div className={styles.containerp}>
                <div className={styles.containers}>
                    <Dashboard
                        osAb={filteredOrdersAndamento.length}
                        osFi={filteredOrdersFinalizado.length}
                        quantityp={0}
                        mesTotal={0}
                        osAt={filteredOrdersAtrasdo.length}
                    />
                    <div className={styles.graphic}>

                        <div className={styles.pizza}>
                            <GraphicPizza
                                finalizada={filteredOrdersFinalizado.length}
                                cancelados={filteredOrdersCancelados.length}
                                total={order.length} />
                        </div>

                        <div className={styles.barra}>
                            <GraphicPizza
                                finalizada={filteredOrdersFinalizado.length}
                                cancelados={filteredOrdersCancelados.length}
                                total={order.length} />

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}