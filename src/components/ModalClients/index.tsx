"use client";
import { useState } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./styles.module.css";
import Divisao from "../Divisao";
import TxtField from "../TxtField";
import axios, { AxiosError, AxiosResponse } from "axios";
import Selection from "@/components/Selection";
import { Alert } from "react-bootstrap";


export default function ModalCliente() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const [emailCont, setEmailCont] = useState("");
    const [selection, setSelection] = useState("PJ");
    const [name, setNome] = useState("");
    const [lastName, setLastName] = useState("");
    const [document, setDocument] = useState("");
    const [stateRegistration, setStateRegistration] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [corporateReason, setCorporateReason] = useState("");
    const [cep, setCep] = useState("");
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");

    const token = localStorage.getItem("token");

    function cadastroSucesso(_res: AxiosResponse) {
        setError(null);
        setSuccess("Cliente cadastrado com sucesso!");
        setTimeout(() => {
            handleCloseModal();
            window.location.reload();
        }, 1000);
    }

    function cadastroFalha(error: AxiosError<any>) {
        setSuccess(null);
        setError(error.response?.data)
    }

    function limparCampos() {
        setNome("");
        setLastName("");
        setDocument("");
        setStateRegistration("");
        setCompanyName("");
        setCorporateReason("");
        setCep("");
        setAddress("");
        setNumber("");
        setNeighborhood("");
        setState("");
        setCity("");
        setPhone("");
        setEmailCont("");
    }

    function pfClick() {
        limparCampos();
        setSelection("PF");
    }

    function pjClick() {
        limparCampos();
        setSelection("PJ");
    }

    let mensagemAlerta = null;

    if (error) {
        mensagemAlerta = <Alert variant="danger">{error}</Alert>;
    } else if (success) {
        mensagemAlerta = <Alert variant="success">{success}</Alert>;
    }

    function cadastro() {
        const body = {
            name,
            document,
            cep,
            phone,
            email: emailCont,
            address,
            number: Number(number),
            neighborhood,
            state,
            city,
            isActive: true,
        };

        console.log(body);

        axios
            .post(
                "http://localhost:3000/clients",
                body,

                {
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                },



            )
            .then(cadastroSucesso)
            .catch(cadastroFalha);
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
                Novo Cliente
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

                        <h2 className={styles.modalTitle}>Cadastro de Clientes</h2>

                        <p className={styles.modalDescription}>
                            Preencha os dados abaixo para cadastrar um novo Cliente.
                        </p>

                        {mensagemAlerta}

                        <div className={styles.formGroup}>
                            <div className={styles.containerp}>
                                <div className={styles.sel}>
                                    <Selection
                                        variant="PF"
                                        selected={selection === "PF"}
                                        onClick={pfClick}
                                        label="Pessoa Física"
                                    />
                                    <Selection
                                        variant="PF"
                                        selected={selection === "PJ"}
                                        onClick={pjClick}
                                        label="Pessoa Juridica"
                                    />
                                </div>

                                <div className={styles.containers}>
                                    {selection === "PF" ? (
                                        <>
                                            <h1 className={styles.textModo}>
                                                PREENCHA ESSES CAMPOS PARA CLIENTE PESSOA FÍSICA
                                            </h1>
                                            <div className={styles.dadosp}>
                                                <Divisao title="Dados Pessoais" variant="default" />
                                                <TxtField
                                                    value={name}
                                                    label="Nome"
                                                    type="text"
                                                    onChange={setNome}
                                                />
                                                <TxtField
                                                    value={lastName}
                                                    label="Sobrenome"
                                                    type="text"
                                                    onChange={setLastName}
                                                />
                                                <TxtField
                                                    value={document}
                                                    label="CPF"
                                                    type="text"
                                                    onChange={setDocument}
                                                />
                                            </div>

                                            <div className={styles.end}>
                                                <Divisao title="Endereço" variant="default" />
                                                <TxtField
                                                    value={cep}
                                                    label="CEP"
                                                    type="text"
                                                    onChange={setCep}
                                                />
                                                <TxtField
                                                    value={address}
                                                    label="Endereço"
                                                    type="text"
                                                    onChange={setAddress}
                                                />
                                                <TxtField
                                                    value={number}
                                                    label="Número"
                                                    type="text"
                                                    onChange={setNumber}
                                                />
                                                <TxtField
                                                    value={neighborhood}
                                                    label="Bairro"
                                                    type="text"
                                                    onChange={setNeighborhood}
                                                />
                                                <TxtField
                                                    value={state}
                                                    label="Estado"
                                                    type="text"
                                                    onChange={setState}
                                                />
                                                <TxtField
                                                    value={city}
                                                    label="Cidade"
                                                    type="text"
                                                    onChange={setCity}
                                                />
                                            </div>

                                            <div className={styles.contato}>
                                                <Divisao title="Contato" variant="default" />
                                                <TxtField
                                                    value={phone}
                                                    label="Telefone"
                                                    type="text"
                                                    onChange={setPhone}
                                                />
                                                <TxtField
                                                    value={emailCont}
                                                    label="Email"
                                                    type="text"
                                                    onChange={setEmailCont}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h1 className={styles.textModo}>
                                                PREENCHA ESSES CAMPOS PARA CLIENTE PESSOA JURÍDICA
                                            </h1>

                                            <div className={styles.dadosp}>
                                                <Divisao title="Dados Pessoais" variant="default" />
                                                <TxtField
                                                    value={companyName}
                                                    label="Nome da Empresa"
                                                    type="text"
                                                    onChange={setCompanyName}
                                                />
                                                <TxtField
                                                    value={corporateReason}
                                                    label="Razão Social"
                                                    type="text"
                                                    onChange={setCorporateReason}
                                                />
                                                <TxtField
                                                    value={document}
                                                    label="CNPJ"
                                                    type="text"
                                                    onChange={setDocument}
                                                />
                                                <TxtField
                                                    value={stateRegistration}
                                                    label="Incrisção Estadual"
                                                    type="text"
                                                    onChange={setStateRegistration}
                                                />
                                            </div>

                                            <div className={styles.end}>
                                                <Divisao title="Endereço" variant="default" />
                                                <TxtField
                                                    value={cep}
                                                    label="CEP"
                                                    type="text"
                                                    onChange={setCep}
                                                />
                                                <TxtField
                                                    value={number}
                                                    label="Número"
                                                    type="text"
                                                    onChange={setNumber}
                                                />
                                                <TxtField
                                                    value={address}
                                                    label="Endereço"
                                                    type="text"
                                                    onChange={setAddress}
                                                />
                                                <TxtField
                                                    value={neighborhood}
                                                    label="Bairro"
                                                    type="text"
                                                    onChange={setNeighborhood}
                                                />
                                                <TxtField
                                                    value={state}
                                                    label="Estado"
                                                    type="text"
                                                    onChange={setState}
                                                />
                                                <TxtField
                                                    value={city}
                                                    label="Cidade"
                                                    type="text"
                                                    onChange={setCity}
                                                />
                                            </div>

                                            <div className={styles.contato}>
                                                <Divisao title="Contato" variant="default" />
                                                <TxtField
                                                    value={phone}
                                                    label="Telefone"
                                                    type="text"
                                                    onChange={setPhone}
                                                />
                                                <TxtField
                                                    value={emailCont}
                                                    label="Email"
                                                    type="text"
                                                    onChange={setEmailCont}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={styles.buttonGroup}>
                            <button
                                className={styles.buttonSecondary}
                                onClick={handleCloseModal}
                            >
                                Cancelar
                            </button>
                            <button
                                className={styles.buttonPrimary}
                                onClick={cadastro}
                            >
                                Cadastrar Cliente
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
