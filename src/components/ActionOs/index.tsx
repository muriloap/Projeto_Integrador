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
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import User from "@/models/user";

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

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [document, setDocument] = useState("");
    const [stateRegistration, setStateRegistration] = useState("");
    const [corporateReason, setCorporateReason] = useState("");
    const [cep, setCep] = useState("");
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [site, setSite] = useState("");
    const [phone, setPhone] = useState("");

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

    function loadUser() {
        if (!token) {
            setError("Token não encontrado. Faça login novamente.");
            return;
        }

        const userId = getUserIdFromToken(token);
        if (!userId) {
            setError("ID do usuário não encontrado no token.");
            return;
        }

        axios
            .get(`http://localhost:3000/users/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(loadSucesso)
            .catch(loadFalha);
    }

    useEffect(() => {
        loadUser();
    }, []);

    function gerarPdf() {


        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        const imgPath = "/images/oslogo.png";
        const imgWidth = 31; 
        const imgHeight = 31;
        const imgX = 8;
        const imgY = 7;

        
        const pageWidth = doc.internal.pageSize.getWidth();
        
        const alignRight = (text: string, y: number) => {
            const textWidth = doc.getTextWidth(text);
            doc.text(text, pageWidth - textWidth - marginRight, y);
        };
        
        const marginRight = 10;
        
        let nome = ""
        
        if (props.order.client?.document.length === 14) {
            nome = `${props.order.client.name} ${props.order.client.lastName}`
        }
        else if (props.order.client?.document.length === 18) {
            nome = props.order.client.companyName
        }
        
        const total = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(props.order.total)

        const totalProducts = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(props.order.totalProducts)
        
        const totalService = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(props.order.totalService)
        
        const Vls = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(props.order.service?.price || 0)
        
        const Vlp = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(props.order.shops?.[0].product?.salePrice || 0)

        const addressText = `${address}, ${number}, ${neighborhood}`;

        const addressLines = doc.splitTextToSize(addressText, 150);

        
        doc.addImage(imgPath, "PNG", imgX, imgY, imgWidth, imgHeight);
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text(companyName, 40, 15);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(addressLines, 40, 20);
        doc.text(`${city} - ${state} ${cep}`, 40, 25);
        doc.text(`${phone} | ${email}`, 40, 30);

        // Dados da OS à direita
        doc.setFont("helvetica", "bold");
        doc.text(`Número da OS:`, pageWidth - 57, 20);
        alignRight(`# ${props.order.id}`, 20);
        doc.setFont("helvetica", "normal");
        doc.text(`Data: `, pageWidth - 57, 25);
        alignRight(`${new Date(props.order.dateCreate).toLocaleDateString("pt-BR")}`, 25);
        doc.text(`Status: `, pageWidth - 57, 30);
        alignRight(`${props.order.status}`, 30);

        // Linha divisória
        doc.line(10, 35, pageWidth - 10, 35);

        // --- Título principal ---
        doc.setFontSize(13);
        doc.setFont("helvetica", "bold");
        doc.text("Ordem de Serviço", pageWidth / 2, 45, { align: "center" });

        // --- Cliente ---
        autoTable(doc, {
            startY: 50,
            styles: { fontSize: 10, cellPadding: 3 },
            head: [["Dados do Cliente"]],
            body: [
                ["Cliente: " + `${nome}`],
                ["Telefone: " + `${props.order.client?.phone}`],
                ["Endereço: " + `${props.order.client?.address}, ${props.order.client?.number}, ${props.order.client?.neighborhood}, ${props.order.client?.city} - ${props.order.client?.state}`],
            ],
        });

        // --- Equipamento ---
        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 10,
            styles: { fontSize: 10 },
            head: [["Equipamento"]],
            body: [
                ["Equipamento: " + `${props.order.equipment}`],
                ["Defeito Relatado: " + `${props.order.defect}`],
            ],
        });

        // --- Relatório Técnico ---
        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 10,
            styles: { fontSize: 10 },
            head: [["Relatório Técnico"]],
            body: [
                [
                    `${props.order.report}`,
                ],
            ],
        });


        // --- Serviços ---
        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 10,
            styles: { fontSize: 10 },
            head: [["Serviços Prestados", "Quantidade", "Vl. Unitário", "Vl. Total"]],
            body: [
                [`${props.order.service?.nameService}`, "1", `   ${Vls}`, `${totalService}`],
            ],
        });

        // --- Produtos ---
        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 10,
            styles: { fontSize: 10 },
            head: [["Produtos", " Quantidade", "Vl. Unitário", "Vl. Total"]],
            body: [
                [`${props.order.shops?.[0].product?.name}`, `${props.order.shops?.[0].amount}`, `${Vlp}`, `${totalProducts}`],
            ],
        });

        // --- Garantia ---
        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 10,
            styles: { fontSize: 10 },
            body: [
                [
                    `Garantia: ${props.order.guarantee}`
                ],
            ],
        });

        // --- Totais ---
        const yTotal = (doc as any).lastAutoTable.finalY + 10;
        doc.setFontSize(11);
        alignRight(`SubTotal:`, yTotal - 1);
        alignRight(`Serviços: ${totalService}`, yTotal + 11);
        alignRight(`Produtos: ${totalProducts}`, yTotal + 6);
        doc.setFont("helvetica", "bold");
        alignRight(`Total: ${total}`, yTotal + 20);

        // --- Assinaturas ---
        const ySign = yTotal + 40;
        doc.line(40, ySign, 90, ySign);
        doc.text("Assinatura do Cliente", 45, ySign + 5);

        doc.line(pageWidth - 90, ySign, pageWidth - 40, ySign);
        doc.text("Assinatura do Técnico", pageWidth - 85, ySign + 5);



        // 💡 Aqui vem a mágica:
        const blob = doc.output("blob");
        const url = URL.createObjectURL(blob);

        // Abre em uma nova aba
        window.open(url);

        // doc.save(`OS_${props.order.id}_${props.order.client?.name}`)

    }

    function getUserIdFromToken(token: string | null): number | null {
        if (!token) return null;

        try {
            const payloadBase64 = token.split(".")[1];
            const payload = JSON.parse(atob(payloadBase64));
            console.log("🧩 Payload decodificado do token:", payload);
            return payload.id || payload.userId || payload.sub || null;
        } catch (error) {
            console.error("Erro ao decodificar token:", error);
            return null;
        }
    }

    function loadSucesso(response: AxiosResponse) {
        const data = response.data;

        setName(data.name || "");
        setLastName(data.lastName || "");
        setDocument(data.document || "");
        setEmail(data.email || "");
        setCompanyName(data.companyName || "");
        setPhone(data.phone || "");
        setSite(data.site || "");
        setCep(data.cep || "");
        setAddress(data.address || "");
        setNumber(data.number || "");
        setNeighborhood(data.neighborhood || "");
        setCity(data.city || "");
        setState(data.state || "");
    }

    function loadFalha(error: AxiosError<any>) {
        const mensagem =
            typeof error.response?.data === "string"
                ? error.response.data
                : error.response?.data?.error || "Ocorreu um erro inesperado.";

        setError(mensagem);
        window.scrollTo({ top: 0, behavior: "smooth" });
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
                <div className={styles.icon} onClick={gerarPdf}>
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
                                <TxtField label="Defeito Relatados" type="text" value={defect} fullWidth multiline onChange={setDefect} />
                                <TxtField label="Relatório Técnico" type="text" value={report} fullWidth multiline onChange={setReport} />
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