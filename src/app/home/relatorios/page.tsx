'use client'
import {RequiredGroup} from "@/components/RequiredGroup";
import styles from './page.module.css'
import Dashboard from '@/components/Dashboard'
import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Order from '@/models/order';
import Product from '@/models/product';
import Service from '@/models/service';
import Client from '@/models/client';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import { Chart, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend, defaults } from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

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

    function getNextMonths(count: number) {
        const meses = [];
        const data = new Date();

        for (let i = 0; i < count; i++) {
            const mes = data.toLocaleString("pt-BR", { month: "long" });
            meses.push(mes);
            data.setMonth(data.getMonth() + 1);
        }

        return meses;
    }

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

    const filteredOrdersFaturado = order.filter((order) => {

        return (
            order.status === "Faturado"
        );

    });

    const filteredOrdersProgresso = order.filter((order) => {

        return (
            order.status === "Em Progresso"
        );

    });

    const filteredOrdersAprovado = order.filter((order) => {

        return (
            order.status === "Aprovado"
        );

    });

    const filteredOrdersMaterial = order.filter((order) => {

        return (
            order.status === "Aguardando Material"
        );

    });

    const filteredOrdersOrcamento = order.filter((order) => {

        return (
            order.status === "Em Orçamento"
        );

    });

    const labels = getNextMonths(7);

    defaults.maintainAspectRatio = true;
    defaults.responsive = true;

    ChartJS.defaults.plugins.title.display = true;
    ChartJS.defaults.plugins.title.align = "center";
    ChartJS.defaults.plugins.title.color = "black";


    return (
        <>
            <RequiredGroup allowed={["Premium", "Admin"]}>
                <div className={styles.containerp}>
                    <div className={styles.containers}>
                        <h2 className={styles.title}>Relatório de Ordens de Serviço</h2>
                        <Dashboard
                            osAb={filteredOrdersAndamento.length}
                            osFi={filteredOrdersFinalizado.length}
                            quantityp={0}
                            mesTotal={0}
                            osAt={filteredOrdersAtrasdo.length}
                        />

                        <div className={styles.graphic}>

                            <div className={styles.pizza}>

                                <h3>Ordens de Serviços emitidas</h3>

                                <Doughnut data={{
                                    labels: [
                                        "Total de Os",
                                        "Em Orçamento",
                                        "Aguardando Material",
                                        "Aprovado",
                                        "Em Progresso",
                                        "Cancelado",
                                        "Finalizado",
                                        "Faturado"],
                                    datasets: [
                                        {
                                            data: [
                                                order.length,
                                                filteredOrdersOrcamento.length,
                                                filteredOrdersMaterial.length,
                                                filteredOrdersAprovado.length,
                                                filteredOrdersProgresso.length,
                                                filteredOrdersCancelados.length,
                                                filteredOrdersFinalizado.length,
                                                filteredOrdersFaturado.length],
                                            backgroundColor: [
                                                "rgba(0, 89, 255, 0.8)",
                                                "rgb(250, 204, 21)",
                                                "rgb(251, 146, 60)",
                                                "rgb(34, 197, 94)",
                                                "rgb(59, 130, 246)",
                                                "rgb(239, 68, 68)",
                                                "rgb(21, 128, 61)",
                                                "rgb(139, 92, 246)"],
                                            borderRadius: 2,
                                        },
                                    ],
                                }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                        plugins: {
                                            legend: {
                                                display: true,
                                                position: "right",
                                                textDirection: "left",
                                                labels: {
                                                    font: {
                                                        size: 14
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>


                            <div className={styles.barra}>

                                <h3>Fluxo de Entradas</h3>

                                <Bar data={{
                                    labels: labels,
                                    datasets: [
                                        {
                                            data: [0],
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.2)',
                                                'rgba(255, 159, 64, 0.2)',
                                                'rgba(255, 205, 86, 0.2)',
                                                'rgba(75, 192, 192, 0.2)',
                                                'rgba(54, 162, 235, 0.2)',
                                                'rgba(153, 102, 255, 0.2)',
                                                'rgba(201, 203, 207, 0.2)'
                                            ],
                                            borderColor: [
                                                'rgb(255, 99, 132)',
                                                'rgb(255, 159, 64)',
                                                'rgb(255, 205, 86)',
                                                'rgb(75, 192, 192)',
                                                'rgb(54, 162, 235)',
                                                'rgb(153, 102, 255)',
                                                'rgb(201, 203, 207)'
                                            ],
                                            borderWidth: 1
                                        }
                                    ],
                                }}
                                    options={{
                                        layout: {
                                            padding: {
                                                bottom: 0
                                            },
                                        },
                                        plugins: {
                                            legend: {
                                                display: false,
                                                labels: {
                                                    font: {
                                                        size: 14
                                                    },
                                                },
                                            },
                                        },
                                    }}

                                />

                            </div>

                        </div>
                    </div>
                </div>
            </RequiredGroup>
        </>
    )
}