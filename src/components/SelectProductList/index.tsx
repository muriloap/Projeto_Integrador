import SelectProduct from "../SelectProduct";
import styles from "./styles.module.css";
import Product from "@/models/product";

type Props = {
    product: Product[];
};

export default function SelectProductList({ product }: Props) {
    return (
        <>
            <select className={styles.formSelect}>
                <div className={styles.tableContainer}>
                    {product.map((product) => (
                        <SelectProduct
                            key={product.id}
                            product={product} />
                    ))}
                </div >
            </select>
        </>
    );
}
