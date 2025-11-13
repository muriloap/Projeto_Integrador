import Order from "@/models/order";
import Divisao from "../Divisao";
import styles from "./styles.module.css";

type Props = {
    orders: Order[];
};

export default function (props: Props) {

    const statusCount = {
        "Em Orçamento": props.orders.filter(orders => orders.status === "Em Orçamento").length,
        "Aprovado": props.orders.filter(orders => orders.status === "Aprovado").length,
        "Faturado": props.orders.filter(orders => orders.status === "Faturado").length,
        "Aguardando Material": props.orders.filter(orders => orders.status === "Aguardando Material").length,
        "Em Progresso": props.orders.filter(orders => orders.status === "Em Progresso").length,
        "Finalizado": props.orders.filter(orders => orders.status === "Finalizado").length,
        "Cancelado": props.orders.filter(orders => orders.status === "Cancelado").length,
    };


    return (
        <>
            <div className={styles.containerp}>

                <div className={styles.title}>
                    <span className={styles.campoStatus2}>Ordem de Serviço por Status</span>
                </div>

                <Divisao />

                <div className={styles.containers}>

                    <div className={styles.campoStatus}>
                        <span className={styles.corEO} />
                        <span className={styles.number}>{statusCount["Em Orçamento"]}</span>
                        <span className={styles.status}>Em Orçamento</span>
                    </div>

                    <div className={styles.campoStatus}>
                        <span className={styles.corAP} />
                        <span className={styles.number}>{statusCount["Aprovado"]}</span>
                        <span className={styles.status}>Aprovado</span>
                    </div>

                    <div className={styles.campoStatus}>
                        <span className={styles.corFA} />
                        <span className={styles.number}>{statusCount["Faturado"]}</span>
                        <span className={styles.status}>Faturado</span>
                    </div>

                    <div className={styles.campoStatus}>
                        <span className={styles.corAM} />
                        <span className={styles.number}>{statusCount["Aguardando Material"]}</span>
                        <span className={styles.status}>Aguardando Material</span>
                    </div>

                    <div className={styles.campoStatus}>
                        <span className={styles.corEP} />
                        <span className={styles.number}>{statusCount["Em Progresso"]}</span>
                        <span className={styles.status}>Em Progresso</span>
                    </div>

                    <div className={styles.campoStatus}>
                        <span className={styles.corFI} />
                        <span className={styles.number}>{statusCount["Finalizado"]}</span>
                        <span className={styles.status}>Finalizado</span>
                    </div>

                    <div className={styles.campoStatus}>
                        <span className={styles.corCA} />
                        <span className={styles.number}>{statusCount["Cancelado"]}</span>
                        <span className={styles.status}>Cancelado</span>
                    </div>

                </div>
            </div>

        </>
    )
}