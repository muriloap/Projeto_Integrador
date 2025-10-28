'use client'
import ModalOS from '@/components/ModalOs'
import styles from './page.module.css'
import BarraDePesquisa from '@/components/BarraDePesquisa'
import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';


export default function HomeOs() {

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
            <div className={styles.containerp}>
                <ModalOS/>
                <BarraDePesquisa />
            </div>
        </>
    )
}