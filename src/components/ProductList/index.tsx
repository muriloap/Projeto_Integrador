import styles from "./styles.module.css";
import ProductCard from "../ProductCard";
import Produto from "../../models/produto";

type Props = {
  produtos: Produto[];
};

function mapear(produto: Produto) {
  return (
    <>
      <ProductCard
        key={produto.id}
        name={produto.name}
        description={produto.description}
        purchasePrice={produto.purchasePrice}
        salePrice={produto.salePrice}
        observations={produto.observations}
        salesUnit={produto.salesUnit}
        category={produto.category}

      />
    </>
  );
}

export default function ProductList(props: Props) {
  return (
    <>
      <ul className={styles.produtos}>{props.produtos.map(mapear)}</ul>
    </>
  );
}
