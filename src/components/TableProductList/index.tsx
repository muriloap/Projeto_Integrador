import styles from "./styles.module.css";
import TableProduct from "../TableProduct";
import Product from "../../models/product";

type Props = {
  products: Product[];
};

export default function TableProductList({ products }: Props) {


  return (
    <div className={styles.tableContainer}>
      <table className={styles.tableProducts}>
        <thead>
          <tr>
            <th className={styles.name}>Nome do Produto</th>
            <th className={styles.quantity}>Quantidade</th>
            <th className={styles.purchasePrice}>Preço de Compra</th>
            <th className={styles.salePrice}>Preço de Venda</th>
            <th className={styles.action}>Editar/Excluir</th>
          </tr>
        </thead>

        <tbody>
          {products.map((produto) => (
            <TableProduct
              key={produto.id}
              product={produto}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
