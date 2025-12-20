import Order from "@/models/order";
import styles from "./styles.module.css";
import Link from "next/link";

type Props = {
  osAb: number;
  osFi: number;
  mesTotal: number;
  quantityp: number;
  osAt: number;
};

export default function Dashboard(props: Props) {

  
  return (
    <>
      <div className={styles.containerp}>

        <div className={styles.tabela1}>
          <div className={styles.campos}>
            <div className={styles.serviceOrder}>
                <div className={styles.quantity}>
                  <p className={styles.name}>OS abertas</p>
                  <h2>{props.osAb}</h2>
              </div>
            </div>
          </div>

          <div className={styles.campos}>
            <div className={styles.services}>
                <div className={styles.quantity}>
                  <p className={styles.name}>OS finalizadas</p>
                  <h2>{props.osFi}</h2>
                </div>
            </div>
          </div>
        </div>

        <div className={styles.tabela2}>
          <div className={styles.campos}>
            <div className={styles.services}>
                <div className={styles.quantity}>
                  <p className={styles.name}>OS atrasadas</p>
                  <h2>{props.osAt}</h2>
                </div>
            </div>
          </div>

          <div className={styles.campos}>
            <div className={styles.services}>
                <div className={styles.quantity}>
                  <p className={styles.name}>Total mensal</p>
                  <h2>{new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(props.mesTotal)}</h2>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
