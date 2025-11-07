import EditIcon from "@mui/icons-material/Edit";
import { PictureAsPdf } from "@mui/icons-material";
import styles from './styles.module.css'
import Client from "@/models/client";
import Service from "@/models/service";
import Product from "@/models/product";
import TxtField from "../TxtField";
import Divisao from "../Divisao";
import SelectProductList from "../SelectProductList";
import SelectServiceList from "../SelectServiceList";
import SelectStatus from "../SelectStatus";
import SelectClientList from "../SelectClientList";
import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import Order from "@/models/order";

type Props = {
    clients: Client[];
    services: Service[];
    products: Product[];
    orders: Order[];
};

export default function ActionOs(props: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const [dateCreate, setDateCreate] = useState(new Date().toISOString().split("T")[0]);
    const [dateRecipt, setDateRecipt] = useState(new Date().toISOString().split("T")[0]);
    const [dateDelivery, setDateDelivery] = useState(new Date().toISOString().split("T")[0]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [clientId, setClientId] = useState("");
    const [productData, setProductData] = useState<{ productId: string; quantity: string, salePrice: number }>({ productId: "", quantity: "", salePrice: 0 });
    const [serviceId, setServiceId] = useState("");
    const [equipment, setEquiment] = useState("");
    const [defect, setDefect] = useState("");
    const [report, setReport] = useState("");
    const [guarantee, setGuarantee] = useState("");
    const [status, setStatus] = useState("");

    const token = localStorage.getItem("token");

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

    function teste() {
        alert("teste")
    }

    function salvar() {
        const body = {
            clientId,
            serviceId,
            equipment,
            defect,
            report,
            guarantee,
            dateCreate,
            dateRecipt,
            dateDelivery,
            status,
            products: [
                {
                    productId: productData.productId,
                    amount: productData.quantity,
                    salePrice: productData.salePrice,
                }
            ]
        };

        console.log(body);

        axios
            .post(
                "http://localhost:3000/orders",
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

    return (
        <>

            <div className={styles.actions}>
                <div className={styles.icon} onClick={handleOpenModal}>
                    <EditIcon sx={{ fontSize: "auto", background: "transparent" }} />
                </div>
                <div className={styles.icon}>
                    <PictureAsPdf sx={{ fontSize: "auto", background: "transparent" }} />
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

                        <h2 className={styles.modalTitle}>Editar Ordem de Serviço</h2>

                        <p className={styles.modalDescription}>
                            Preencha os dados abaixo para editar uma Ordem de Serviço.
                        </p>

                        <div className={styles.formGroup}>



                            <div className={styles.campoItem}>
                                <div className={styles.campoSelect}>
                                    <a>Selecione um(a) Cliente:</a>
                                    <SelectClientList clients={props.clients} onChange={setClientId} />
                                </div>

                                <div className={styles.campoSelect}>
                                    <a>Status da Ordem de Serviço:</a>
                                    <SelectStatus onChange={setStatus} />
                                </div>

                            </div>



                            <div className={styles.data}>
                                <a>Data da OS</a>
                                <input
                                    type="date"
                                    className={styles.formData}
                                    value={dateCreate}
                                    onChange={(e) => setDateCreate(e.target.value)}
                                    min="2025-01-01"
                                    max="2070-12-31"
                                />
                            </div>

                            <Divisao title="ITEMS" />

                            <div className={styles.campoItem}>
                                <div className={styles.campoSelect}>
                                    <a>Selecione um Serviço:</a>
                                    <SelectServiceList service={props.services} onChange={setServiceId} />
                                </div>

                                <div className={styles.campoSelect}>
                                    <a>Selecione um Produto:</a>
                                    <SelectProductList product={props.products} onChange={setProductData} />
                                </div>
                            </div>


                            <Divisao title="EQUIPAMENTO" />

                            <div className={styles.dataEquipamento}>
                                <div className={styles.data}>
                                    <a>Data do Recebimento</a>
                                    <input
                                        type="date"
                                        className={styles.formData2}
                                        value={dateRecipt}
                                        onChange={(e) => setDateRecipt(e.target.value)}
                                        min="2025-01-01"
                                        max="2070-12-31"
                                    />
                                </div>

                                <div className={styles.data}>
                                    <a>Data de Entrega</a>
                                    <input
                                        type="date"
                                        className={styles.formData2}
                                        value={dateDelivery}
                                        onChange={(e) => setDateDelivery(e.target.value)}
                                        min="2025-01-01"
                                        max="2070-12-31"
                                    />
                                </div>
                            </div>

                            <div className={styles.dadosEquipamento}>
                                <TxtField label="Equipamento" value={equipment} type="text" fullWidth onChange={setEquiment} />
                                <TxtField label="Defeito Relatados" type="text" value={defect} fullWidth onChange={setDefect} />
                                <TxtField label="Relatório Técnico" type="text" value={report} fullWidth onChange={setReport} />
                                <TxtField label="Garantia" type="text" value={guarantee} fullWidth onChange={setGuarantee} />
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
                                onClick={teste}
                            >
                                Salvar OS
                            </button>
                        </div>


                    </div>
                </div>
            )}
        </>
    )
}