"use client";
import { useState } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./styles.module.css";
import Divisao from "../Divisao";
import TxtField from "../TxtField";
import axios, { AxiosError } from "axios";
import { Alert } from "react-bootstrap";

export default function ModalService() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [nameService, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [observations, setObservations] = useState("");

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const token = localStorage.getItem("token");

    function cadastroSucesso() {
        setError(null);
        setSuccess("Serviço cadastrado com sucesso!");
    }

    function cadastroFalha(error: AxiosError) {
        setSuccess(null);
        console.log()
        setError("Não foi possível cadastrar o Serviço!");
    }

    let mensagemAlerta = null;

    if (error) {
        mensagemAlerta = <Alert variant="danger">{error}</Alert>;
    } else if (success) {
        mensagemAlerta = <Alert variant="success">{success}</Alert>;
    }

    function cadastro() {
        const body = {
            nameService,
            description,
            price: Number(price),
            observations,
            isActive: true
        };

        console.log(body);

        axios
            .post(
                "http://localhost:3000/services",
                body,

                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(cadastroSucesso)
            .catch(cadastroFalha);

        setTimeout(() => {
            handleCloseModal()
        }, 1500);
    }

    return (
        <>
            <Fab
                variant="extended"
                onClick={handleOpenModal}
                disableRipple
                disableFocusRipple
                sx={{
                    padding: "20px",
                    fontSize: "20px",
                    position: "fixed",
                    bottom: 24,
                    right: 24,
                    backgroundColor: "#304FFE !important",
                    color: "white !important",
                    fontWeight: "bold",
                    textTransform: "none",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                    transition: "background-color 0.2s ease, transform 0.1s ease",
                    "&:hover": {
                        backgroundColor: "#1E40FF !important",
                        transform: "scale(1.05)",
                    },
                    "&:focus": {
                        backgroundColor: "#304FFE !important",
                    },
                    "&:active": {
                        backgroundColor: "#1E3AFF !important",
                        transform: "scale(0.98)",
                    },
                    "&:visited": {
                        backgroundColor: "#304FFE !important",
                    },
                }}
            >
                <AddIcon
                    sx={{
                        fontSize: "20px",
                        mr: 1,
                        color: "white",
                        backgroundColor: "#304FFE",
                    }}
                />
                Novo
            </Fab>

            {/* Modal */}
            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.modalClose} onClick={handleCloseModal}>
                            ×
                        </button>

                        <h2 className={styles.modalTitle}>Novo Serviço</h2>

                        <p className={styles.modalDescription}>
                            Preencha os dados abaixo para adicionar um novo Serviço.
                        </p>

                        {mensagemAlerta}

                        <div className={styles.formGroup}>
                            <Divisao title="Serviço" />
                            <div className={styles.dadosProduto}>
                                <TxtField
                                    label="Nome do Serviço"
                                    type="text"
                                    fullWidth
                                    onChange={setName}
                                />
                                
                                </div>
                                <TxtField
                                    label="Descrição"
                                    type="text"
                                    fullWidth
                                    onChange={setDescription}
                                />
                                
                                <TxtField
                                    label="Observações"
                                    type="text"
                                    fullWidth
                                    onChange={setObservations}
                                />
                                <div className={styles.price}>
                                    <a>Preço do Serviço</a>
                                    <TxtField
                                        prefix="R$"
                                        formatCurrency
                                        onChange={setPrice}
                                        type="text"
                                        fullWidth
                                    />
                            </div>

                            <div className={styles.dataEquipamento}></div>
                        </div>

                        <div className={styles.buttonGroup}>
                            <button
                                className={styles.buttonSecondary}
                                onClick={handleCloseModal}
                            >
                                Cancelar
                            </button>
                            <button className={styles.buttonPrimary} onClick={cadastro}>
                                Cadastrar Serviço
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
