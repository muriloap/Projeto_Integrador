import Product from "@/models/product";
import styles from "./styles.module.css";
import ActionProduct from "../ActionProduct";

type Props = {
  product: Product;
};

export default function TableProduct({ product }: Props) {
  return (
    <tr className={styles.row}>
      <td className={styles.name}>{product.name}</td>
      <td className={styles.quantity}>{product.quantity}</td>
      <td className={styles.purchasePrice}> {new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(product.purchasePrice)}</td>
      <td className={styles.salePrice}> {new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(product.salePrice)}</td>
      <td className={styles.action}>
        <ActionProduct product={product} />
      </td>
    </tr>
  );
}
