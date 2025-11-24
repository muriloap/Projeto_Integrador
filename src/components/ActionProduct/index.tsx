'use client'
import styles from "./styles.module.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useRef, useState } from "react";
import TxtField from "../TxtField";
import Divisao from "../Divisao";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Alert } from "react-bootstrap";
import Product from "@/models/product";

type Props = {
    product: Product
}

export default function ActionProduct(props: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [IsDeleteModal, setIsDeleteOpenModal] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [salesUnit, setsalesUnit] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [observations, setObservations] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleOpenModal = () => setIsModalOpen(true);
    const handleDeletOpenModal = () => setIsDeleteOpenModal(true);
    const handleDeleteCloseModal = () => setIsDeleteOpenModal(false);
    const handleCloseModal = () => setIsModalOpen(false);

    const modalRef = useRef<HTMLDivElement>(null);


    const unmaskMoeda = (value: string): number => {
        if (!value) return 0;
        const numeric = value.replace(/[R$\s.]/g, "").replace(",", ".");
        return parseFloat(numeric) || 0;
    };

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (isModalOpen && props.product) {

            const salePrice = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(props.product.salePrice);

            const purchasePrice = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(props.product.purchasePrice);

            setName(props.product.name || "");
            setCategory(props.product.category || "");
            setDescription(props.product.description || "");
            setsalesUnit(props.product.salesUnit || "");
            setPurchasePrice(purchasePrice);
            setSalePrice(salePrice);
            setObservations(props.product.observations || "");
            setQuantity(props.product.quantity?.toString() || "");
            setError(null);
            setSuccess(null);
        }
    }, [isModalOpen, props.product]);

    function salvarSucesso(res: AxiosResponse<any>) {
        const mensagem =
            typeof res.data === "string"
                ? res.data
                : res.data?.message || res.data?.success;


        modalRef.current?.scrollTo({ top: 0, behavior: "smooth" })
        setError(null)
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

        modalRef.current?.scrollTo({ top: 0, behavior: "smooth" })
        setSuccess(null)
        setError(mensagem);

    };

    function deletarSucesso(res: AxiosResponse<any>) {
        const mensagem =
            typeof res.data === "string"
                ? res.data
                : res.data?.message || res.data?.success;

        modalRef.current?.scrollTo({ top: 0, behavior: "smooth" })
        setError(null)
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

        modalRef.current?.scrollTo({ top: 0, behavior: "smooth" })
        setSuccess(null)
        setError(mensagem);

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
            category,
            description,
            salesUnit,
            purchasePrice: unmaskMoeda(purchasePrice),
            salePrice: unmaskMoeda(salePrice),
            observations,
            quantity
        };

        axios
            .put(
                `http://localhost:3000/products/${props.product.id}`,
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
                `http://localhost:3000/products/${props.product.id}`,
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

    console.log(error)


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
                        ref={modalRef}
                    >
                        <button className={styles.modalClose} onClick={handleCloseModal}>
                            ×
                        </button>

                        <h2 className={styles.modalTitle}>Editar Produto</h2>

                        <p className={styles.modalDescription}>
                            Modifique os campos abaixo para adicionar um Editar o Produto.
                        </p>

                        {mensagemAlerta}

                        <div className={styles.formGroup}>
                            <Divisao title="PRODUTO" />
                            <div className={styles.dadosProduto}>
                                <TxtField label="Nome do Produto" type="text" value={name} fullWidth onChange={setName} />
                                <TxtField
                                    label="Categoria"
                                    type="text"
                                    value={category}
                                    fullWidth
                                    onChange={setCategory}
                                />
                                <TxtField
                                    label="Descrição"
                                    type="text"
                                    value={description}
                                    fullWidth
                                    multiline
                                    onChange={setDescription}
                                />
                                <TxtField
                                    label="Unidade de venda"
                                    type="text"
                                    value={salesUnit}
                                    fullWidth
                                    onChange={setsalesUnit}
                                />
                                <div className={styles.ProductPrice}>
                                    <div className={styles.price}>
                                        <TxtField
                                            label="Preço de Compra"
                                            value={purchasePrice}
                                            onChange={setPurchasePrice}
                                            type="text"
                                            fullWidth
                                            moeda
                                        />
                                    </div>
                                    <div className={styles.price}>
                                        <TxtField
                                            label="Preço de Venda"
                                            value={salePrice}
                                            onChange={setSalePrice}
                                            type="text"
                                            fullWidth
                                            moeda
                                        />
                                    </div>
                                </div>

                                <TxtField value={quantity} label="Quantidade" fullWidth type="text" onChange={setQuantity} />
                                <TxtField
                                    label="Observações"
                                    type="text"
                                    value={observations}
                                    fullWidth
                                    multiline
                                    onChange={setObservations}
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
                            <button className={styles.buttonPrimary} onClick={save}>
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

                        <h2 className={styles.modalTitle}>Deletar Produto</h2>

                        <p className={styles.modalDescription}>
                            Selecione uma das opçôes abaixo.
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