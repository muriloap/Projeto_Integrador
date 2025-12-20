"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import Divisao from "../Divisao";
import TxtField from "../TxtField";
import SelectClientList from "../SelectClientList";
import Client from "@/models/client";
import SelectServiceList from "../SelectServiceList";
import Service from "@/models/service";
import Product from "@/models/product";
import SelectProductList from "../SelectProductList";
import axios, { AxiosError, AxiosResponse } from "axios";
import SelectStatus from "../SelectStatus";
import { Alert } from "react-bootstrap";
import AssignmentIcon from "@mui/icons-material/Assignment";

type Props = {
  clients: Client[];
  services: Service[];
  products: Product[];
  quantityos: number;
};

export default function AtOs(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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


  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const token = localStorage.getItem("token");

  function cadastroSucesso(res: AxiosResponse) {

    const mensagem = res.data?.message
    setError(null);
    setSuccess(mensagem);
    setTimeout(() => {
      handleCloseModal();
      window.location.reload();
    }, 1000);
  };

  function cadastroFalha(error: AxiosError<any>) {
    const mensagem =
      typeof error.response?.data === "string"
        ? error.response.data
        : error.response?.data?.error || "Ocorreu um erro inesperado.";

    setError(mensagem);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function cadastro() {
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
          productId: productId,
          amount: quantity,
          salePrice: 300,
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
      .then(cadastroSucesso)
      .catch(cadastroFalha);
  }

  let mensagemAlerta = null;

  if (error) {
    mensagemAlerta = <Alert variant="danger">{error}</Alert>;
  } else if (success) {
    mensagemAlerta = <Alert variant="success">{success}</Alert>;
  }

  return (
    <>

      <div className={styles.atBtnOs} onClick={handleOpenModal}>
        <AssignmentIcon className={styles.icon} sx={{ fontSize: 35 }} />
        <div className={styles.nameOs}>
          Nova Ordem de Serviço
        </div>
      </div>

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

            <h2 className={styles.modalTitle}>Nova Ordem de Serviço</h2>

            <p className={styles.modalDescription}>
              Preencha os dados abaixo para criar uma nova Ordem de Serviço.
            </p>

            {mensagemAlerta}

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
                  <SelectProductList product={props.products} onChange={setProductId} />
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
                <TxtField label="Equipamento" value={equipment} type="text" fullWidth multiline onChange={setEquipment} />
                <TxtField label="Defeito Relatados" type="text" value={defect} fullWidth multiline onChange={setDefect} />
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
                onClick={cadastro}
              >
                Criar OS
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
