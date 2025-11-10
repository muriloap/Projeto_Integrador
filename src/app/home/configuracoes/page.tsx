'use client'
import DropDownPP from "@/components/DropDownPP";
import styles from "./page.module.css";
import DropDownPS from "@/components/DropDownPS";
import axios, { AxiosResponse } from "axios";
import User from "@/models/user";
import { useEffect, useState } from "react";

export default function PageConfig() {
  const [user, setUser] = useState<User[]>([]);

  function loadSucesso(response: AxiosResponse) {
    setUser(response.data as User[]);
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  function loadUser() {
    axios
      .get("http://localhost:3000/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(loadSucesso);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <DropDownPP label="Perfil e Preferências" />
        <DropDownPS label="Privacidade e Segurança" />
      </div>
    </>
  );
}
