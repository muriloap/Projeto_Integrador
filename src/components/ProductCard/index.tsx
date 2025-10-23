import ModalEditProduct from "../ModalEditProduct";
import styles from "./styles.module.css";

type Props = {
  name: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  observations: string;
  salesUnit: string;
  category: string;
};

export default function ProductCard(props: Props) {
  return (
    <li className={styles.produto}>
      
      {/* TITULOS (CABECALHO FIXO) */}
      <div className={styles.header}>
        <span className={styles.teste}>Nome do Produto</span>
        <span className={styles.teste}>Categoria</span>
        <span className={styles.teste}>Descrição do Produto</span>
        <span className={styles.teste}>Observações</span>
        <span className={styles.teste}>Unidade de Venda</span>
        <span className={styles.teste}>Preço de Compra</span>
        <span className={styles.teste}>Preço de Venda</span>
      </div>

      {/* CONTEÚDO */}
      <div className={styles.body}>
        <span className={styles.span}>{props.name}</span>
        <span className={styles.span}>{props.category}</span>
        <span className={styles.textoGrande}>{props.description}</span>
        <span className={styles.textoGrande}>{props.observations}</span>
        <span className={styles.span}>{props.salesUnit}</span>
        <span className={styles.span}>{props.purchasePrice}</span>
        <span className={styles.span}>{props.salePrice}</span>
        <span className={styles.button}>
        </span>
      </div>

    </li>
  );
}

