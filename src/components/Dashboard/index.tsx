import styles from "./styles.module.css";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import BuildIcon from "@mui/icons-material/Build";
import AssignmentIcon from "@mui/icons-material/Assignment";

type Props = {
  quantity: number;
  onClick(): void;
};

export default function Dashboard(props: Props) {
  return (
    <>
      <span className={styles.containerp}>
        <div className={styles.tabela1}>
          <div className={styles.campos} onClick={props.onClick}>
            <div className={styles.serviceOrder}>
              <div className={styles.icon}>
                <AssignmentIcon sx={{ fontSize: 50 }} />
                <div className={styles.quantity}>
                  <h2>{props.quantity} 2</h2>
                  <div className={styles.name}>
                    <p>Ordem de Serviço</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.campos} onClick={props.onClick}>
            <div className={styles.services}>
              <div className={styles.icon}>
                <AssignmentIcon sx={{ fontSize: 50 }} />
                <div className={styles.quantity}>
                  <h2>{props.quantity} 2</h2>
                  <div className={styles.name}>
                    <p>Serviços</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.tabela2}>

          <div className={styles.campos} onClick={props.onClick}>
            <div className={styles.services}>
              <div className={styles.icon}>
                <AssignmentIcon sx={{ fontSize: 50 }} />
                <div className={styles.quantity}>
                  <h2>{props.quantity} 9</h2>
                  <div className={styles.name}>
                    <p>Clientes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.campos} onClick={props.onClick}>
            <div className={styles.services}>
              <div className={styles.icon}>
                <AssignmentIcon sx={{ fontSize: 50 }} />
                <div className={styles.quantity}>
                  <h2>{props.quantity} 15</h2>
                  <div className={styles.name}>
                    <p>Produtos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </span>
    </>
  );
}
