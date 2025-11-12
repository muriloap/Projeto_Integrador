import Product from "@/models/product";
import styles from "./styles.module.css";
import ActionProduct from "../ActionProduct";

type Props = {
  product: Product;
};

export default function TableProduct({ product }: Props) {
  return (
    <tr className={styles.row}>
      <td>{product.name}</td>
      <td>{product.quantity}</td>
      <td> {new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(product.purchasePrice)}</td>
      <td> {new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(product.salePrice)}</td>
      <td>
        <ActionProduct product={product} />
      </td>
    </tr>
  );
}
