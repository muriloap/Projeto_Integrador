import styles from "./styles.module.css";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import BuildIcon from "@mui/icons-material/Build";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Link from "next/link";

type Props = {
  quantityos: number;
  quantitys: number;
  quantityc: number;
  quantityp: number;
};

export default function Dashboard(props: Props) {
  return (
    <>
      <span className={styles.containerp}>
        <div className={styles.tabela1}>
          <Link href="/home/ordem-servico" className={styles.campos}>
            <div className={styles.serviceOrder}>
              <div className={styles.icon}>
                <AssignmentIcon sx={{ fontSize: 50 }} />
                <div className={styles.quantity}>
                  <h2>{props.quantityos}</h2>
                  <div className={styles.name}>
                    <p>Ordem de Serviço</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/home/servicos" className={styles.campos}>
            <div className={styles.services}>
              <div className={styles.icon}>
                <BuildIcon sx={{ fontSize: 50 }} />
                <div className={styles.quantity}>
                  <h2>{props.quantitys}</h2>
                  <div className={styles.name}>
                    <p>Serviços</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className={styles.tabela2}>
          <Link href="/home/clientes" className={styles.campos}>
            <div className={styles.services}>
              <div className={styles.icon}>
                <GroupIcon sx={{ fontSize: 50 }} />
                <div className={styles.quantity}>
                  <h2>{props.quantityc}</h2>
                  <div className={styles.name}>
                    <p>Clientes</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/home/produtos" className={styles.campos}>
            <div className={styles.services}>
              <div className={styles.icon}>
                <InventoryIcon sx={{ fontSize: 50 }} />
                <div className={styles.quantity}>
                  <h2>{props.quantityp}</h2>
                  <div className={styles.name}>
                    <p>Produtos</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </span>
    </>
  );
}
