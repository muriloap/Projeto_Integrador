"use client";
import DropDownPP from "@/components/DropDownPP";
import DropDownPS from "@/components/DropDownPS";
import styles from "./page.module.css";
import axios, { AxiosResponse } from "axios";
import User from "@/models/user";
import { useEffect, useState } from "react";
import EmDev from "@/components/EmDev";

export default function PageConfig() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Função para extrair o ID do usuário do token JWT
  function getUserIdFromToken(token: string | null): number | null {
    if (!token) return null;

    try {
      const payloadBase64 = token.split(".")[1];
      const payload = JSON.parse(atob(payloadBase64));
      console.log("Payload decodificado do token:", payload);
      return payload.id || payload.userId || payload.sub || null;
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      return null;
    }
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const userId = getUserIdFromToken(token);

  // 🔹 Função para buscar os dados do usuário logado
  function loadUser() {
    if (!token || !userId) {
      setError("Token inválido. Faça login novamente.");
      return;
    }

    axios
      .get(`http://localhost:3000/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res: AxiosResponse) => {
        setUser(res.data as User);
      })
      .catch((err) => {
        console.error("Erro ao carregar usuário:", err);
        setError("Erro ao carregar dados do usuário.");
      });
  }

  useEffect(() => {
    loadUser();
  }, []);

  if (error) {
    return (
      <div className={styles.container}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className={styles.container}>
      <DropDownPP label="Perfil e Preferências" user={user} />
      <DropDownPS label="Privacidade e Segurança" user={user} />
    </div>
  );
}
