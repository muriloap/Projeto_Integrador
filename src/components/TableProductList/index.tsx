import styles from "./styles.module.css";
import TableProduct from "../TableProduct";
import Product from "../../models/product";

type Props = {
  products: Product[];
};

export default function TableProductList({ products }: Props) {
  return (
    <div className={styles.tabelaContainer}>
      <table className={styles.tableProducts}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Produto</th>
            <th>Categoria</th>
            <th>Descrição do Produto</th>
            <th>Observações</th>
            <th>Unidade de Venda</th>
            <th>Preço de Compra</th>
            <th>Preço de Venda</th>
          </tr>
        </thead>

        <tbody>
          {products.map((produto) => (
            <TableProduct
              key={produto.id}
              id={produto.id}
              name={produto.name}
              description={produto.description}
              purchasePrice={produto.purchasePrice}
              salePrice={produto.salePrice}
              observations={produto.observations}
              salesUnit={produto.salesUnit}
              category={produto.category}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
