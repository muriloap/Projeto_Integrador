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
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import Order from "@/models/order";
import { Alert } from "react-bootstrap";

type Props = {
    clients: Client[];
    services: Service[];
    products: Product[];
    order: Order;
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
    const [productId, setProductId] = useState("");
    const [serviceId, setServiceId] = useState("");
    const [equipment, setEquipment] = useState("");
    const [defect, setDefect] = useState("");
    const [report, setReport] = useState("");
    const [guarantee, setGuarantee] = useState("");
    const [status, setStatus] = useState("");
    const [quantity, setQuantity] = useState("");

    useEffect(() => {
        if (isModalOpen && props.order) {
            setClientId(props.order.clientId?.toString() || "");
            setServiceId(props.order.serviceId?.toString() || "");
            setProductId(props.order.shops?.[0]?.productId.toString() || "");
            setEquipment(props.order.equipment || "");
            setDefect(props.order.defect || "");
            setReport(props.order.report || "");
            setGuarantee(props.order.guarantee || "");
            setStatus(props.order.status || "");
            setDateRecipt(props.order.dateRecipt || new Date().toISOString().split("T")[0]);
            setDateDelivery(props.order.dateDelivery || new Date().toISOString().split("T")[0]);
            setDateCreate(props.order.dateCreate || new Date().toISOString().split("T")[0]);
            setQuantity(props.order.shops?.[0].amount.toString() || "");
        }
    }, [isModalOpen, props.order]);

    const token = localStorage.getItem("token");

    function salvarSucesso() {

        const bodyShop = {

            orderId: props.order.id,
            productId: Number(productId),
            amount: Number(quantity),
            salePrice: 0,

        };

         axios
            .put(
                `http://localhost:3000/shops/${props.order.shops?.[0].id}`,
                bodyShop,

                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            .then(sucesso)
            .catch(salvarFalha)


    };

    function sucesso(res: AxiosResponse<any>) {
        const mensagem =
            typeof res.data === "string"
                ? res.data
                : res.data?.message || res.data?.success;

        setSuccess(mensagem);

        setTimeout(() => {
            handleCloseModal();
            window.location.reload();
        }, 1000);

    }

    function salvarFalha(error: AxiosError<any>) {
        const mensagem =
            typeof error.response?.data === "string"
                ? error.response.data
                : error.response?.data?.error || "Ocorreu um erro inesperado.";

        setError(mensagem);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

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
        };


        axios
            .put(
                `http://localhost:3000/orders/${props.order.id}`,
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

    let mensagemAlerta = null;

    if (error) {
        mensagemAlerta = <Alert variant="danger">{error}</Alert>;
    } else if (success) {
        mensagemAlerta = <Alert variant="success">{success}</Alert>;
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

                        {mensagemAlerta}

                        <div className={styles.formGroup}>



                            <div className={styles.campoItem}>
                                <div className={styles.campoSelect}>
                                    <a>Selecione um(a) Cliente:</a>
                                    <SelectClientList clients={props.clients} onChange={setClientId} value={clientId} />
                                </div>

                                <div className={styles.campoSelect}>
                                    <a>Status da Ordem de Serviço:</a>
                                    <SelectStatus value={status} onChange={setStatus} />
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
                                    <SelectServiceList service={props.services} value={serviceId} onChange={setServiceId} />
                                </div>

                                <div className={styles.campoSelect}>
                                    <a>Selecione um Produto:</a>
                                    <SelectProductList product={props.products} value={productId} onChange={setProductId} />
                                    <TxtField label="Quantidade" value={quantity} type="text" onChange={setQuantity} />
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
                                <TxtField label="Equipamento" value={equipment} type="text" fullWidth onChange={setEquipment} />
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
                                onClick={salvar}
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