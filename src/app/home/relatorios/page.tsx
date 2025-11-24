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

    const labels = getNextMonths(7);

    defaults.maintainAspectRatio = true;
    defaults.responsive = true;

    ChartJS.defaults.plugins.title.display = true;
    ChartJS.defaults.plugins.title.align = "center";
    ChartJS.defaults.plugins.title.color = "black";



    const dataBar = {
        labels: labels,
        datasets: [
            {
                data: [order.length],
                label: 'Fluxo de entrada',
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
        options: {
            plugins: {
                title: {
                    text: 'Custom Chart Title'
                }
            }
        }
    };

    const optionsBar = {
        plugins: {
            title: {
                text: 'Fluxo de Entrada Mensal'
            }
        }
    };




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
                            <Doughnut data={{
                                labels: ["Total de Os", "Cancelados", "Finalizadas"],
                                datasets: [
                                    {
                                        data: [order.length, filteredOrdersCancelados.length, filteredOrdersCancelados.length],
                                        backgroundColor: ["rgba(0, 89, 255, 0.8)", "rgba(255, 0, 0, 0.8)", "rgba(0, 255, 13, 0.8)"],
                                        borderRadius: 5,
                                    },
                                ],
                            }}
                                options={{
                                    plugins: {
                                        title: {
                                            display: true,
                                            align: "start",
                                            text: 'Controle de Ordem de Serviço',
                                            font: {
                                                size: 20
                                            }
                                        },

                                        legend: {
                                            display: true,
                                            position: "right",
                                            align: "end",
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

                            <Bar data={{
                                labels: labels,
                                datasets: [
                                    {
                                        data: [order.length],
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
                                        padding:{
                                            bottom: 0
                                        },
                                    },
                                    plugins: {
                                        title: {
                                            display: true,
                                            padding: 5,
                                            position: "top",
                                            text: 'Controle de Ordem de Serviço',
                                            font: {
                                                size: 20
                                            },
                                            
                                        },

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
        </>
    )
}