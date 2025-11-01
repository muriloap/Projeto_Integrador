'use client'
import styles from "./styles.module.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from "react";
import TxtField from "../TxtField";
import Divisao from "../Divisao";
import axios, { AxiosError, AxiosResponse } from "axios";
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

    useEffect(() => {
        if (isModalOpen && props.client.cep) {
            const cepLimpo = props.client.cep.replace(/\D/g, "");
            if (cepLimpo.length === 8) {
                buscarCep(props.client.cep);
            }
        }
    }, [isModalOpen]);

    useEffect(() => {
        if (isModalOpen && props.client) {
            setNome(props.client.name || "");
            setLastName(props.client.lastName || "");
            setCompanyName(props.client.companyName || "");
            setCorporateReason(props.client.corporateReason || "");
            setStateRegistration(props.client.stateRegistration);
            setDocument(props.client.document || "");
            setCep(props.client.cep || "");
            setAddress(props.client.address || "");
            setNumber(props.client.number?.toString() || "");
            setNeighborhood(props.client.neighborhood || "");
            setCity(props.client.city || "");
            setState(props.client.state || "");
            setPhone(props.client.phone || "");
            setEmailCont(props.client.email || "");
            setError(null);
            setSuccess(null);
        }
    }, [isModalOpen, props.client]);

    async function buscarCep(valor: string) {
        const cepLimpo = valor.replace(/\D/g, "");

        if (cepLimpo.length !== 8) return;

        setAddress("");
        setNeighborhood("");
        setCity("");
        setState("");

        try {
            const res = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);

            if (!res.data.erro) {
                setAddress(res.data.logradouro || "");
                setNeighborhood(res.data.bairro || "");
                setCity(res.data.localidade || "");
                setState(res.data.uf || "");
            }
        } catch (err) {
            console.error("Erro ao buscar CEP:", err);
        }
    }

    function salvarSucesso(res: AxiosResponse<any>) {
        const mensagem =
            typeof res.data === "string"
                ? res.data
                : res.data?.message || res.data?.success;

        setSuccess(mensagem);

        setTimeout(() => {
            handleCloseModal();
            window.location.reload();
        }, 1000);
    };

    function salvarFalha(error: AxiosError<any>) {
        const mensagem =
            typeof error.response?.data === "string"
                ? error.response.data
                : error.response?.data?.error || "Ocorreu um erro inesperado.";

        setError(mensagem);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    function deletarSucesso(res: AxiosResponse<any>) {
        const mensagem =
            typeof res.data === "string"
                ? res.data
                : res.data?.message || res.data?.success;

        setSuccess(mensagem);

        setTimeout(() => {
            handleCloseModal();
            window.location.reload();
        }, 1000);
    };

    function deletarFalha(error: AxiosError<any>) {
        const mensagem =
            typeof error.response?.data === "string"
                ? error.response.data
                : error.response?.data?.error || "Ocorreu um erro inesperado.";

        setError(mensagem);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

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
            number,
            neighborhood,
            state,
            city,
            isActive: true,
        };

        axios
            .put(
                `http://localhost:3000/clients/${props.client.id}`,
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
                `http://localhost:3000/clients/${props.client.id}`,
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

    useEffect(() => {
        if (props.client.document) {
            if (props.client.document.length === 14) {
                setSelection("PF");
            } else if (props.client.document.length === 18) {
                setSelection("PJ");
            }
        }
    }, [props.client.document]);




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


                        <div className={styles.formGroup}>
                            <div className={styles.containerClient}>
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
                                            {mensagemAlerta}
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
                                                    cpf
                                                />
                                            </div>

                                            <div className={styles.end}>
                                                <Divisao title="Endereço" variant="default" />
                                                <TxtField
                                                    value={cep}
                                                    label="CEP"
                                                    cep
                                                    type="text"
                                                    onChange={(valor) => {
                                                        setCep(valor);

                                                        const cepLimpo = valor.replace(/\D/g, "");
                                                        if (cepLimpo.length === 8) {
                                                            buscarCep(valor);
                                                        }
                                                    }}

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
                                                    phone
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
                                            {mensagemAlerta}
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
                                                    cnpj
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
                                                    phone
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
                        className={styles.modalContentDelete}
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

                                <Alert variant="warning">Você Realmente deseja DELETAR esse Cliente?</Alert>

                            </div>

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