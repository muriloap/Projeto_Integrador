'use client'
import styles from "./styles.module.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react";
import TxtField from "../TxtField";
import Divisao from "../Divisao";
import axios from "axios";
import { Alert } from "react-bootstrap";
import Selection from "@/components/Selection";
import Client from "@/models/client";

type Props = {
    client: Client
}

export default function ActionClient(props: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [IsDeleteModal, setIsDeleteOpenModal] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

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

    const handleOpenModal = () => setIsModalOpen(true);
    const handleDeletOpenModal = () => setIsDeleteOpenModal(true);
    const handleDeleteCloseModal = () => setIsDeleteOpenModal(false);
    const handleCloseModal = () => setIsModalOpen(false);

    const token = localStorage.getItem("token");

    function salvarSucesso() {
        setError(null);
        setSuccess("Dados do Cliente alterado com sucesso!");

        setTimeout(() => {
            handleCloseModal();
        }, 1000);
    }

    function salvarFalha(error: string) {
        setSuccess(null);
        setError("Não foi possível editar os Dados do Cliente!");
    }

    function deletarSucesso() {
        setError(null);
        setSuccess("Cliente deletado com sucesso!");

        setTimeout(() => {
            handleDeleteCloseModal();
        }, 1000);
    }

    function deletarFalha(error: string) {
        setSuccess(null);
        setError("Não foi possível deletar o Cliente!");
    }

    let mensagemAlerta = null;

    if (error) {
        mensagemAlerta = <Alert variant="danger">{error}</Alert>;
    } else if (success) {
        mensagemAlerta = <Alert variant="success">{success}</Alert>;
    }

    function save() {
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

        axios
            .put(
                `http://localhost:3000/clients/ ${props.client.id}`,
                body,

                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(salvarSucesso)
            .catch(salvarFalha);
    }

    function deletar() {

        axios
            .delete(
                `http://localhost:3000/clients/ ${props.client.id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(deletarSucesso)
            .catch(deletarFalha);
    }

    function pfClick() {
        setSelection("PF");
    }

    function pjClick() {
        setSelection("PJ");
    }

    


    return (
        <>
            <div className={styles.containerp}>
                <div className={styles.edit}>
                    <div className={styles.icon} onClick={handleOpenModal}>
                        <EditIcon sx={{ fontSize: "auto", background: "transparent" }} />

                    </div>
                </div>
                <div className={styles.delete}>
                    <div className={styles.icon} onClick={handleDeletOpenModal}>
                        <DeleteForeverIcon className={styles.icon2} sx={{ fontSize: "auto", background: "transparent" }} />
                    </div>
                </div>
            </div>

            {isModalOpen && (
            <div className={styles.modalOverlay} onClick={handleCloseModal}>
                <div
                    className={styles.modalContent}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className={styles.modalClose} onClick={handleCloseModal}>
                        ×
                    </button>

                    <h2 className={styles.modalTitle}>Editar Clientes</h2>

                    <p className={styles.modalDescription}>
                        Preencha os dados abaixo para editar os Dados do Cliente.
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
                                                value={props.client.name}
                                                label="Nome"
                                                type="text"
                                                onChange={setNome}
                                            />
                                            <TxtField
                                                value={props.client.name}
                                                label="Sobrenome"
                                                type="text"
                                                onChange={setLastName}
                                            />
                                            <TxtField
                                                value={props.client.document}
                                                label="CPF"
                                                type="text"
                                                onChange={setDocument}
                                            />
                                        </div>

                                        <div className={styles.end}>
                                            <Divisao title="Endereço" variant="default" />
                                            <TxtField
                                                value={props.client.cep}
                                                label="CEP"
                                                type="text"
                                                onChange={setCep}
                                            />
                                            <TxtField
                                                value={props.client.address}
                                                label="Endereço"
                                                type="text"
                                                onChange={setAddress}
                                            />
                                            <TxtField
                                                value={props.client.number}
                                                label="Número"
                                                type="text"
                                                onChange={setNumber}
                                            />
                                            <TxtField
                                                value={props.client.neighborhood}
                                                label="Bairro"
                                                type="text"
                                                onChange={setNeighborhood}
                                            />
                                            <TxtField
                                                value={props.client.state}
                                                label="Estado"
                                                type="text"
                                                onChange={setState}
                                            />
                                            <TxtField
                                                value={props.client.city}
                                                label="Cidade"
                                                type="text"
                                                onChange={setCity}
                                            />
                                        </div>

                                        <div className={styles.contato}>
                                            <Divisao title="Contato" variant="default" />
                                            <TxtField
                                                value={props.client.phone}
                                                label="Telefone"
                                                type="text"
                                                onChange={setPhone}
                                            />
                                            <TxtField
                                                value={props.client.email}
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
                                                value={props.client.document}
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
                                                value={props.client.cep}
                                                label="CEP"
                                                type="text"
                                                onChange={setCep}
                                            />
                                            <TxtField
                                                value={props.client.number}
                                                label="Número"
                                                type="text"
                                                onChange={setNumber}
                                            />
                                            <TxtField
                                                value={props.client.address}
                                                label="Endereço"
                                                type="text"
                                                onChange={setAddress}
                                            />
                                            <TxtField
                                                value={props.client.neighborhood}
                                                label="Bairro"
                                                type="text"
                                                onChange={setNeighborhood}
                                            />
                                            <TxtField
                                                value={props.client.state}
                                                label="Estado"
                                                type="text"
                                                onChange={setState}
                                            />
                                            <TxtField
                                                value={props.client.city}
                                                label="Cidade"
                                                type="text"
                                                onChange={setCity}
                                            />
                                        </div>

                                        <div className={styles.contato}>
                                            <Divisao title="Contato" variant="default" />
                                            <TxtField
                                                value={props.client.phone}
                                                label="Telefone"
                                                type="text"
                                                onChange={setPhone}
                                            />
                                            <TxtField
                                                value={props.client.email}
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
                            onClick={save}
                        >
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
            )}

            {IsDeleteModal && (
                <div className={styles.modalOverlay} onClick={handleDeleteCloseModal}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.modalClose} onClick={handleDeleteCloseModal}>
                            ×
                        </button>

                        <h2 className={styles.modalTitle}>Deletar Cliente</h2>

                        <p className={styles.modalDescription}>
                            Selecione a opção deletar para DELETAR o Cliente.
                        </p>

                        {mensagemAlerta}

                        <div className={styles.formGroup}>

                            <div className={styles.dadosProduto}>

                                <Alert variant="warning">Você Realmente deseja DELETAR esse Produto?</Alert>

                            </div>

                            <div className={styles.dataEquipamento}></div>
                        </div>

                        <div className={styles.buttonGroup}>
                            <button
                                className={styles.buttonSecondary}
                                onClick={handleDeleteCloseModal}
                            >
                                NÃO
                            </button>
                            <button className={styles.buttonPrimary} onClick={deletar}>
                                SIM
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}