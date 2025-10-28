'use client'
import styles from "./styles.module.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react";
import TxtField from "../TxtField";
import Divisao from "../Divisao";
import axios from "axios";
import { Alert } from "react-bootstrap";
import Service from "@/models/service";

type Props = {
    service: Service;
}

export default function ActionService(props: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [IsDeleteModal, setIsDeleteOpenModal] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [nameService, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
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
            window.location.reload()
        }, 1000);
    }

    function salvarFalha(error: string) {
        setSuccess(null);
        setError("Não foi possível editar o Produto!");
    }

    function deletarSucesso() {
        setError(null);
        setSuccess("Serviço deletado com sucesso!");

        setTimeout(() => {
            handleDeleteCloseModal();
            window.location.reload()
        }, 1000);
    }

    function deletarFalha(error: string) {
        setSuccess(null);
        setError("Não foi possível deletar o Serviço!");
    }

    let mensagemAlerta = null;

    if (error) {
        mensagemAlerta = <Alert variant="danger">{error}</Alert>;
    } else if (success) {
        mensagemAlerta = <Alert variant="success">{success}</Alert>;
    }

    function save() {
         const body = {
            nameService,
            description,
            price: Number(price),
            observations,
            isActive: true
        };

        console.log(body);

        axios
            .put(
                `http://localhost:3000/services ${props.service.id}`,
                body,

                {
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                },



            )
            .then(salvarSucesso)
            .catch(salvarFalha);
    }

    function deletar() {

        axios
            .delete(
                `http://localhost:3000/services/ ${props.service.id}`,
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

                        <h2 className={styles.modalTitle}>Editar Serviço</h2>

                        <p className={styles.modalDescription}>
                            Modifique os campos abaixo para Editar um Serviço.
                        </p>

                        {mensagemAlerta}

                        <div className={styles.formGroup}>
                            <Divisao title="Serviço" />
                            <div className={styles.dadosProduto}>
                                <TxtField
                                    label="Nome do Serviço"
                                    value={props.service.nameService}
                                    type="text"
                                    fullWidth
                                    onChange={setName}
                                    />
                                
                                </div>
                                <TxtField
                                    label="Descrição"
                                    value={props.service.description}
                                    type="text"
                                    fullWidth
                                    onChange={setDescription}
                                    multiline
                                    />
                                
                                <TxtField
                                    label="Observações"
                                    value={props.service.observations}
                                    type="text"
                                    fullWidth
                                    onChange={setObservations}
                                    multiline
                                    />
                                <div className={styles.price}>
                                    <TxtField
                                        label="Preço do Serviço"
                                        value={props.service.price}
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
                            Selecione a opção deletar para DELETAR o Produto.
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