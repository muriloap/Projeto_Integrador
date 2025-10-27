import Product from "@/models/product";
import ModalEditProduct from "../ModalEditProduct";
import styles from "./styles.module.css";
import ActionProduct from "../ActionProduct";

type Props = {
  product: Product;
};

export default function TableProduct({
  product
}: Props) {

  return (
    <tr>
      <td className={styles.td}>{product.name}</td>
      <td className={styles.valor}>{product.purchasePrice}</td>
      <td className={styles.valor}>{product.salePrice}</td>
      <td className={styles.valor}><ActionProduct product={product}/></td>
    </tr>
  );
}
