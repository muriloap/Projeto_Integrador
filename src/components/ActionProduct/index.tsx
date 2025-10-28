'use client'
import styles from "./styles.module.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react";
import TxtField from "../TxtField";
import Divisao from "../Divisao";
import axios from "axios";
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

    const handleOpenModal = () => setIsModalOpen(true);
    const handleDeletOpenModal = () => setIsDeleteOpenModal(true);
    const handleDeleteCloseModal = () => setIsDeleteOpenModal(false);
    const handleCloseModal = () => setIsModalOpen(false);

    const token = localStorage.getItem("token");

    function salvarSucesso() {
        setError(null);
        setSuccess("Produto alterado com sucesso!");

        setTimeout(() => {
            handleCloseModal();
            window.location.reload();
        }, 1000);
    }

    function salvarFalha(error: string) {
        setSuccess(null);
        setError("Não foi possível editar o Produto!");
    }

    function deletarSucesso() {
        setError(null);
        setSuccess("Produto deletado com sucesso!");

        setTimeout(() => {
            handleDeleteCloseModal();
            window.location.reload();
        }, 1000);
    }

    function deletarFalha(error: string) {
        setSuccess(null);
        setError("Não foi possível deletar o Produto!");
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
            category,
            description,
            salesUnit,
            purchasePrice: Number(purchasePrice),
            salePrice: Number(salePrice),
            observations,
            isActive: true,
        };

        axios
            .put(
                `http://localhost:3000/products/ ${props.product.id}`,
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
                `http://localhost:3000/products/ ${props.product.id}`,
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
                                <TxtField
                                    label="Nome do Produto"
                                    type="text"
                                    value={props.product.name}
                                    fullWidth
                                    onChange={setName}
                                />
                                <TxtField
                                    label="Categoria"
                                    type="text"
                                    value={props.product.category}
                                    fullWidth
                                    onChange={setCategory}
                                />
                                <TxtField
                                    label="Descrição"
                                    type="text"
                                    value={props.product.description}
                                    fullWidth
                                    multiline
                                    onChange={setDescription}
                                />
                                <TxtField
                                    label="Unidade de venda"
                                    type="text"
                                    value={props.product.salesUnit}
                                    fullWidth
                                    onChange={setsalesUnit}
                                />
                                <div className={styles.ProductPrice}>
                                    <div className={styles.price}>
                                        <TxtField
                                            label="Preço de Compra"
                                            value={props.product.purchasePrice}
                                            onChange={setPurchasePrice}
                                            type="text"
                                            fullWidth
                                        />
                                    </div>
                                    <div className={styles.price}>
                                        <TxtField
                                            label="Preço de Venda"
                                            value={props.product.salePrice}
                                            onChange={setSalePrice}
                                            type="text"
                                            fullWidth
                                        />
                                    </div>
                                </div>
                                <TxtField
                                    label="Observações"
                                    type="text"
                                    value={props.product.observations}
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