import Action from "../ActionProduct";
import ModalEditProduct from "../ModalEditProduct";
import styles from "./styles.module.css";

type Props = {
  name: string;
  purchasePrice: number;
  salePrice: number;
  salesUnit: string;
};

export default function TableProduct({
  name,
  purchasePrice,
  salePrice,
  salesUnit,
}: Props) {
  const formatPrice = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <tr>
      <td className={styles.td}>{name}</td>
      <td className={styles.valor}>{formatPrice(purchasePrice)}</td>
      <td className={styles.valor}>{formatPrice(salePrice)}</td>
      <td className={styles.valor}><Action/></td>
    </tr>
  );
}
