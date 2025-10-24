import ModalEditProduct from "../ModalEditProduct";
import styles from "./styles.module.css"; 

type Props = {
  id: number;
  name: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  observations: string;
  salesUnit: string;
  category: string;
};

export default function TableProduct({
  id,
  name,
  description,
  purchasePrice,
  salePrice,
  observations,
  salesUnit,
  category,
}: Props) {
  const formatPrice = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <tr>
      <td className={styles.td}>{id}</td>
      <td className={styles.td}>{name}</td>
      <td className={styles.td}>{category}</td>
      <td className={styles.descricao}>
        <div className={styles.scrollableText}>
          {description}
        </div>
      </td>
      <td className={styles.observacoes}>
        <div className={styles.scrollableText}>
          {observations}
        </div>
      </td>
      <td className={styles.td}>{salesUnit}</td>
      <td className={styles.valor}>{formatPrice(purchasePrice)}</td>
      <td className={styles.valor}>{formatPrice(salePrice)}</td>
      <td className={styles.td}><ModalEditProduct /></td>
    </tr>
  );
}
