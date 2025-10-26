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
            <th>Nome do Produto</th>
            <th>Preço de Compra</th>
            <th>Preço de Venda</th>
          </tr>
        </thead>

        <tbody>
          {products.map((produto) => (
            <TableProduct
              key={produto.id}
              name={produto.name}
              purchasePrice={produto.purchasePrice}
              salePrice={produto.salePrice}
              salesUnit={produto.salesUnit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
