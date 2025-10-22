import styles from "./styles.module.css";

type Props = {
  name: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  observations: string;
};

export default function ProductCard(props: Props) {
  return (
    <>
      <li className={styles.produto}>
        <div className={styles.nome}>
          <span className={styles.teste}>{props.name}</span>
        </div>
        <div className={styles.nome}>
          <span>{props.description}</span>
        </div>
        <div className={styles.nome}>
          <span>{props.purchasePrice}</span>
        </div>
        <div className={styles.nome}>
          <span>{props.salePrice}</span>
        </div>
        <div className={styles.nome}>
          <span>{props.observations}</span>
        </div>
      </li>
    </>
  );
}
