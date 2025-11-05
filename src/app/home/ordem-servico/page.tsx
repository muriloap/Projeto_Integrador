'use client'
import ModalOS from '@/components/ModalOs'
import styles from './page.module.css'
import BarraDePesquisa from '@/components/SearchBarService'
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Client from '@/models/client';


export default function HomeOs() {

    const [clients, setClients] = useState<Client[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [IsAlertModal, setIsAlertOpenModal] = useState(false);

    const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

    function loadSucesso(response: AxiosResponse) {
        setClients(response.data as Client[]);
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
            .get("http://localhost:3000/Clients", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(loadSucesso)
            .catch(loadFalha);
    };

     useEffect(() => {
        loadClient();
      }, []);


    return (
        <>
            <div className={styles.containerp}>
                <ModalOS clients={clients}/>
                <BarraDePesquisa onSearch={() => { }} />
            </div>
        </>
    )
}