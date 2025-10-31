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
      <td>R$: {product.purchasePrice}</td>
      <td>R$: {product.salePrice}</td>
      <td>
        <ActionProduct product={product} />
      </td>
    </tr>
  );
}
